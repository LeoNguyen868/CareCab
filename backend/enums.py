from enum import Enum

class AppointmentStatus(str, Enum):
    PENDING = "pending"
    NURSE_CONFIRMED = "nurseConfirmed"
    STARTED = "started"
    STOPPED = "stopped"
    COMPLETED = "completed"
    CANCELED = "canceled"

class RoomStatus(str, Enum):
    AVAILABLE = "available"      # Phòng trống
    OCCUPIED = "occupied"        # Đang có bệnh nhân
    CLEANING = "cleaning"        # Đang dọn dẹp
    MAINTENANCE = "maintenance"  # Đang bảo trì
