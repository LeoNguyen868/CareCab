from tortoise import Tortoise, fields
from tortoise.models import Model
from datetime import datetime
from enums import AppointmentStatus

class Appointment(Model):
    id = fields.IntField(pk=True)
    patient = fields.ForeignKeyField(
        "models.Patient", 
        related_name="appointments",
        on_delete="CASCADE"
    )
    nurse = fields.ForeignKeyField(
        "models.Nurse", 
        related_name="appointments", 
        null=True,
        on_delete="SET NULL"  # Allow null if nurse is deleted
    )
    date = fields.DateField()
    time = fields.TimeField()
    location = fields.CharField(max_length=255)
    symptoms = fields.TextField()
    estimated_cost = fields.DecimalField(max_digits=10, decimal_places=2)
    status = fields.CharField(max_length=20, default=AppointmentStatus.PENDING, choices=[s.value for s in AppointmentStatus])
    transportation = fields.CharField(max_length=50,default="None", choices=["None", "Car", "Motor"])
    startAt=fields.DatetimeField(default=datetime.now)
    endAt=fields.DatetimeField(default=datetime.now)
    class Meta:
        table = "appointments"
        indexes = [
            ["patient_id", "date"],  # Composite index
            ["nurse_id", "date"],    # Composite index
            ["status"],              # Single column index
        ]

# This model is redundant since you already have nurse field in Appointment
# Consider removing NurseAppointments model entirely
