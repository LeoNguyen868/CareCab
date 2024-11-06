from tortoise import fields
from tortoise.models import Model
from datetime import datetime

class Notification(Model):
    notification_id = fields.IntField(pk=True)
    user = fields.ForeignKeyField("models.User", related_name="notifications")
    title = fields.CharField(max_length=200)
    message = fields.TextField()
    notification_type = fields.CharField(max_length=50)  # 'appointment', 'system', 'reminder', etc.
    status = fields.CharField(max_length=20, default='unread')  # 'read', 'unread'
    is_important = fields.BooleanField(default=False)
    created_at = fields.DatetimeField(default=datetime.utcnow)
    read_at = fields.DatetimeField(null=True)

    class Meta:
        table = "notification"

    def __str__(self):
        return f"{self.title} - {self.notification_type}"
