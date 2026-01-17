# Plan Chi Tiết: Tích Hợp Quản Lý Phòng Khám

Dựa trên cấu trúc hiện tại của dự án CareCab, đây là plan chi tiết để tích hợp hệ thống quản lý phòng khám:

## 1. DATABASE SCHEMA (ORM Model)

### Tạo file: `backend/ORMModels/rooms.py`

**Model `Room`** cần các trường sau:
- `room_id`: IntField (primary key)
- `room_name`: CharField (tên phòng khám, unique)
- `room_number`: CharField (số phòng, nullable)
- `description`: TextField (mô tả phòng, nullable)
- `is_available`: BooleanField (trạng thái sẵn sàng, default=True)
- `created_at`: DatetimeField
- `updated_at`: DatetimeField (auto_now=True)

**Model `RoomAppointment`** (bảng trung gian để link phòng khám với lịch khám):
- `id`: IntField (primary key)
- `room`: ForeignKeyField → Room (CASCADE delete)
- `appointment`: ForeignKeyField → Appointment (CASCADE delete)
- `assigned_at`: DatetimeField (thời gian gán phòng)
- `released_at`: DatetimeField (thời gian trả phòng, nullable)
- `notes`: TextField (ghi chú, nullable)

**Indexes cần thiết** (theo pattern hiện tại [0-cite-0](#0-cite-0) ):
- Composite index: `["room_id", "appointment_id"]`
- Composite index: `["appointment_id", "assigned_at"]`
- Single index: `["room_id"]`

**Lưu ý**: Không nên thêm `appointment_id` trực tiếp vào bảng `Room` như initial plan, vì một phòng có thể phục vụ nhiều lịch khám theo thời gian. Thay vào đó nên dùng bảng trung gian `RoomAppointment` để quản lý relationship nhiều-nhiều.

## 2. ENUM & CONSTANTS

### Thêm vào `backend/enums.py`: [0-cite-1](#0-cite-1) 

Tạo enum mới cho trạng thái phòng:
```python
class RoomStatus(str, Enum):
    AVAILABLE = "available"      # Phòng trống
    OCCUPIED = "occupied"        # Đang có bệnh nhân
    CLEANING = "cleaning"        # Đang dọn dẹp
    MAINTENANCE = "maintenance"  # Đang bảo trì
```

## 3. PYDANTIC MODELS

### Tạo models trong `backend/pydanticModels/base.py`:

Theo pattern hiện tại [0-cite-2](#0-cite-2) , cần tạo:

**Room Models:**
- `RoomBase`: Chứa các trường cơ bản
- `RoomCreate`: Dùng cho tạo mới
- `RoomUpdate`: Dùng cho cập nhật
- `RoomOut`: Dùng cho response

**RoomAppointment Models:**
- `RoomAppointmentBase`
- `RoomAppointmentCreate` 
- `RoomAppointmentOut`

Sau đó export trong `backend/pydanticModels/__init__.py` [0-cite-3](#0-cite-3) 

## 4. ROUTER & ENDPOINTS

### Tạo file: `backend/Routers/room_router.py`

Theo pattern của appointment router [0-cite-4](#0-cite-4) , cần implement các endpoints sau:

### 4.1. CRUD Operations cho Room

**GET `/rooms/`** - Lấy tất cả phòng khám
- Query params: `is_available` (filter theo trạng thái)
- Response: List[RoomOut]

**GET `/rooms/{room_id}`** - Lấy thông tin 1 phòng
- Response: RoomOut

**POST `/rooms/`** - Tạo phòng khám mới
- Body: RoomCreate
- Response: RoomOut

**PUT `/rooms/{room_id}`** - Cập nhật thông tin phòng
- Body: RoomUpdate
- Response: RoomOut

**DELETE `/rooms/{room_id}`** - Xóa phòng khám
- Chỉ cho phép xóa nếu không có lịch khám đang active

### 4.2. Room Assignment Operations

**POST `/rooms/{room_id}/assign`** - Gán phòng cho lịch khám
- Body: `{ appointment_id: int, notes?: string }`
- Validate:
  - Phòng phải available
  - Lịch khám phải tồn tại và status phù hợp (NURSE_CONFIRMED hoặc STARTED) [0-cite-5](#0-cite-5) 
  - Phòng chưa được gán cho lịch khám khác trong cùng khung giờ
- Tạo record trong `RoomAppointment`
- Cập nhật `is_available = False` cho Room
- Response: RoomAppointmentOut

**POST `/rooms/{room_id}/release`** - Trả phòng (unlink)
- Body: `{ appointment_id: int }`
- Cập nhật `released_at` trong RoomAppointment
- Cập nhật `is_available = True` cho Room
- Response: Success message

### 4.3. Query Operations

**GET `/rooms/available`** - Lấy phòng available
- Query params: `date`, `time` (optional - để check conflict)
- Logic: Lọc phòng `is_available = True` và không có assignment active
- Response: List[RoomOut]

**GET `/rooms/by-appointment/{appointment_id}`** - Lấy phòng theo lịch khám
- Trả về phòng đang/đã được gán cho appointment
- Response: RoomOut hoặc null

**GET `/rooms/{room_id}/assignments`** - Lấy lịch sử assignment của phòng
- Query params: `start_date`, `end_date`, `active_only` (boolean)
- Response: List[RoomAppointmentOut với thông tin appointment]

**GET `/rooms/{room_id}/status`** - Check trạng thái phòng
- Response: 
```json
{
  "room_id": int,
  "is_available": boolean,
  "current_appointment": AppointmentOut | null,
  "next_appointment": AppointmentOut | null
}
```

## 5. BUSINESS LOGIC

### 5.1. Validation Rules

1. **Khi assign phòng:**
   - Check appointment status phải là NURSE_CONFIRMED, STARTED hoặc STOPPED [0-cite-6](#0-cite-6) 
   - Không cho phép assign nếu phòng đang occupied
   - Validate không có conflict về thời gian

2. **Khi release phòng:**
   - Chỉ release được nếu có assignment active
   - Tự động release khi appointment chuyển sang COMPLETED hoặc CANCELED

3. **Khi delete phòng:**
   - Không cho phép delete nếu có assignment active
   - Có thể delete nếu chỉ có historical assignments

### 5.2. Auto-Release Logic

Tạo background task hoặc trigger để tự động release phòng khi:
- Appointment status chuyển sang COMPLETED [0-cite-7](#0-cite-7) 
- Appointment status chuyển sang CANCELED [0-cite-8](#0-cite-8) 

### 5.3. Conflict Detection

Implement hàm check conflict tương tự như check nurse availability [0-cite-9](#0-cite-9) :

- Query RoomAppointment để tìm assignments trong cùng khung thời gian
- Check appointments có status active (NURSE_CONFIRMED, STARTED)
- Return available rooms

## 6. DATABASE MIGRATION

Update file `backend/ORMModels/__init__.py` [0-cite-10](#0-cite-10) :

1. Import models mới:
   ```python
   from ORMModels.rooms import *
   ```

2. Thêm vào modules init:
   ```python
   modules={
       'models': ['ORMModels.users', 'ORMModels.appointments', 
                  'ORMModels.notification', 'ORMModels.rooms']
   }
   ```

3. Update DROP script nếu force_recreate:
   ```sql
   DROP TABLE IF EXISTS room_appointment CASCADE;
   DROP TABLE IF EXISTS room CASCADE;
   ```

## 7. TESTING CONSIDERATIONS

1. Test CRUD operations cho Room
2. Test assignment/release flow
3. Test conflict detection
4. Test auto-release khi appointment status thay đổi
5. Test cascading deletes
6. Test concurrent assignments (race conditions)

## Notes

1. **Không nên lưu `appointment_id` trực tiếp trong Room**: Vì một phòng có thể phục vụ nhiều appointments theo thời gian, nên cần bảng trung gian `RoomAppointment` để quản lý relationship nhiều-nhiều.

2. **Thêm trường quan trọng**: `assigned_at`, `released_at` trong RoomAppointment để track timeline và detect conflicts.

3. **Status management**: Nên có enum RoomStatus riêng thay vì chỉ dùng boolean `is_available` để linh hoạt hơn (có thể có trạng thái cleaning, maintenance).

4. **Indexes**: Cần composite indexes phù hợp để optimize query performance khi filter theo room + appointment + time.

5. **Auto-release logic**: Cần tích hợp với appointment status flow hiện tại để tự động release phòng khi appointment kết thúc.

6. **Pattern consistency**: Plan này tuân thủ đầy đủ pattern hiện tại của dự án (Tortoise ORM, Pydantic validation, FastAPI router structure) để dễ maintain và scale.

### Citations

**File:** backend/ORMModels/appointments.py (L28-34)
```python
    class Meta:
        table = "appointments"
        indexes = [
            ["patient_id", "date"],  # Composite index
            ["nurse_id", "date"],    # Composite index
            ["status"],              # Single column index
        ]
```

**File:** backend/enums.py (L1-9)
```python
from enum import Enum

class AppointmentStatus(str, Enum):
    PENDING = "pending"
    NURSE_CONFIRMED = "nurseConfirmed"
    STARTED = "started"
    STOPPED = "stopped"
    COMPLETED = "completed"
    CANCELED = "canceled"
```

**File:** backend/pydanticModels/base.py (L74-110)
```python
# Appointment related models
class AppointmentBase(BaseModel):
    patient_id: int
    nurse_id: Optional[int]
    date: date
    time: time
    location: str
    symptoms: str
    transportation: str = "None"  # choices: "None", "Car", "Motor"
    startAt: datetime
    endAt: datetime

class AppointmentCreate(BaseModel):
    patient_id: int
    nurse_id: Optional[int]
    date: date
    time: time
    location: str
    symptoms: str
    transportation: str = "None"  # default to "None"

class AppointmentOut(BaseModel):
    id: int
    patient_id: int
    nurse_id: Optional[int]
    date: date
    time: time
    location: str
    symptoms: str
    transportation: str
    estimated_cost: float
    status: str  # choices: "pending", "nurseConfirmed", "started", "stopped", "completed", "canceled"
    startAt: datetime
    endAt: datetime

    class Config:
        orm_mode = True
```

**File:** backend/pydanticModels/__init__.py (L1-26)
```python
from .base import (
    LoginRequest,
    emailOPT,
    UserBase,
    UserCreate,
    UserOut,
    # UserProfile models
    UserProfileBase,
    UserProfileCreate,
    UserProfileUpdate,
    UserProfileOut,
    # Other models
    NurseBase,
    NurseCreate,
    NurseOut,
    PatientBase,
    PatientCreate,
    PatientOut,
    AppointmentBase,
    AppointmentCreate,
    AppointmentOut,
    NotificationBase,
    NotificationCreate,
    NotificationOut,
    ChangePassword
)
```

**File:** backend/Routers/appointment_router.py (L1-11)
```python
from fastapi import APIRouter, HTTPException
from typing import List, Optional
from datetime import datetime, date, time, timezone
from pydantic import BaseModel
from ORMModels.appointments import Appointment
from ORMModels.users import Nurse, Patient, User
from tortoise.expressions import Q
from pydanticModels import *
from enums import AppointmentStatus

router = APIRouter()
```

**File:** backend/Routers/appointment_router.py (L88-109)
```python
    # First get all busy nurse IDs
    busy_nurses = await Appointment.filter(
        date=availability.date,
        time=availability.time,
        status__in=[
            AppointmentStatus.PENDING,
            AppointmentStatus.NURSE_CONFIRMED,
            AppointmentStatus.STARTED
        ]
    ).values_list('nurse_id', flat=True)
    
    # Then query available nurses
    if busy_nurses:
        available_nurses = await Nurse.filter(
            Q(availability=True) & ~Q(nurse_id__in=busy_nurses)
        ).prefetch_related('user')
    else:
        available_nurses = await Nurse.filter(
            availability=True
        ).prefetch_related('user')
    
    return available_nurses
```

**File:** backend/Routers/appointment_router.py (L310-328)
```python
@router.post("/{appointment_id}/complete")
async def complete_appointment(appointment_id: int, patient_id: int):
    appointment = await Appointment.get_or_none(
        id=appointment_id,
        patient_id=patient_id
    )
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    if appointment.status != AppointmentStatus.STOPPED:
        raise HTTPException(
            status_code=400,
            detail="Can only complete confirmed appointments"
        )
    
    appointment.status = AppointmentStatus.COMPLETED
    appointment.endAt = datetime.now()
    await appointment.save()
    return {"message": "Appointment completed"}
```

**File:** backend/Routers/appointment_router.py (L348-365)
```python
@router.put("/{appointment_id}/cancel")
async def cancel_appointment_put(appointment_id: int):
    appointment = await Appointment.get_or_none(id=appointment_id)
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    if appointment.status not in [
        AppointmentStatus.PENDING,
        AppointmentStatus.NURSE_CONFIRMED
    ]:
        raise HTTPException(
            status_code=400,
            detail="Can only cancel pending or nurse-confirmed appointments"
        )
    
    appointment.status = AppointmentStatus.CANCELED
    await appointment.save()
    return {"message": "Appointment cancelled"}
```

**File:** backend/Routers/appointment_router.py (L474-491)
```python
APPOINTMENT_STATUS_FLOW = {
    AppointmentStatus.PENDING: [
        AppointmentStatus.NURSE_CONFIRMED,
        AppointmentStatus.CANCELED
    ],
    AppointmentStatus.NURSE_CONFIRMED: [
        AppointmentStatus.STARTED,
        AppointmentStatus.CANCELED
    ],
    AppointmentStatus.STARTED: [
        AppointmentStatus.STOPPED
    ],
    AppointmentStatus.STOPPED: [
        AppointmentStatus.COMPLETED
    ],
    AppointmentStatus.COMPLETED: [],
    AppointmentStatus.CANCELED: []
}
```

**File:** backend/ORMModels/__init__.py (L1-51)
```python
from tortoise import Tortoise

import os
from dotenv import load_dotenv

load_dotenv()

# Import models using absolute imports
from ORMModels.users import *
from ORMModels.appointments import *
from ORMModels.notification import *
# List all models for easy access
models = [User, UserProfile, Nurse, Patient, Appointment, Notification]

DATABASE_URL = os.getenv("DATABASE_URL")

async def init_orm(force_recreate=False):
    await Tortoise.init(
        db_url=DATABASE_URL,
        modules={
            'models': ['ORMModels.users', 'ORMModels.appointments', 'ORMModels.notification']
        }
    )
    if force_recreate:
        # Drop existing tables
        conn = Tortoise.get_connection("default")
        await conn.execute_script("""
            DROP TABLE IF EXISTS notification CASCADE;
            DROP TABLE IF EXISTS appointment CASCADE;
            DROP TABLE IF EXISTS nurse CASCADE;
            DROP TABLE IF EXISTS patient CASCADE;
            DROP TABLE IF EXISTS user_profile CASCADE;
            
        """)
    
    # Generate new schemas
    await Tortoise.generate_schemas()

async def close_orm():
    await Tortoise.close_connections()

__all__ = [
    'User',
    'UserProfile',
    'Nurse',
    'Patient',
    'Appointment',
    'Notification',
    'init_orm',
    'close_orm'
]
```
