from fastapi import APIRouter, HTTPException
from pydanticModels import *
from ORMModels import *
from typing import List

router = APIRouter()

@router.get("/", response_model=List[NurseOut])
async def get_nurses():
    return await Nurse.all()

@router.get("/{nurse_id}", response_model=NurseOut)
async def get_nurse(nurse_id: int):
    nurse = await Nurse.get_or_none(nurse_id=nurse_id)
    if nurse is None:
        raise HTTPException(status_code=404, detail="Nurse not found")
    return nurse

@router.get("/user/{user_id}", response_model=NurseOut)
async def get_nurse_by_user_id(user_id: int):
    nurse = await Nurse.get_or_none(user_id=user_id)
    if nurse is None:
        raise HTTPException(status_code=404, detail="Nurse not found")
    return nurse

@router.post("/", response_model=NurseOut)
async def create_nurse(nurse: NurseCreate):
    new_nurse = await Nurse.create(**nurse.dict())
    return new_nurse

@router.put("/{nurse_id}", response_model=NurseOut)
async def update_nurse(nurse_id: int, nurse: NurseCreate):
    nurse_obj = await Nurse.get_or_none(nurse_id=nurse_id)
    if nurse_obj is None:
        raise HTTPException(status_code=404, detail="Nurse not found")
    await nurse_obj.update_from_dict(nurse.dict())
    return nurse_obj

@router.delete("/{nurse_id}")
async def delete_nurse(nurse_id: int):
    nurse = await Nurse.get_or_none(nurse_id=nurse_id)
    if nurse is None:
        raise HTTPException(status_code=404, detail="Nurse not found")
    await nurse.delete()
    return {"message": "Nurse deleted"}
