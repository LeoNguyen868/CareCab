from fastapi import APIRouter, HTTPException
from typing import List, Optional
from datetime import datetime, date, time, timezone
from pydantic import BaseModel
from ORMModels.appointments import Appointment
from ORMModels.users import Nurse, Patient, User
from tortoise.expressions import Q
from pydanticModels import *
from enums import AppointmentStatus

router = APIRouter()

# Pydantic models for request/response

# Add new Pydantic model for request
class AvailabilityCheck(BaseModel):
    date: date
    time: time

class AppointmentListResponse(BaseModel):
    id: int
    patient_id: int
    date: date
    time: time
    status: str
    symptoms: str
    
    class Config:
        orm_mode = True

@router.get("/", response_model=List[AppointmentListResponse])
async def get_all_appointments():
    return await Appointment.all()

@router.post("/available-nurses")
async def get_available_nurses(availability: AvailabilityCheck):
    # Check if requested date/time is in the past
    current_datetime = datetime.now(timezone.utc)
    requested_datetime = datetime.combine(
        availability.date,
        availability.time,
        tzinfo=timezone.utc
    )
    
    if requested_datetime < current_datetime:
        raise HTTPException(
            status_code=400,
            detail="Cannot check availability for past date/time"
        )
    
    # Check if booking is at least 2 hours in advance
    time_difference = requested_datetime - current_datetime
    if time_difference.total_seconds() < 7200:  # 7200 seconds = 2 hours
        raise HTTPException(
            status_code=400,
            detail="Appointments must be booked at least 2 hours in advance"
        )

    # First get all busy nurse IDs
    busy_nurses = await Appointment.filter(
        date=availability.date,
        time=availability.time,
        status__in=[
            AppointmentStatus.PENDING,
            AppointmentStatus.NURSE_CONFIRMED,
            AppointmentStatus.STARTED
        ]
    ).values_list('nurse_id', flat=True)
    
    # Then query available nurses
    if busy_nurses:
        available_nurses = await Nurse.filter(
            Q(availability=True) & ~Q(nurse_id__in=busy_nurses)
        ).prefetch_related('user')
    else:
        available_nurses = await Nurse.filter(
            availability=True
        ).prefetch_related('user')
    
    return available_nurses

@router.post("/check-timeslot")
async def check_timeslot(availability: AvailabilityCheck):
    # Check if requested date/time is in the past
    current_datetime = datetime.now(timezone.utc)
    
    # Create datetime from date and time, handle string input if necessary
    # Note: Pydantic handles basic type conversion, but safe to be explicit
    try:
        requested_datetime = datetime.combine(
            availability.date,
            availability.time,
            tzinfo=timezone.utc
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid date/time format")
    
    if requested_datetime < current_datetime:
        raise HTTPException(
            status_code=400,
            detail="Cannot check availability for past date/time"
        )
    
    # Check if booking is at least 2 hours in advance (consistent with other endpoints)
    time_difference = requested_datetime - current_datetime
    if time_difference.total_seconds() < 7200:
        return {"available": False, "reason": "Too soon"}

    # Logic: A timeslot is available if there is at least one nurse 
    # who is available AND not busy at that time
    
    # 1. Get all busy nurse IDs at that time
    busy_nurses = await Appointment.filter(
        date=availability.date,
        time=availability.time,
        status__in=[
            AppointmentStatus.PENDING,
            AppointmentStatus.NURSE_CONFIRMED,
            AppointmentStatus.STARTED
        ]
    ).values_list('nurse_id', flat=True)
    
    # 2. Count available nurses who are NOT in the busy list
    if busy_nurses:
        available_count = await Nurse.filter(
            Q(availability=True) & ~Q(nurse_id__in=busy_nurses)
        ).count()
    else:
        available_count = await Nurse.filter(
            availability=True
        ).count()
        
    return {"available": available_count > 0}

@router.post("/", response_model=AppointmentOut)
async def create_appointment(appointment: AppointmentCreate):
    # Check if appointment time is in the past
    current_datetime = datetime.now(timezone.utc)
    appointment_datetime = datetime.combine(
        appointment.date,
        appointment.time,
        tzinfo=timezone.utc
    )
    
    if appointment_datetime < current_datetime:
        raise HTTPException(
            status_code=400,
            detail="Cannot create appointment in the past"
        )
    
    # Check if booking is at least 2 hours in advance
    time_difference = appointment_datetime - current_datetime
    if time_difference.total_seconds() < 7200:  # 7200 seconds = 2 hours
        raise HTTPException(
            status_code=400,
            detail="Appointments must be booked at least 2 hours in advance"
        )

    # Validate patient
    patient = await Patient.get_or_none(id=appointment.patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
        
    # Validate nurse
    nurse = await Nurse.get_or_none(nurse_id=appointment.nurse_id)
    if not nurse:
        raise HTTPException(status_code=404, detail="Nurse not found")
    
    # Check if nurse is available
    if not nurse.availability:
        raise HTTPException(status_code=400, detail="Nurse is not available")
    
    # Validate appointment time is not in the past
    current_datetime = datetime.now(timezone.utc)
    appointment_datetime = datetime.combine(
        appointment.date,
        appointment.time,
        tzinfo=timezone.utc
    )
    if appointment_datetime < current_datetime:
        raise HTTPException(
            status_code=400,
            detail="Cannot create appointment in the past"
        )
    
    # Check for scheduling conflicts
    existing_appointment = await Appointment.get_or_none(
        nurse_id=appointment.nurse_id,
        date=appointment.date,
        time=appointment.time,
        status__in=[
            AppointmentStatus.PENDING,
            AppointmentStatus.NURSE_CONFIRMED,
            AppointmentStatus.STARTED
        ]
    )
    if existing_appointment:
        raise HTTPException(
            status_code=400,
            detail="Nurse already has an appointment at this time"
        )
    
    # Calculate estimated cost (base cost + transportation)
    base_cost = 100.00  # Base service cost
    transport_cost = 20.00 if appointment.transportation != "None" else 0
    total_cost = base_cost + transport_cost
    
    # Create appointment
    new_appointment = await Appointment.create(
        patient_id=appointment.patient_id,
        nurse_id=appointment.nurse_id,
        date=appointment.date,
        time=appointment.time,
        location=appointment.location,
        symptoms=appointment.symptoms,
        transportation=appointment.transportation,
        estimated_cost=total_cost,
        status=AppointmentStatus.PENDING
    )
    
    return new_appointment

@router.post("/{appointment_id}/nurse-confirm")
async def nurse_confirm_appointment(appointment_id: int, nurse_id: int):
    appointment = await Appointment.get_or_none(
        id=appointment_id,
        nurse_id=nurse_id
    )
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    if appointment.status != AppointmentStatus.PENDING:
        raise HTTPException(
            status_code=400,
            detail="Can only confirm pending appointments"
        )
    
    appointment.status = AppointmentStatus.NURSE_CONFIRMED
    await appointment.save()
    return {"message": "Appointment confirmed by nurse"}

@router.post("/{appointment_id}/start-service")
async def start_service(appointment_id: int, nurse_id: int):
    appointment = await Appointment.get_or_none(
        id=appointment_id,
        nurse_id=nurse_id
    )
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    if appointment.status != AppointmentStatus.NURSE_CONFIRMED:
        raise HTTPException(
            status_code=400,
            detail="Can only start confirmed appointments"
        )
    
    appointment.startAt = datetime.now()
    appointment.status = AppointmentStatus.STARTED
    await appointment.save()
    return {"message": "Service started"}
@router.post("/{appointment_id}/stop-service")
async def stop_service(appointment_id: int, nurse_id: int):
    appointment = await Appointment.get_or_none(
        id=appointment_id,
        nurse_id=nurse_id
    )
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    if appointment.status != AppointmentStatus.STARTED:
        raise HTTPException(
            status_code=400,
            detail="Can only stop started appointments"
        )
    
    appointment.endAt = datetime.now()
    appointment.status = AppointmentStatus.STOPPED
    await appointment.save()
    return {"message": "Service stopped"}

@router.post("/{appointment_id}/complete")
async def complete_appointment(appointment_id: int, patient_id: int):
    appointment = await Appointment.get_or_none(
        id=appointment_id,
        patient_id=patient_id
    )
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    if appointment.status != AppointmentStatus.STOPPED:
        raise HTTPException(
            status_code=400,
            detail="Can only complete confirmed appointments"
        )
    
    appointment.status = AppointmentStatus.COMPLETED
    appointment.endAt = datetime.now()
    await appointment.save()
    return {"message": "Appointment completed"}

@router.post("/{appointment_id}/staff-complete")
async def staff_complete_appointment(appointment_id: int):
    appointment = await Appointment.get_or_none(id=appointment_id)
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    # Allow staff to mark as complete from verified statuses
    if appointment.status not in [AppointmentStatus.NURSE_CONFIRMED, AppointmentStatus.STARTED, AppointmentStatus.STOPPED]:
         raise HTTPException(
            status_code=400,
            detail="Can only complete confirmed or active appointments"
        )

    appointment.status = AppointmentStatus.COMPLETED
    appointment.endAt = datetime.now()
    await appointment.save()
    return {"message": "Appointment completed by staff"}

@router.put("/{appointment_id}/cancel")
async def cancel_appointment_put(appointment_id: int):
    appointment = await Appointment.get_or_none(id=appointment_id)
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    if appointment.status not in [
        AppointmentStatus.PENDING,
        AppointmentStatus.NURSE_CONFIRMED
    ]:
        raise HTTPException(
            status_code=400,
            detail="Can only cancel pending or nurse-confirmed appointments"
        )
    
    appointment.status = AppointmentStatus.CANCELED
    await appointment.save()
    return {"message": "Appointment cancelled"}

@router.patch("/{appointment_id}/cancelled")
async def cancel_appointment_patch(appointment_id: int):
    appointment = await Appointment.get_or_none(id=appointment_id)
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    if appointment.status not in [
        AppointmentStatus.PENDING,
        AppointmentStatus.NURSE_CONFIRMED
    ]:
        raise HTTPException(
            status_code=400,
            detail="Can only cancel pending or nurse-confirmed appointments"
        )
    
    appointment.status = AppointmentStatus.CANCELED
    await appointment.save()
    return {"message": "Appointment cancelled"}

@router.get("/patient/{patient_id}", response_model=List[AppointmentOut])
async def get_patient_appointments(patient_id: int):
    appointments = await Appointment.filter(patient_id=patient_id)
    return appointments

@router.get("/upcoming/{patient_id}", response_model=List[AppointmentOut])
async def get_upcoming_appointments(patient_id: int):
    today = datetime.now().date()
    appointments = await Appointment.filter(
        patient_id=patient_id,
        date__gte=today,
        status__in=[
            AppointmentStatus.PENDING,
            AppointmentStatus.NURSE_CONFIRMED
        ]
    ).order_by('date', 'time')
    return appointments

@router.put("/{appointment_id}", response_model=AppointmentOut)
async def update_appointment(
    appointment_id: int,
    appointment: AppointmentCreate,
    patient_id: int
):
    # Verify appointment exists and belongs to patient
    existing_appointment = await Appointment.get_or_none(
        id=appointment_id,
        patient_id=patient_id
    )
    if not existing_appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    if existing_appointment.status not in [AppointmentStatus.PENDING]:
        raise HTTPException(
            status_code=400,
            detail="Can only modify pending appointments"
        )
    
    update_data = appointment.dict(exclude_unset=True)
    
    # Recalculate cost if transportation changed
    if 'transportation' in update_data:
        base_cost = 100.00
        transport_cost = 20.00 if update_data['transportation'] != "None" else 0
        update_data['estimated_cost'] = base_cost + transport_cost
    
    for key, value in update_data.items():
        setattr(existing_appointment, key, value)
    
    await existing_appointment.save()
    return existing_appointment

@router.delete("/{appointment_id}")
async def cancel_appointment(appointment_id: int, patient_id: int):
    appointment = await Appointment.get_or_none(
        id=appointment_id,
        patient_id=patient_id
    )
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    if appointment.status not in [
        AppointmentStatus.PENDING,
        AppointmentStatus.NURSE_CONFIRMED
    ]:
        raise HTTPException(
            status_code=400,
            detail="Can only cancel pending or nurse-confirmed appointments"
        )
    
    appointment.status = AppointmentStatus.CANCELED
    await appointment.save()
    return {"message": "Appointment cancelled"}

@router.post("/nurse/{nurse_id}/toggle-availability")
async def toggle_nurse_availability(nurse_id: int):
    nurse = await Nurse.get_or_none(nurse_id=nurse_id)
    if not nurse:
        raise HTTPException(status_code=404, detail="Nurse not found")
    
    nurse.availability = not nurse.availability
    await nurse.save()
    return {
        "message": f"Availability changed to {nurse.availability}",
        "availability": nurse.availability
    }

# Add an enum or constants for appointment status flow
APPOINTMENT_STATUS_FLOW = {
    AppointmentStatus.PENDING: [
        AppointmentStatus.NURSE_CONFIRMED,
        AppointmentStatus.CANCELED
    ],
    AppointmentStatus.NURSE_CONFIRMED: [
        AppointmentStatus.STARTED,
        AppointmentStatus.CANCELED
    ],
    AppointmentStatus.STARTED: [
        AppointmentStatus.STOPPED
    ],
    AppointmentStatus.STOPPED: [
        AppointmentStatus.COMPLETED
    ],
    AppointmentStatus.COMPLETED: [],
    AppointmentStatus.CANCELED: []
}

def validate_status_transition(current_status: str, new_status: str):
    if new_status not in APPOINTMENT_STATUS_FLOW[current_status]:
        raise HTTPException(
            status_code=400,
            detail=f"Cannot transition from {current_status} to {new_status}"
        )
