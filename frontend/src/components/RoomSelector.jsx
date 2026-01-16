import React, { useState, useEffect } from 'react';
import { getAvailableRooms } from '../apis/apis';
import RoomStatusBadge from './RoomStatusBadge';

const RoomSelector = ({ onSelect, selectedRoomId, date, time, disabled = false }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchRooms = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all rooms or filtered by date/time if provided
        const data = await getAvailableRooms(date, time);
        if (isMounted) {
          setRooms(data);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching rooms:", err);
          setError("Không thể tải danh sách phòng");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRooms();

    return () => {
      isMounted = false;
    };
  }, [date, time]);

  const handleChange = (e) => {
    const roomId = e.target.value;
    const room = rooms.find(r => r.id === parseInt(roomId)); // Assuming ID is int
    onSelect(room);
  };

  if (loading) return <div className="spinner-border spinner-border-sm text-primary" role="status"></div>;
  if (error) return <small className="text-danger">{error}</small>;

  return (
    <div className="room-selector">
      <select 
        className="form-control"
        value={selectedRoomId || ''}
        onChange={handleChange}
        disabled={disabled}
      >
        <option value="">-- Chọn phòng khám --</option>
        {rooms.map(room => (
          <option key={room.id} value={room.id}>
            {room.room_name} - {room.room_number} ({room.is_available ? 'Sẵn sàng' : 'Đang bận'})
          </option>
        ))}
      </select>
    </div>
  );
};

export default RoomSelector;
