# Plan Chi Tiết Frontend: Tích Hợp Quản Lý Phòng Khám

Dựa trên cấu trúc hiện tại của frontend CareCab, đây là plan chi tiết để tích hợp hệ thống quản lý phòng khám:

## 1. API FUNCTIONS

### Tạo trong file: `frontend/src/apis/apis.js`

Theo pattern hiện tại [0-cite-0](#0-cite-0) , cần thêm các API functions sau:

### 1.1. CRUD Operations cho Room

**getAllRooms** - Lấy tất cả phòng khám
```javascript
export const getAllRooms = async (isAvailable = null) => {
  try {
    const url = isAvailable !== null 
      ? `/rooms/?is_available=${isAvailable}`
      : '/rooms/';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
```

**getRoom** - Lấy thông tin 1 phòng [0-cite-1](#0-cite-1) 

**createRoom** - Tạo phòng mới [0-cite-2](#0-cite-2) 

**updateRoom** - Cập nhật thông tin phòng [0-cite-3](#0-cite-3) 

**deleteRoom** - Xóa phòng [0-cite-4](#0-cite-4) 

### 1.2. Room Assignment Operations

**assignRoomToAppointment** - Gán phòng cho lịch khám
```javascript
export const assignRoomToAppointment = async (roomId, appointmentId, notes = '') => {
  try {
    const response = await api.post(`/rooms/${roomId}/assign`, {
      appointment_id: appointmentId,
      notes: notes
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
```

**releaseRoom** - Trả phòng
```javascript
export const releaseRoom = async (roomId, appointmentId) => {
  try {
    const response = await api.post(`/rooms/${roomId}/release`, {
      appointment_id: appointmentId
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
```

### 1.3. Query Operations

**getAvailableRooms** - Lấy phòng available [0-cite-5](#0-cite-5) 

**getRoomByAppointment** - Lấy phòng theo lịch khám
```javascript
export const getRoomByAppointment = async (appointmentId) => {
  try {
    const response = await api.get(`/rooms/by-appointment/${appointmentId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
```

**getRoomAssignments** - Lấy lịch sử assignment của phòng
```javascript
export const getRoomAssignments = async (roomId, startDate = null, endDate = null, activeOnly = false) => {
  try {
    let url = `/rooms/${roomId}/assignments?active_only=${activeOnly}`;
    if (startDate) url += `&start_date=${startDate}`;
    if (endDate) url += `&end_date=${endDate}`;
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
```

**getRoomStatus** - Check trạng thái phòng
```javascript
export const getRoomStatus = async (roomId) => {
  try {
    const response = await api.get(`/rooms/${roomId}/status`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
```

### 1.4. Error Handling

Sử dụng `handleApiError` function hiện tại [0-cite-6](#0-cite-6)  để xử lý lỗi thống nhất.

## 2. UTILITY FUNCTIONS

### Tạo trong file: `frontend/src/apis/ultis_api.js`

Theo pattern hiện tại [0-cite-7](#0-cite-7) , thêm:

**generateEmptyRoom** - Tạo object phòng rỗng
```javascript
export const generateEmptyRoom = () => {
  return {
    room_name: "",
    room_number: "",
    description: "",
    is_available: true
  };
};
```

**generateEmptyRoomAssignment** - Tạo object assignment rỗng
```javascript
export const generateEmptyRoomAssignment = (roomId, appointmentId) => {
  return {
    room_id: roomId,
    appointment_id: appointmentId,
    assigned_at: new Date().toISOString(),
    notes: ""
  };
};
```

**getRoomStatusText** - Chuyển đổi status thành text tiếng Việt
```javascript
export const getRoomStatusText = (status) => {
  const statusMap = {
    'available': 'Sẵn sàng',
    'occupied': 'Đang sử dụng',
    'cleaning': 'Đang dọn dẹp',
    'maintenance': 'Đang bảo trì'
  };
  return statusMap[status] || status;
};
```

## 3. PAGES & COMPONENTS

### 3.1. Tạo file: `frontend/src/pages/RoomsManagement.jsx`

Trang quản lý phòng khám cho Admin, theo pattern của AdminPage [0-cite-8](#0-cite-8) 

**Features cần có:**

1. **Hiển thị danh sách phòng** - Sử dụng table view và card view tương tự [0-cite-9](#0-cite-9) 

2. **Filter & Search** - Pattern tương tự [0-cite-10](#0-cite-10) 
   - Filter theo trạng thái (Available, Occupied, Cleaning, Maintenance, All)
   - Search theo tên phòng, số phòng
   - Filter theo ngày (để xem phòng nào available trong ngày cụ thể)

3. **CRUD Operations:**
   - **Create Room**: Modal/Form để tạo phòng mới
   - **Update Room**: Modal/Form để cập nhật thông tin
   - **Delete Room**: Confirm dialog trước khi xóa
   - **Toggle Availability**: Quick action để đổi trạng thái

4. **Room Status Display** - Badge system tương tự [0-cite-11](#0-cite-11) 

5. **Room Details Popup** - Pattern tương tự appointment popup [0-cite-12](#0-cite-12) 

### 3.2. Tạo file: `frontend/src/pages/RoomAssignment.jsx`

Trang gán phòng cho lịch khám (dành cho Admin/Staff)

**Features cần có:**

1. **Appointment List với Room Assignment:**
   - Hiển thị appointments cần gán phòng (status = NURSE_CONFIRMED)
   - Show current room nếu đã được gán
   - Quick assign/release actions

2. **Room Selection:**
   - Dropdown/Modal để chọn phòng available
   - Hiển thị thông tin phòng (tên, số, mô tả)
   - Real-time availability check

3. **Assignment History:**
   - Timeline view của room assignments
   - Filter theo ngày, phòng, status

4. **Conflict Detection:**
   - Warning khi phòng có conflict về thời gian
   - Suggest alternative rooms

### 3.3. Tạo component: `frontend/src/components/RoomSelector.jsx`

Component reusable để chọn phòng

**Props:**
```javascript
{
  date: string,           // Ngày cần check availability
  time: string,           // Giờ cần check availability
  onSelect: function,     // Callback khi chọn phòng
  selectedRoom: object,   // Phòng đang được chọn
  disabled: boolean       // Disable selection
}
```

**Features:**
- Load available rooms theo date/time
- Hiển thị room info (name, number, status)
- Visual indicator cho room status
- Loading state

### 3.4. Tạo component: `frontend/src/components/RoomCard.jsx`

Component hiển thị thông tin phòng

**Props:**
```javascript
{
  room: object,           // Room data
  showActions: boolean,   // Hiển thị action buttons
  onEdit: function,       // Callback khi edit
  onDelete: function,     // Callback khi delete
  onAssign: function,     // Callback khi assign
  onClick: function       // Callback khi click card
}
```

### 3.5. Tạo component: `frontend/src/components/RoomStatusBadge.jsx`

Component hiển thị status badge của phòng, pattern tương tự status badge trong AdminPage [0-cite-11](#0-cite-11) 

## 4. ROUTING CONFIGURATION

### Update file: `frontend/src/App.jsx`

Theo pattern hiện tại [0-cite-13](#0-cite-13) , thêm routes mới:

```javascript
// Admin routes
<Route 
  path="/admin/rooms" 
  element={
    <ProtectedRoute adminOnly>
      <RoomsManagement />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/admin/room-assignment" 
  element={
    <ProtectedRoute adminOnly>
      <RoomAssignment />
    </ProtectedRoute>
  } 
/>
```

## 5. UI/UX CONSIDERATIONS

### 5.1. Layout & Styling

Tạo file CSS: `frontend/src/assets/css/rooms.css` với các classes:

**Room Management:**
- `.rooms-container` - Container chính
- `.room-card` - Card hiển thị phòng
- `.room-status-badge` - Badge trạng thái
- `.room-filters` - Filter section
- `.room-actions` - Action buttons

**Room Assignment:**
- `.assignment-container` - Container chính
- `.assignment-list` - List assignments
- `.assignment-item` - Assignment item
- `.room-selector` - Room selector component
- `.conflict-warning` - Warning message cho conflicts

### 5.2. Status Colors

Định nghĩa màu sắc cho các trạng thái:
- **Available**: Green (#28a745)
- **Occupied**: Red (#dc3545)
- **Cleaning**: Orange (#fd7e14)
- **Maintenance**: Gray (#6c757d)

### 5.3. Responsive Design

Theo pattern của appointments page [0-cite-9](#0-cite-9) , cần có:
- Table view cho desktop
- Card view cho mobile
- Responsive filters và actions

## 6. STATE MANAGEMENT

### 6.1. Component State Pattern

Theo pattern hiện tại [0-cite-14](#0-cite-14) , sử dụng useState cho:

**RoomsManagement.jsx:**
```javascript
const [rooms, setRooms] = useState([]);
const [filteredRooms, setFilteredRooms] = useState([]);
const [currentFilter, setCurrentFilter] = useState('all');
const [searchTerm, setSearchTerm] = useState('');
const [selectedRoom, setSelectedRoom] = useState(null);
const [showPopup, setShowPopup] = useState(false);
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState({ text: '', type: '' });
```

**RoomAssignment.jsx:**
```javascript
const [appointments, setAppointments] = useState([]);
const [rooms, setRooms] = useState([]);
const [assignments, setAssignments] = useState([]);
const [selectedAppointment, setSelectedAppointment] = useState(null);
const [selectedRoom, setSelectedRoom] = useState(null);
const [loading, setLoading] = useState(false);
const [conflicts, setConflicts] = useState([]);
```

### 6.2. Data Fetching Pattern

Sử dụng useEffect và useCallback như trong AdminPage [0-cite-15](#0-cite-15) 

### 6.3. LocalStorage Caching

Theo pattern hiện tại [0-cite-16](#0-cite-16) , cache room data trong localStorage để giảm API calls:

```javascript
// Cache available rooms
const cachedRooms = localStorage.getItem('roomsData');
if (cachedRooms) {
  setRooms(JSON.parse(cachedRooms));
} else {
  // Fetch from API
}
```

## 7. INTEGRATION POINTS

### 7.1. Appointment Page Integration

Update file: `frontend/src/pages/Appointments.jsx`

Thêm hiển thị room info trong appointment details [0-cite-17](#0-cite-17) :

```javascript
{selectedAppointment && (
  <>
    <p><strong>Phòng khám:</strong> {selectedAppointment.room_name || 'Chưa gán'}</p>
    <p><strong>Số phòng:</strong> {selectedAppointment.room_number || 'N/A'}</p>
  </>
)}
```

### 7.2. AdminPage Integration

Update file: `frontend/src/pages/AdminPage.jsx`

Thêm link navigation đến room management:

```javascript
<Link to="/admin/rooms" className="btn btn-primary">
  <i className="fas fa-door-open"></i> Quản lý phòng khám
</Link>
```

### 7.3. BookPage Integration

Cho phép patient chọn phòng ưa thích (optional feature) khi đặt lịch.

## 8. FEATURES NÂNG CAO

### 8.1. Real-time Updates

Sử dụng WebSocket hoặc polling để cập nhật real-time:
- Room availability status
- Assignment changes
- Conflict notifications

### 8.2. Room Scheduling View

Calendar view để xem lịch sử dụng phòng:
- Full calendar integration
- Drag & drop assignments
- Visual timeline

### 8.3. Analytics & Reports

Dashboard cho room utilization:
- Usage statistics
- Popular rooms
- Peak hours
- Conflict history

### 8.4. Notifications

Thông báo khi:
- Room được assign/release
- Có conflict xảy ra
- Room status thay đổi
- Auto-release triggers

## 9. VALIDATION & ERROR HANDLING

### 9.1. Form Validation

**Create/Update Room Form:**
- Room name: Required, unique, max 100 chars
- Room number: Optional, max 20 chars
- Description: Optional, max 500 chars

**Assignment Form:**
- Room: Required, must be available
- Appointment: Required, must exist
- Notes: Optional, max 500 chars

### 9.2. Error Messages

Pattern từ handleApiError [0-cite-6](#0-cite-6) :

```javascript
const errorMessages = {
  'ROOM_NOT_AVAILABLE': 'Phòng này đang được sử dụng',
  'APPOINTMENT_NOT_FOUND': 'Không tìm thấy lịch khám',
  'CONFLICT_DETECTED': 'Có xung đột về thời gian',
  'INVALID_STATUS': 'Trạng thái lịch khám không hợp lệ',
  'ROOM_HAS_ACTIVE_ASSIGNMENTS': 'Không thể xóa phòng đang có lịch khám'
};
```

### 9.3. Loading States

Pattern từ AdminPage [0-cite-18](#0-cite-18) :
- Disable buttons khi đang xử lý
- Show loading spinner
- Prevent double submission

## 10. TESTING CHECKLIST

### 10.1. Unit Tests
- [ ] API functions return correct data
- [ ] Utility functions work correctly
- [ ] Components render properly
- [ ] Form validation works

### 10.2. Integration Tests
- [ ] Room CRUD operations
- [ ] Assignment flow (assign → release)
- [ ] Conflict detection
- [ ] Status updates propagate correctly

### 10.3. UI/UX Tests
- [ ] Responsive design works on mobile
- [ ] Filters work correctly
- [ ] Popups open/close properly
- [ ] Error messages display correctly
- [ ] Loading states show correctly

### 10.4. Edge Cases
- [ ] Handle empty room list
- [ ] Handle no available rooms
- [ ] Handle concurrent assignments
- [ ] Handle network errors
- [ ] Handle invalid data

## 11. DEPLOYMENT CONSIDERATIONS

### 11.1. Build Configuration

Update `vite.config.js` nếu cần thêm environment variables cho room management.

### 11.2. Environment Variables

Thêm vào `.env`:
```
VITE_ENABLE_ROOM_MANAGEMENT=true
VITE_ROOM_AUTO_RELEASE=true
VITE_ROOM_CONFLICT_CHECK=true
```

## Notes

1. **Consistency với Backend**: Plan này được thiết kế để tương thích 100% với backend API đã định nghĩa trong plan backend.

2. **Pattern Reusability**: Tái sử dụng tối đa patterns hiện có từ Appointments và AdminPage để đảm bảo consistency và dễ maintain.

3. **Progressive Enhancement**: Có thể implement từng feature một, bắt đầu từ basic CRUD, sau đó thêm assignment, rồi advanced features.

4. **Mobile-First**: UI được thiết kế responsive từ đầu, với card view cho mobile và table view cho desktop.

5. **Error Handling**: Xử lý lỗi thống nhất sử dụng handleApiError function hiện có.

6. **Loading States**: Prevent double submission và show loading indicators rõ ràng.

7. **Real-time Updates**: Có thể implement sau với WebSocket hoặc polling, không bắt buộc cho MVP.

8. **Access Control**: Chỉ Admin/Staff mới có quyền quản lý phòng, sử dụng ProtectedRoute component hiện có.

9. **Localization**: Tất cả text đều bằng tiếng Việt, consistent với app hiện tại.

10. **Performance**: Sử dụng localStorage caching và lazy loading để optimize performance.

### Citations

**File:** frontend/src/apis/apis.js (L5-12)
```javascript
// Create axios instance with config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 5 seconds timeout
  headers: {
    'Content-Type': 'application/json'
  }
});
```

**File:** frontend/src/apis/apis.js (L32-51)
```javascript
const handleApiError = (error) => {
  console.log('API Error:', error.response || error);
  if (error.response) {
    // Server responded with error
    if (error.response.status === 422) {
      throw new Error('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
    }
    if (error.response.status === 401) {
      throw new Error('Tài khoản hoặc mật khẩu không đúng');
    }
    if (error.response.status === 403) {
      throw new Error('Không có quyền truy cập');
    }
    if (error.response.status === 404) {
      throw new Error('Không tìm thấy dữ liệu');
    }
    throw new Error(error.response.data.message || 'Có lỗi xảy ra');
  }
  throw new Error('Không thể kết nối đến server');
};
```

**File:** frontend/src/apis/apis.js (L164-182)
```javascript
export const checkAvailableNurses = async (appointmentTime) => {
  try {
    const dateStr = appointmentTime.date instanceof Date 
      ? appointmentTime.date.toISOString().split('T')[0]
      : appointmentTime.date;
    
    const timeStr = appointmentTime.time instanceof Date
      ? appointmentTime.time.toTimeString().split(' ')[0]
      : appointmentTime.time;

    const response = await api.post('/appointments/available-nurses', {
      date: dateStr,
      time: timeStr
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
```

**File:** frontend/src/apis/apis.js (L284-291)
```javascript
export const getNurse = async (nurseId) => {
  try {
    const response = await api.get(`/nurses/${nurseId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
```

**File:** frontend/src/apis/apis.js (L302-309)
```javascript
export const createNurse = async (nurseData) => {
  try {
    const response = await api.post('/nurses/', nurseData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
```

**File:** frontend/src/apis/apis.js (L311-318)
```javascript
export const updateNurse = async (nurseId, nurseData) => {
  try {
    const response = await api.put(`/nurses/${nurseId}`, nurseData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
```

**File:** frontend/src/apis/apis.js (L320-327)
```javascript
export const deleteNurse = async (nurseId) => {
  try {
    const response = await api.delete(`/nurses/${nurseId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
```

**File:** frontend/src/apis/ultis_api.js (L34-48)
```javascript
export const generateEmptyAppointment = (patientId) => {
    const today = new Date();
    const emptyAppointment = {
        patient_id: patientId,
        nurse_id: null,
        date: today.toISOString().split('T')[0],
        time: "00:00",
        location: "",
        symptoms: "",
        transportation: "None",
        startAt: today.toISOString(),
        endAt: today.toISOString()
    };
    return emptyAppointment;
};
```

**File:** frontend/src/pages/AdminPage.jsx (L6-17)
```javascript
const AdminPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

```

**File:** frontend/src/pages/AdminPage.jsx (L33-52)
```javascript
  const fetchAppointments = React.useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/appointments/');
      const data = await response.json();
      
      // Map data to match the component's expected structure
      const formattedAppointments = data.map(apt => ({
        ...apt,
        appointment_date: apt.date || apt.appointment_date,
        appointment_time: apt.time || apt.appointment_time,
        patientName: apt.patient_name || 'N/A',
        phone: apt.patient_phone || 'N/A',
        email: apt.patient_email || 'N/A'
      }));
      
      setAppointments(formattedAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }, []);
```

**File:** frontend/src/pages/AdminPage.jsx (L100-134)
```javascript
    setLoading(true);
    try {
      let endpoint;
      let method = 'POST';

      if (newStatus === 'completed') {
        endpoint = `http://localhost:8000/appointments/${appointmentId}/staff-complete`;
      } else if (newStatus === 'confirmed') {
        endpoint = `http://localhost:8000/appointments/${appointmentId}/nurse-confirm?nurse_id=1`;
      } else {
        // Fallback for other statuses if needed, though admin.js only has confirm/complete
        endpoint = `http://localhost:8000/appointments/${appointmentId}/${newStatus}`;
        method = 'PATCH';
      }

      const response = await fetch(endpoint, {
        method: method,
        headers: { 'accept': 'application/json' }
      });

      if (response.ok) {
        const statusText = newStatus === 'confirmed' ? 'xác nhận' : newStatus === 'completed' ? 'hoàn thành' : 'cập nhật';
        showMessage(`Đã ${statusText} lịch hẹn!`, 'success');
        await fetchAppointments();
        setShowPopup(false);
      } else {
        showMessage('Không thể cập nhật trạng thái', 'error');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      showMessage('Có lỗi xảy ra', 'error');
    } finally {
      setLoading(false);
    }
  };
```

**File:** frontend/src/pages/AdminPage.jsx (L136-145)
```javascript
  const getStatusBadge = (status) => {
    const badges = {
      pending: { class: 'status-pending', text: 'Chờ xác nhận' },
      confirmed: { class: 'status-confirmed', text: 'Đã xác nhận' },
      completed: { class: 'status-completed', text: 'Đã hoàn thành' },
      cancelled: { class: 'status-cancelled', text: 'Đã hủy' }
    };
    const badge = badges[status] || { class: '', text: status };
    return <span className={`status-badge ${badge.class}`}>{badge.text}</span>;
  };
```

**File:** frontend/src/pages/AdminPage.jsx (L318-390)
```javascript
            <div className="appointments-container">
              <div id="appointmentsList" className="appointments-table-view">
                <table className="appointments-table">
                  <thead>
                    <tr>
                      <th>Mã lịch hẹn</th>
                      <th>Mã BN</th>
                      <th>Tên bệnh nhân</th>
                      <th>Giờ</th>
                      <th>Ngày</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ textAlign: 'center' }}>
                          Không có lịch hẹn nào
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments.map((apt) => (
                        <tr 
                          key={apt.id} 
                          onClick={(e) => {
                            // Don't trigger if clicking buttons
                            if (!e.target.closest('button')) {
                              setSelectedAppointment(apt);
                              setShowPopup(true);
                            }
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <td>{apt.id}</td>
                          <td>{apt.patient_id}</td>
                          <td>{apt.patientName}</td>
                          <td>{formatTime(apt.appointment_time)}</td>
                          <td>{formatDate(apt.appointment_date)}</td>
                          <td>{getStatusBadge(apt.status)}</td>
                          <td>
                            <div className="action-buttons">
                              {apt.status === 'pending' && (
                                <button
                                  className="btn-action btn-confirm"
                                  onClick={() => handleStatusChange(apt.id, 'confirmed')}
                                  disabled={loading}
                                >
                                  <i className="fas fa-check"></i> Xác nhận
                                </button>
                              )}
                              {apt.status === 'confirmed' && (
                                <button
                                  className="btn-action btn-complete"
                                  onClick={() => handleStatusChange(apt.id, 'completed')}
                                  disabled={loading}
                                >
                                  <i className="fas fa-check-double"></i> Hoàn thành
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              
              <div id="appointmentsCards" className="appointments-cards-view">
                {renderAppointmentCards()}
              </div>
            </div>
```

**File:** frontend/src/pages/AdminPage.jsx (L396-455)
```javascript
      {showPopup && selectedAppointment && (
        <div className="appointment-popup" id="appointmentPopup" style={{ display: 'block' }}>
          <div className="appointment-popup-content">
            <button
              className="close-popup"
              aria-label="Đóng"
              onClick={() => setShowPopup(false)}
            >
              &times;
            </button>
            <h2>Chi tiết lịch hẹn</h2>
            <div id="appointmentDetails">
              <p><strong>ID:</strong> {selectedAppointment.id}</p>
              <p><strong>Bệnh nhân:</strong> {selectedAppointment.patientName}</p>
              <p><strong>Số điện thoại:</strong> {selectedAppointment.phone}</p>
              <p><strong>Email:</strong> {selectedAppointment.email}</p>
              <p><strong>Ngày khám:</strong> {formatDate(selectedAppointment.appointment_date)}</p>
              <p><strong>Giờ khám:</strong> {formatTime(selectedAppointment.appointment_time)}</p>
              <p><strong>Lý do:</strong> {selectedAppointment.reason}</p>
              <p><strong>Ghi chú:</strong> {selectedAppointment.notes || 'Không có'}</p>
              <p><strong>Trạng thái:</strong> {getStatusBadge(selectedAppointment.status)}</p>
            </div>
            <div className="popup-actions">
              {selectedAppointment.status === 'pending' && (
                <>
                  <button
                    className="btn btn-confirm"
                    onClick={() => handleStatusChange(selectedAppointment.id, 'confirmed')}
                    disabled={loading}
                  >
                    <i className="fas fa-check"></i> Xác nhận
                  </button>
                  <button
                    className="btn btn-cancel"
                    onClick={() => handleStatusChange(selectedAppointment.id, 'cancelled')}
                    disabled={loading}
                  >
                    <i className="fas fa-times"></i> Hủy
                  </button>
                </>
              )}
              {selectedAppointment.status === 'confirmed' && (
                <button
                  className="btn btn-complete"
                  onClick={() => handleStatusChange(selectedAppointment.id, 'completed')}
                  disabled={loading}
                >
                  <i className="fas fa-check-double"></i> Hoàn thành
                </button>
              )}
              <button
                className="btn btn-secondary close-btn"
                onClick={() => setShowPopup(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
```

**File:** frontend/src/App.jsx (L16-51)
```javascript
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Redirect root to welcome */}
          <Route path="/" element={<Navigate to="/welcome" replace />} />
          
          {/* Public routes */}
          <Route path="/welcome" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected routes with MainLayout */}
          <Route path="/home" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route index element={<HomePage />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="profile" element={<Profile />} />
            <Route path="book" element={<BookPage />} />
            <Route path="edit-profile" element={<EditProfilePage />} />
          </Route>

          {/* Admin route */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
```

**File:** frontend/src/pages/Appointments.jsx (L42-64)
```javascript
            // First check for cached patient data
            let patientId;
            const patientData = localStorage.getItem('patientData');
            
            if (patientData) {
                patientId = JSON.parse(patientData).id;
            } else {
                // If not cached, try to fetch using userData
                const userData = JSON.parse(localStorage.getItem('userData'));
                if (!userData?.user_id) {
                    setLoading(false);
                    return;
                }

                const response = await fetch(`http://localhost:8000/patients/user/${userData.user_id}`, {
                    headers: { 'accept': 'application/json' }
                });
                const data = await response.json();
                if (data) {
                    localStorage.setItem('patientData', JSON.stringify(data));
                    patientId = data.id;
                }
            }
```

**File:** frontend/src/pages/Appointments.jsx (L243-251)
```javascript
                            {selectedAppointment && (
                                <div className="appointment-details">
                                    <p><strong>Ngày:</strong> {formatDate(selectedAppointment.appointment_date)}</p>
                                    <p><strong>Giờ:</strong> {formatTime(selectedAppointment.appointment_time)}</p>
                                    <p><strong>Trạng thái:</strong> <span className={`status-${selectedAppointment.status}`}>{getStatusText(selectedAppointment.status)}</span></p>
                                    <p><strong>Bác sĩ:</strong> {selectedAppointment.doctor_name || 'Đang chờ xếp lịch'}</p>
                                    <p><strong>Triệu chứng:</strong> {selectedAppointment.symptoms || 'Không có'}</p>
                                    <p><strong>Ghi chú:</strong> {selectedAppointment.notes || 'Không có'}</p>
                                    
```
