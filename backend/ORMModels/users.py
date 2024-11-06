from tortoise import Tortoise, fields
from tortoise.models import Model
from datetime import datetime
import smtplib
import random
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pydantic import BaseModel
from typing import Optional
from datetime import date

class User(Model):
    user_id = fields.IntField(pk=True)
    username = fields.CharField(max_length=50, unique=True)
    password_hash = fields.CharField(max_length=128)
    email = fields.CharField(max_length=100, unique=True)
    phone_number = fields.CharField(max_length=20, null=True)
    role = fields.CharField(max_length=20)  # 'patient', 'nurse', 'admin', etc.
    created_at = fields.DatetimeField(default=datetime.utcnow)
    updated_at = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "user"
        indexes = [
            ["username", "email"],  # Composite index
            ["role"],  # Single column index
        ]

class UserProfile(Model):
    profile_id = fields.IntField(pk=True)
    user = fields.ForeignKeyField(
        "models.User", 
        related_name="profile",
        on_delete="CASCADE"
    )
    
    # Basic personal information
    full_name = fields.CharField(max_length=100)
    date_of_birth = fields.DateField()
    gender = fields.CharField(max_length=10, choices=["male", "female", "other"])
    bio = fields.TextField(null=True)  # New bio field
    
    # Contact information
    address = fields.TextField(null=True)
    emergency_contact = fields.CharField(max_length=100, null=True)
    emergency_contact_relationship = fields.CharField(max_length=50, null=True)
    
    created_at = fields.DatetimeField(default=datetime.utcnow)
    updated_at = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "user_profile"

class Nurse(Model):
    nurse_id = fields.IntField(pk=True)
    user = fields.ForeignKeyField(
        "models.User", 
        related_name="nurse",
        on_delete="CASCADE"
    )
    specialization = fields.CharField(max_length=100)
    experience_years = fields.IntField()
    availability = fields.BooleanField(default=True)
    description = fields.TextField(null=True)  # New field
    
    created_at = fields.DatetimeField(default=datetime.utcnow)
    updated_at = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "nurse"

class Patient(Model):
    id = fields.IntField(pk=True)
    user = fields.ForeignKeyField(
        "models.User", 
        related_name="patient",
        on_delete="CASCADE"
    )
    monthly_subscription = fields.BooleanField(default=False)

    class Meta:
        table = "patient"