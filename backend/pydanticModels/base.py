from pydantic import BaseModel, EmailStr, constr
from datetime import datetime, date, time
from typing import Optional, List, Any

# Auth related models
class LoginRequest(BaseModel):
    username: str
    password: str

class emailOPT(BaseModel):
    email: str

class ChangePassword(BaseModel):
    email: EmailStr
    old_password: str
    new_password: str

# User related models
class UserBase(BaseModel):
    username: constr(max_length=50)
    password_hash: constr(max_length=128)
    email: EmailStr
    phone_number: Optional[str]
    role: str

class UserCreate(UserBase):
    pass

class UserOut(BaseModel):
    user_id: int
    username: str
    email: EmailStr
    phone_number: Optional[str]
    role: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

# Patient related models
class PatientBase(BaseModel):
    user_id: int
    monthly_subscription: bool = False

class PatientCreate(PatientBase):
    pass

class PatientOut(PatientBase):
    id: int

    class Config:
        orm_mode = True

# Nurse related models
class NurseBase(BaseModel):
    user_id: int
    specialization: str
    experience_years: int
    availability: bool = True
    description: Optional[str] = None  # New field

class NurseCreate(NurseBase):
    pass

class NurseOut(NurseBase):
    nurse_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

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

# UserProfile related models
class UserProfileBase(BaseModel):
    full_name: str
    date_of_birth: date
    gender: str
    bio: Optional[str] = None
    address: Optional[str] = None
    emergency_contact: Optional[str] = None
    emergency_contact_relationship: Optional[str] = None

class UserProfileCreate(UserProfileBase):
    user_id: int

class UserProfileUpdate(UserProfileBase):
    pass

class UserProfileOut(UserProfileBase):
    profile_id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

# Notification related models
class NotificationBase(BaseModel):
    user_id: int
    message: str
    status: constr(max_length=10) = "unread"  # 'read', 'unread'

class NotificationCreate(NotificationBase):
    pass

class NotificationOut(NotificationBase):
    notification_id: int
    created_at: datetime

    class Config:
        orm_mode = True