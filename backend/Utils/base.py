from tortoise import Tortoise, fields
from tortoise.models import Model
from datetime import datetime
import os
import smtplib
import random
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
#utils
#email
def send_otp_email(receiver_email):
    sender_email = os.getenv("EMAIL_SENDER")
    app_password = os.getenv("EMAIL_PASSWORD")

    if not sender_email or not app_password:
        print("Error: Email credentials not configured.")
        return None

    otp = random.randint(100000, 999999)
    subject = "Your OTP Code"
    body = f"Your OTP code is: {otp}"
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject
    message.attach(MIMEText(body, "plain"))
    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(sender_email, app_password)
        server.sendmail(sender_email, receiver_email, message.as_string())
    print(f"OTP sent to {receiver_email}: {otp}")
    return otp

async def init_orm():
    await Tortoise.init(
        db_url='sqlite://db.sqlite3',
        modules={'models': ['ORMModels.users', 'ORMModels.appointments']},
        generate_schemas=True,  # Enable auto schema generation
        add_exception_handlers=True
    )
    # Update only if there are schema changes
    await update_changed_schemas()

async def get_current_schema_version():
    """Get current schema structure for comparison"""
    return await Tortoise.describe_models()

async def update_changed_schemas():
    """Update only modified tables"""
    current_models = await get_current_schema_version()
    for model in Tortoise.apps.get('models').values():
        if model._meta.table not in current_models:
            await model.schema.create()
        else:
            # Compare schema and update if changed
            await model.schema.update(safe=True)