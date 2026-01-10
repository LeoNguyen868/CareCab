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
        if user and user.password_hash == login_request.password:
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
