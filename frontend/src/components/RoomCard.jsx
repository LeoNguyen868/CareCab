import React from 'react';
import RoomStatusBadge from './RoomStatusBadge';

const RoomCard = ({ room, onEdit, onDelete, onAssign, showActions = true }) => {
  return (
    <div className="room-card">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h3>{room.room_name}</h3>
          <div className="text-muted small">Phòng số: {room.room_number || 'N/A'}</div>
        </div>
        <RoomStatusBadge status={room.is_available ? 'available' : 'occupied'} /> 
        {/* Note: Backend needs to support specific statuses like cleaning/maintenance explicitly if more than boolean. 
            For now, mapping boolean is_available to available/occupied. 
            If backend adds status field, use room.status */}
      </div>
      
      <div className="room-details">
        <p className="mb-1">{room.description || 'Không có mô tả'}</p>
      </div>

      {showActions && (
        <div className="room-actions border-top pt-3">
          <button 
            className="btn btn-sm btn-outline-primary"
            onClick={() => onEdit(room)}
          >
            <i className="fas fa-edit"></i> Sửa
          </button>
          
          {room.is_available && (
             <button 
               className="btn btn-sm btn-outline-success"
               onClick={() => onAssign && onAssign(room)}
             >
               <i className="fas fa-user-plus"></i> Gán phòng
             </button>
          )}

          <button 
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(room)}
          >
            <i className="fas fa-trash"></i> Xóa
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomCard;
