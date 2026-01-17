from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from datetime import datetime, date, time
from pydantic import BaseModel
from ORMModels.rooms import Room, RoomAppointment
from ORMModels.appointments import Appointment
from enums import RoomStatus, AppointmentStatus
from pydanticModels import *
from tortoise.expressions import Q

router = APIRouter()

# --- CRUD Operations ---

@router.get("/", response_model=List[RoomOut])
async def get_rooms(is_available: Optional[bool] = None):
    query = Room.all()
    if is_available is not None:
        query = query.filter(is_available=is_available)
    return await query

@router.get("/{room_id}", response_model=RoomOut)
async def get_room(room_id: int):
    room = await Room.get_or_none(room_id=room_id)
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    return room

@router.post("/", response_model=RoomOut)
async def create_room(room_data: RoomCreate):
    # Check if name exists
    if await Room.filter(room_name=room_data.room_name).exists():
        raise HTTPException(status_code=400, detail="Room name already exists")
    
    room = await Room.create(**room_data.dict())
    return room

@router.put("/{room_id}", response_model=RoomOut)
async def update_room(room_id: int, room_data: RoomUpdate):
    room = await Room.get_or_none(room_id=room_id)
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    
    update_data = room_data.dict(exclude_unset=True)
    await room.update_from_dict(update_data)
    await room.save()
    return room

@router.delete("/{room_id}")
async def delete_room(room_id: int):
    room = await Room.get_or_none(room_id=room_id)
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    
    # Check for active assignments
    active_assignments = await RoomAppointment.filter(
        room_id=room_id,
        released_at__isnull=True
    ).exists()
    
    if active_assignments:
        raise HTTPException(status_code=400, detail="Cannot delete room with active assignments")
        
    await room.delete()
    return {"message": "Room deleted successfully"}

# --- Assignment Operations ---

class AssignRoomRequest(BaseModel):
    appointment_id: int
    notes: Optional[str] = None

@router.post("/{room_id}/assign", response_model=RoomAppointmentOut)
async def assign_room(room_id: int, request: AssignRoomRequest):
    # 1. Check Room
    room = await Room.get_or_none(room_id=room_id)
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    
    if not room.is_available:
        raise HTTPException(status_code=400, detail="Room is not available")
        
    # 2. Check Appointment
    appointment = await Appointment.get_or_none(id=request.appointment_id)
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    if appointment.status not in [AppointmentStatus.NURSE_CONFIRMED, AppointmentStatus.STARTED]:
        raise HTTPException(status_code=400, detail="Appointment status invalid for room assignment")
    
    # 3. Create Assignment
    assignment = await RoomAppointment.create(
        room=room,
        appointment=appointment,
        notes=request.notes
    )
    
    # 4. Update Room Status
    room.is_available = False
    room.status = RoomStatus.OCCUPIED
    await room.save()
    
    return assignment

class ReleaseRoomRequest(BaseModel):
    appointment_id: int

@router.post("/{room_id}/release")
async def release_room(room_id: int, request: ReleaseRoomRequest):
    room = await Room.get_or_none(room_id=room_id)
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
        
    assignment = await RoomAppointment.get_or_none(
        room_id=room_id,
        appointment_id=request.appointment_id,
        released_at__isnull=True
    )
    
    if not assignment:
        raise HTTPException(status_code=404, detail="No active assignment found for this room and appointment")
        
    # Update Assignment
    assignment.released_at = datetime.now()
    await assignment.save()
    
    # Update Room
    room.is_available = True
    room.status = RoomStatus.AVAILABLE
    await room.save()
    
    return {"message": "Room released successfully"}

# --- Query Operations ---

@router.get("/available", response_model=List[RoomOut])
async def get_available_rooms(date: Optional[date] = None, time: Optional[time] = None):
    query = Room.filter(is_available=True)
    
    if date and time:
        # Check conflicts with existing assignments
        datetime_str = f"{date} {time}"
        target_datetime = datetime.fromisoformat(datetime_str)
        
        # Exclude rooms with assignments at the same time
        conflicting_room_ids = await RoomAppointment.filter(
            assigned_at__lte=target_datetime,
            released_at__gte=target_datetime
        ).values_list('room_id', flat=True)
        
        if conflicting_room_ids:
            query = query.exclude(room_id__in=conflicting_room_ids)
    
    return await query

@router.get("/available/now", response_model=List[RoomOut])
async def get_available_rooms_now():
    return await Room.filter(is_available=True)

@router.get("/by-appointment/{appointment_id}", response_model=RoomOut)
async def get_room_by_appointment(appointment_id: int):
    assignment = await RoomAppointment.filter(
        appointment_id=appointment_id,
        released_at__isnull=True
    ).prefetch_related('room').first()
    
    if not assignment:
        raise HTTPException(status_code=404, detail="No room assigned to this appointment")
    
    return assignment.room

@router.get("/{room_id}/assignments", response_model=List[RoomAppointmentOut])
async def get_room_assignments(
    room_id: int, 
    start_date: Optional[date] = None, 
    end_date: Optional[date] = None, 
    active_only: bool = False
):
    query = RoomAppointment.filter(room_id=room_id).prefetch_related('appointment')
    
    if start_date:
        query = query.filter(assigned_at__gte=start_date)
    if end_date:
        query = query.filter(assigned_at__lte=end_date)
    if active_only:
        query = query.filter(released_at__isnull=True)
    
    return await query

@router.get("/{room_id}/status")
async def get_room_status(room_id: int):
    room = await Room.get_or_none(room_id=room_id)
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
        
    current_assignment = await RoomAppointment.filter(
        room_id=room_id, 
        released_at__isnull=True
    ).prefetch_related('appointment').first()
    
    # Get next appointment
    next_assignment = await RoomAppointment.filter(
        room_id=room_id,
        assigned_at__gt=datetime.now()
    ).order_by('assigned_at').prefetch_related('appointment').first()
    
    return {
        "room_id": room.room_id,
        "is_available": room.is_available,
        "status": room.status,
        "current_appointment": current_assignment.appointment if current_assignment else None,
        "next_appointment": next_assignment.appointment if next_assignment else None
    }
