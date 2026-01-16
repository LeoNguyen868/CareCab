from tortoise import fields, models
from enums import RoomStatus

class Room(models.Model):
    room_id = fields.IntField(pk=True)
    room_name = fields.CharField(max_length=100, unique=True)
    room_number = fields.CharField(max_length=20, null=True)
    description = fields.TextField(null=True)
    is_available = fields.BooleanField(default=True)
    status = fields.CharEnumField(RoomStatus, default=RoomStatus.AVAILABLE)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "rooms"
        indexes = [
            ["status"],
        ]

class RoomAppointment(models.Model):
    id = fields.IntField(pk=True)
    room = fields.ForeignKeyField('models.Room', related_name='appointments', on_delete=fields.CASCADE)
    appointment = fields.ForeignKeyField('models.Appointment', related_name='room_assignments', on_delete=fields.CASCADE)
    assigned_at = fields.DatetimeField(auto_now_add=True)
    released_at = fields.DatetimeField(null=True)
    notes = fields.TextField(null=True)

    class Meta:
        table = "room_appointments"
        indexes = [
            ["room_id", "appointment_id"],
            ["appointment_id", "assigned_at"],
            ["room_id"]
        ]
