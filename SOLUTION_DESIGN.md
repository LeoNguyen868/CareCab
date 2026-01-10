# Solution Design: Tích hợp dữ liệu H3 Index từ ClickHouse sang PostGIS

Tài liệu này đề xuất giải pháp kỹ thuật để mapping và chuyển đổi dữ liệu H3 Index giữa ClickHouse (nguồn) và PostgreSQL/PostGIS (đích), đáp ứng yêu cầu xử lý 104 tỷ bản ghi mỗi ngày trong khung thời gian 15 tiếng.

## 1. Tương thích Kiểu dữ liệu (Data Type Compatibility)

Vấn đề quan trọng nhất là sự khác biệt giữa kiểu số nguyên không dấu 64-bit (`UInt64`) của ClickHouse và kiểu số nguyên có dấu 64-bit (`BigInt`/`Int64`) của PostgreSQL.

| Hệ thống | Kiểu dữ liệu H3 | Kích thước | Ghi chú |
| :--- | :--- | :--- | :--- |
| **ClickHouse** | `UInt64` | 64-bit Unsigned | Giá trị từ 0 đến $2^{64}-1$. |
| **PostgreSQL** | `BigInt` (hoặc `h3index`) | 64-bit Signed | Giá trị từ $-2^{63}$ đến $2^{63}-1$. |

**Phân tích rủi ro Overflow:**
*   H3 Index chuẩn sử dụng 64 bit, nhưng **bit thứ 63 (bit cao nhất) được đặt là Reserved (luôn bằng 0)**.
*   Vì bit dấu (sign bit) trong `BigInt` của PostgreSQL tương ứng với bit thứ 63 này, nên chừng nào dữ liệu H3 tuân thủ chuẩn (bit 63 = 0), giá trị `UInt64` từ ClickHouse sẽ luôn là số dương và **nằm trọn trong miền giá trị dương của `BigInt` PostgreSQL**.

**Giải pháp:**
*   Sử dụng kiểu `BigInt` trong bảng PostgreSQL để lưu H3 Index (hoặc dùng type `h3index` của extension `h3-pg` - bản chất cũng là 64-bit).
*   Thực hiện **Direct Cast** (ép kiểu trực tiếp): `CAST(h3_column AS BigInt)`. Không cần xử lý chuỗi Hex để đảm bảo hiệu năng tối đa.
*   *Lưu ý:* Nếu có bất kỳ H3 index nào bị lỗi (invalid) mà set bit 63 lên 1, nó sẽ hiển thị dưới dạng số âm trong Postgres, nhưng pattern bit vẫn được bảo toàn. Tuy nhiên, với H3 chuẩn, điều này không xảy ra.

## 2. So sánh Chiến lược Tích hợp (Integration Strategy Comparison)

Yêu cầu: Xử lý ~104 tỷ dòng/ngày trong 15 giờ.
Thông lượng yêu cầu trung bình: ~1.9 triệu dòng/giây (1.9M rows/sec).

| Đặc điểm | Phương án A: `clickhouse_fdw` | Phương án B: Batch Export -> COPY (Recommended) |
| :--- | :--- | :--- |
| **Cơ chế** | Query trực tiếp từ Postgres sang ClickHouse (Foreign Data Wrapper). | Export ra file (Parquet/Native) từ ClickHouse, sau đó dùng lệnh `COPY` vào Postgres. |
| **Hiệu năng** | Thấp. FDW phải tuần tự hóa/giải tuần tự hóa từng dòng, chịu overhead của network round-trip và transaction wrapper của Postgres cho mỗi batch nhỏ. Khó đạt 1.9M rows/sec. | Rất cao. Tận dụng tối đa I/O tuần tự. ClickHouse export cực nhanh. Postgres `COPY` là phương thức insert nhanh nhất. |
| **Độ ổn định** | Thấp với volume lớn. Query dài dễ bị timeout hoặc ngốn RAM của Postgres (OOM) khi buffer dữ liệu lớn. | Cao. Có thể chia nhỏ thành nhiều file (chunks) để resume nếu lỗi. Dễ kiểm soát tài nguyên. |
| **Độ phức tạp** | Thấp (cài extension là chạy). | Trung bình (cần script pipeline để orchestrate việc export/import). |
| **Phù hợp cho** | Lookup dữ liệu nhỏ, Ad-hoc query, data virtualization (không cần copy dữ liệu). | ETL dữ liệu lớn (Big Data), Bulk loading hàng tỷ bản ghi. |

### Đánh giá chi tiết:
Với volume **104 tỷ dòng**, Phương án A là **BẤT KHẢ THI** để hoàn thành trong 15 giờ nếu dùng để di chuyển dữ liệu. FDW thường chỉ đạt tốc độ vài chục nghìn đến vài trăm nghìn dòng/giây trong điều kiện lý tưởng, sẽ mất nhiều ngày để sync 1 ngày dữ liệu.

## 3. Đề xuất Giải pháp (Recommendation)

Để đạt được mục tiêu 104 tỷ rows trong 15 giờ (~1.9M rows/sec), tôi đề xuất **Phương án B (Batch ETL tối ưu)** kết hợp với các kỹ thuật Tuning cực hạn.

### Quy trình đề xuất (Pipeline Design):

1.  **Export từ ClickHouse (Parallel):**
    *   Sử dụng `ClickHouse Client` hoặc `clickhouse-local`.
    *   Export dữ liệu ra định dạng **Binary** hoặc **CSV** (bỏ header) thay vì Parquet (để giảm CPU overhead khi giải nén ở phía Postgres, dù tốn I/O hơn). Format `Native` của ClickHouse không dùng trực tiếp được cho Postgres `COPY`. Format `RowBinary` cần extension đặc biệt. **CSV** hoặc **Text** là an toàn nhất, hoặc **Binary** nếu custom format.
    *   *Query:* `SELECT cast(h3_index as Int64), object_id FROM table WHERE ... INTO OUTFILE 'part_N.csv' FORMAT CSV`
    *   Chia nhỏ query theo partition key để chạy song song (ví dụ: 20-30 threads).

2.  **Import vào PostgreSQL (Parallel COPY):**
    *   Sử dụng `COPY table FROM PROGRAM` hoặc `COPY` từ file.
    *   **QUAN TRỌNG:** PostgreSQL instance cần được tinh chỉnh đặc biệt:
        *   **Unlogged Table:** Load dữ liệu vào bảng `UNLOGGED` trước để bỏ qua ghi WAL (Write Ahead Log), tăng tốc độ ghi gấp nhiều lần. Sau đó mới chuyển sang Logged hoặc Insert sang bảng chính.
        *   **Drop Indexes:** Xóa toàn bộ Index (trừ Primary Key nếu cần thiết, tốt nhất là xóa hết) trước khi load. Tạo lại Index sau khi load xong. Tạo Index cho 104 tỷ dòng là một quá trình cực nặng (có thể mất nhiều giờ), cần tính vào quỹ thời gian 15 tiếng.
        *   **Partitioning:** Bảng đích trong Postgres **bắt buộc** phải Partition (ví dụ: theo ngày hoặc theo dải H3) để tận dụng đa luồng khi Insert và dễ dàng quản lý (Drop partition cũ).

3.  **Kiến trúc thay thế (Alternative Consideration):**
    *   Việc insert 104 tỷ dòng *mỗi ngày* vào PostgreSQL là một gánh nặng cực lớn cho hạ tầng (cần ổ cứng NVMe Enterprise RAID 0/10 cực nhanh và CPU khủng).
    *   **Câu hỏi đặt ra:** Có thực sự cần *lưu* 104 tỷ dòng này trong Postgres không?
    *   **Hybrid Solution:** Chỉ lưu các H3 Index *đại diện* (aggregate) hoặc Geometry trong PostGIS. Dữ liệu chi tiết (Object IDs) vẫn để ở ClickHouse. Khi cần query không gian:
        1.  PostGIS: Query hình học -> Ra danh sách H3 Indexes.
        2.  Application: Lấy list H3 Indexes -> Query ClickHouse để lấy Object IDs.
    *   Giải pháp này loại bỏ nhu cầu sync 104 tỷ dòng, giữ thế mạnh của mỗi DB.

### Kết luận:
Nếu bắt buộc phải sync 104 tỷ dòng: Chọn **Phương án B**.
*   **Format:** CSV/Text (đơn giản) hoặc Binary (nếu viết tool custom).
*   **Tuning:** Unlogged Table + Drop Index + Parallel COPY (30+ connections).
*   **Data Type:** Cast `UInt64` (ClickHouse) -> `BigInt` (Postgres).
