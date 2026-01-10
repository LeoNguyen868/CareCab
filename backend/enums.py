from enum import Enum

class AppointmentStatus(str, Enum):
    PENDING = "pending"
    NURSE_CONFIRMED = "nurseConfirmed"
    STARTED = "started"
    STOPPED = "stopped"
    COMPLETED = "completed"
    CANCELED = "canceled"
