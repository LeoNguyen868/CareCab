from passlib.context import CryptContext
from passlib.exc import UnknownHashError

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    try:
        return pwd_context.verify(plain_password, hashed_password)
    except (ValueError, UnknownHashError):
        # If the hash is not recognized (e.g. it's plaintext from old system), return False
        return False

def get_password_hash(password):
    return pwd_context.hash(password)
