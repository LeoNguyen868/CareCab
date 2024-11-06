from fastapi import APIRouter, HTTPException
from typing import List
from pydanticModels.base import PatientCreate, PatientOut
from ORMModels.users import Patient, User
from ORMModels.appointments import Appointment

router = APIRouter()

@router.get("/", response_model=List[PatientOut])
async def get_all_patients():
    return await Patient.all().prefetch_related('user')

@router.get("/{patient_id}", response_model=PatientOut)
async def get_patient(patient_id: int):
    patient = await Patient.get_or_none(id=patient_id).prefetch_related('user')
    if patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

@router.get("/user/{user_id}", response_model=PatientOut)
async def get_patient_by_user_id(user_id: int):
    patient = await Patient.get_or_none(user_id=user_id).prefetch_related('user')
    if patient is None:
        raise HTTPException(status_code=404, detail="Patient not found for this user")
    return patient

@router.post("/", response_model=PatientOut)
async def create_patient(patient: PatientCreate):
    # Verify user exists
    user = await User.get_or_none(user_id=patient.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Check if patient already exists
    existing_patient = await Patient.get_or_none(user_id=patient.user_id)
    if existing_patient:
        raise HTTPException(status_code=400, detail="Patient already exists")
    
    # Create new patient
    new_patient = await Patient.create(
        user_id=patient.user_id,
        monthly_subscription=patient.monthly_subscription
    )
    return new_patient

@router.put("/{patient_id}", response_model=PatientOut)
async def update_patient(patient_id: int, patient: PatientCreate):
    patient_obj = await Patient.get_or_none(id=patient_id)
    if patient_obj is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    # Update subscription status
    patient_obj.monthly_subscription = patient.monthly_subscription
    await patient_obj.save()
    return patient_obj

@router.delete("/{patient_id}")
async def delete_patient(patient_id: int):
    patient = await Patient.get_or_none(id=patient_id)
    if patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    await patient.delete()
    return {"message": "Patient deleted"}

@router.get("/{patient_id}/appointments")
async def get_patient_appointments(patient_id: int):
    patient = await Patient.get_or_none(id=patient_id)
    if patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    appointments = await Appointment.filter(patient_id=patient_id)
    return appointments

@router.post("/{patient_id}/subscribe")
async def toggle_subscription(patient_id: int):
    patient = await Patient.get_or_none(id=patient_id)
    if patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    # Toggle subscription status
    patient.monthly_subscription = not patient.monthly_subscription
    await patient.save()
    
    status = "subscribed" if patient.monthly_subscription else "unsubscribed"
    return {"message": f"Patient {status} successfully"}

