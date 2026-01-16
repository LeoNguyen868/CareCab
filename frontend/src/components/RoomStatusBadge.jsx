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
        return 'status-maintenance'; // Default to gray if unknown
    }
  };

  return (
    <span className={`room-status-badge ${getStatusClass(status)}`}>
      {getRoomStatusText(status)}
    </span>
  );
};

export default RoomStatusBadge;
