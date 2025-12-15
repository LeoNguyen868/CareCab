from tortoise import Tortoise

# Import models using absolute imports
from ORMModels.users import *
from ORMModels.appointments import *
from ORMModels.notification import *
# List all models for easy access
models = [User, UserProfile, Nurse, Patient, Appointment, Notification]

DATABASE_URL = "postgres://postgres:Tih%23081844@host.docker.internal:5432/hihi"

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
