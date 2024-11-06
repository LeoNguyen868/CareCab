from .user_router import router as user_router
from .nurse_router import router as nurse_router
from .auth_router import router as auth_router
from .appointment_router import router as appointment_router
from .patient_router import router as patient_router

__all__ = [
    "user_router",
    "nurse_router",
    "auth_router",
    "appointment_router",
    "patient_router"
]
