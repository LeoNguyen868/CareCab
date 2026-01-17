import React, { useState, useEffect } from 'react';
import { assignRoomToAppointment, releaseRoom } from '../apis/apis'; 
import RoomSelector from '../components/RoomSelector';
import '../assets/css/rooms.css';

const RoomAssignment = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    // For simplicity, we fetch all appointments and filter client-side 
    // In real app, should use specific endpoint
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Reusing the fetch logic from AdminPage or similar to get appointments
            // Since I don't have direct access to 'fetchAppointments' from AdminPage without duplicating code or exporting it,
            // I'll make a direct fetch here similar to AdminPage's logic.
            const response = await fetch('http://localhost:8000/appointments/');
            const data = await response.json();
            
            // Filter for NURSE_CONFIRMED as per plan
            // Also maybe show assigned ones? "Show current room nếu đã được gán"
            const relevantAppointments = data.filter(apt => 
                apt.status === 'nurseConfirmed' ||  // Use backend enum value
                apt.status === 'started'
            );
            
            // We might need to enrich this with room info if valuable
            setAppointments(relevantAppointments);
        } catch (error) {
            console.error(error);
            setError('Không thể tải danh sách lịch hẹn');
        } finally {
            setLoading(false);
        }
    };

    const handleAssign = async (appointmentId, room) => {
        try {
            if (!room) return;
            await assignRoomToAppointment(room.id, appointmentId);
            alert('Gán phòng thành công!');
            fetchData();
        } catch (err) {
            alert(err.message || 'Gán phòng thất bại');
        }
    };

    const handleRelease = async (appointmentId, roomId) => {
         if (!roomId) return;
         if (!window.confirm("Bỏ gán phòng cho lịch hẹn này?")) return;
         try {
             await releaseRoom(roomId, appointmentId);
             fetchData();
         } catch (err) {
             alert(err.message || 'Lỗi khi bỏ gán phòng');
         }
    };

    return (
        <div className="rooms-container">
            <h2>Gán Phòng Khám</h2>
            <div className="alert alert-info">
                Danh sách lịch hẹn đã được y tá xác nhận (Confirmed) và cần gán phòng.
            </div>
            
            {error && <div className="alert alert-danger">{error}</div>}
            
            {loading ? (
                 <div className="text-center">
                    <div className="spinner-border text-primary" role="status"></div>
                </div>
            ) : (
                <div className="assignment-list">
                    {appointments.length === 0 ? (
                        <div className="text-center text-muted p-5">Không có lịch hẹn nào cần gán phòng</div>
                    ) : (
                        appointments.map(apt => (
                            <div key={apt.id} className="assignment-item">
                                <div className="flex-grow-1">
                                    <h5>{apt.patient_name || `Bệnh nhân #${apt.patient_id}`}</h5>
                                    <div><small><i className="far fa-clock"></i> {apt.appointment_time || apt.time} - {apt.appointment_date || apt.date}</small></div>
                                    <div><small>Triệu chứng: {apt.symptoms}</small></div>
                                    {apt.room_id && <div className="text-success mt-1"><i className="fas fa-check-circle"></i> Đã gán phòng: {apt.room_name}</div>}
                                </div>
                                
                                <div style={{ minWidth: '250px' }}>
                                    {apt.room_id ? (
                                        <button 
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => handleRelease(apt.id, apt.room_id)}
                                        >
                                            <i className="fas fa-times"></i> Hủy gán phòng
                                        </button>
                                    ) : (
                                        <div className="d-flex gap-2">
                                            <RoomSelector 
                                                onSelect={(room) => handleAssign(apt.id, room)}
                                                date={apt.date}
                                                time={apt.time}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default RoomAssignment;
