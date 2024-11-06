from fastapi import APIRouter, HTTPException
from pydanticModels.base import (
    UserOut, 
    UserCreate, 
    UserProfileOut, 
    UserProfileCreate, 
    UserProfileUpdate
)
from ORMModels.users import User, UserProfile
from typing import List

router = APIRouter()

@router.get("/", response_model=List[UserOut])
async def get_users():
    return await User.all()

@router.get("/{user_id}", response_model=UserOut)
async def get_user(user_id: int):
    user = await User.get_or_none(user_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/", response_model=UserOut)
async def create_user(user: UserCreate):
    new_user = await User.create(**user.dict())
    return new_user

@router.put("/{user_id}", response_model=UserOut)
async def update_user(user_id: int, user: UserCreate):
    user_obj = await User.get_or_none(user_id=user_id)
    if user_obj is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Update fields
    for key, value in user.dict().items():
        setattr(user_obj, key, value)
    
    # Save changes to database
    await user_obj.save()
    return user_obj

@router.delete("/{user_id}")
async def delete_user(user_id: int):
    user = await User.get_or_none(user_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    await user.delete()
    return {"message": "User deleted"}

# UserProfile endpoints
@router.get("/profile/{user_id}", response_model=UserProfileOut)
async def get_user_profile(user_id: int):
    profile = await UserProfile.get_or_none(user_id=user_id)
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@router.post("/profile/", response_model=UserProfileOut)
async def create_user_profile(profile: UserProfileCreate):
    # Check if user exists
    user = await User.get_or_none(user_id=profile.user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Check if profile already exists
    existing_profile = await UserProfile.get_or_none(user_id=profile.user_id)
    if existing_profile:
        raise HTTPException(status_code=400, detail="Profile already exists")

    new_profile = await UserProfile.create(**profile.dict())
    return new_profile

@router.put("/profile/{user_id}", response_model=UserProfileOut)
async def update_user_profile(user_id: int, profile: UserProfileUpdate):
    profile_obj = await UserProfile.get_or_none(user_id=user_id)
    if profile_obj is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    # Update fields
    for key, value in profile.dict(exclude_unset=True).items():
        setattr(profile_obj, key, value)
    
    # Save changes to database
    await profile_obj.save()
    return profile_obj

@router.delete("/profile/{user_id}")
async def delete_user_profile(user_id: int):
    profile = await UserProfile.get_or_none(user_id=user_id)
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    await profile.delete()
    return {"message": "Profile deleted"}

