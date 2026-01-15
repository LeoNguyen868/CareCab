from fastapi import APIRouter, HTTPException
from ORMModels import *
from Utils import *
from Utils.security import verify_password, get_password_hash
from tortoise.queryset import Q
from pydanticModels import *

router = APIRouter()

@router.post("/login")
async def login(login_request: LoginRequest):
    user = await User.get_or_none(
        Q(username=login_request.username) | Q(email=login_request.username)
    )
    if user is None or not verify_password(login_request.password, user.password_hash):
        # Fallback for old plaintext passwords (temporary migration step)
        # Prevent pass-the-hash: only allow plaintext match if it's NOT a bcrypt hash
        is_bcrypt = user and user.password_hash.startswith(('$2b$', '$2a$', '$2y$'))
        if user and not is_bcrypt and user.password_hash == login_request.password:
            # Optionally migrate here:
            # user.password_hash = get_password_hash(login_request.password)
            # await user.save()
            pass
        else:
            raise HTTPException(status_code=401, detail="Invalid username or password")

    return {"message": "Login successful", "data": user}

@router.post("/change_password")
async def change_password(change_password: ChangePassword):
    user = await User.get_or_none(email=change_password.email)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    # Verify old password
    if not verify_password(change_password.old_password, user.password_hash):
        # Fallback for old plaintext passwords
        # Prevent pass-the-hash: only allow plaintext match if it's NOT a bcrypt hash
        is_bcrypt = user.password_hash.startswith(('$2b$', '$2a$', '$2y$'))
        if is_bcrypt or user.password_hash != change_password.old_password:
             raise HTTPException(status_code=401, detail="Invalid old password")

    user.password_hash = get_password_hash(change_password.new_password)
    await user.save()
    return {"message": "Password changed successfully"}

@router.post("/otp")
async def otp(email_opt: emailOPT):
    user = await User.get_or_none(email=email_opt.email)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    send_otp_email(user.email)
    return {"message": "OTP sent to email"}
