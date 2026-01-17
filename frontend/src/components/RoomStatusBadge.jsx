import React from 'react';
import { getRoomStatusText } from '../apis/ultis_api';

const RoomStatusBadge = ({ status }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'available':
        return 'status-available';
      case 'occupied':
        return 'status-occupied';
      case 'cleaning':
        return 'status-cleaning';
      case 'maintenance':
        return 'status-maintenance';
      default:
        return 'status-available'; // Default to available instead of maintenance
    }
  };

  return (
    <span className={`room-status-badge ${getStatusClass(status)}`}>
      {getRoomStatusText(status)}
    </span>
  );
};

export default RoomStatusBadge;
