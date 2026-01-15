import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/appointments.css';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    useEffect(() => {
        loadAppointments();
    }, []);

    // Optimized: Memoize filtered appointments to avoid unnecessary re-renders and state synchronization issues
    const filteredAppointments = useMemo(() => {
        if (activeTab === 'all') {
            return appointments;
        } else {
            return appointments.filter(apt => apt.status === activeTab);
        }
    }, [appointments, activeTab]);

    const loadAppointments = async () => {
        try {
            // First check for cached patient data
            let patientId;
            const patientData = localStorage.getItem('patientData');
            
            if (patientData) {
                patientId = JSON.parse(patientData).id;
            } else {
                // If not cached, try to fetch using userData
                const userData = JSON.parse(localStorage.getItem('userData'));
                if (!userData?.user_id) {
                    setLoading(false);
                    return;
                }

                const response = await fetch(`http://localhost:8000/patients/user/${userData.user_id}`, {
                    headers: { 'accept': 'application/json' }
                });
                const data = await response.json();
                if (data) {
                    localStorage.setItem('patientData', JSON.stringify(data));
                    patientId = data.id;
                }
            }

            if (patientId) {
                const response = await fetch(`http://localhost:8000/appointments/patient/${patientId}`, {
                    headers: { 'accept': 'application/json' }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    // Sort by newest first
                    const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    setAppointments(sortedData);
                }
            }
        } catch (error) {
            console.error('Error loading appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTabClick = (status) => {
        setActiveTab(status);
    };

    const handleAppointmentClick = (appointment) => {
        setSelectedAppointment(appointment);
    };

    const closePopup = () => {
        setSelectedAppointment(null);
    };

    const handleCancelAppointment = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn hủy lịch hẹn này?')) {
            try {
                // Assuming cancel endpoint exists or using generic update 
                // For now, based on appointments.js, it might just allow cancelling pending
                const response = await fetch(`http://localhost:8000/appointments/${id}/cancel`, {
                    method: 'PUT',
                    headers: { 'accept': 'application/json' }
                });

                if (response.ok) {
                    alert('Hủy lịch hẹn thành công');
                    loadAppointments(); // Reload data
                    closePopup();
                } else {
                    alert('Không thể hủy lịch hẹn');
                }
            } catch (error) {
                console.error('Error cancelling appointment:', error);
                alert('Có lỗi xảy ra');
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        return timeString?.substring(0, 5) || '';
    };

    const getStatusText = (status) => {
        const statusMap = {
            'pending': 'Chờ xác nhận',
            'confirmed': 'Đã xác nhận',
            'cancelled': 'Đã hủy',
            'completed': 'Đã hoàn thành'
        };
        return statusMap[status] || status;
    };

    return (
        <div className="appointments-wrapper">
            <div className="appointments-content">
                <main className="appointments-page">
                    <h2>Danh sách lịch hẹn</h2>
                    
                    <div className="status-tabs">
                        <button 
                            aria-pressed={activeTab === 'pending'}
                            className={`status-tab ${activeTab === 'pending' ? 'active' : ''}`}
                            onClick={() => handleTabClick('pending')}
                        >
                            Chờ xác nhận
                        </button>
                        <button 
                            aria-pressed={activeTab === 'confirmed'}
                            className={`status-tab ${activeTab === 'confirmed' ? 'active' : ''}`}
                            onClick={() => handleTabClick('confirmed')}
                        >
                            Đã xác nhận
                        </button>
                        <button 
                            aria-pressed={activeTab === 'cancelled'}
                            className={`status-tab ${activeTab === 'cancelled' ? 'active' : ''}`}
                            onClick={() => handleTabClick('cancelled')}
                        >
                            Đã hủy
                        </button>
                        <button 
                            aria-pressed={activeTab === 'completed'}
                            className={`status-tab ${activeTab === 'completed' ? 'active' : ''}`}
                            onClick={() => handleTabClick('completed')}
                        >
                            Đã hoàn thành
                        </button>
                        <button 
                            aria-pressed={activeTab === 'all'}
                            className={`status-tab ${activeTab === 'all' ? 'active' : ''}`}
                            onClick={() => handleTabClick('all')}
                        >
                            Tất cả
                        </button>
                    </div>

                    <div className="appointments-list">
                        {loading ? (
                            <p>Đang tải lịch hẹn...</p>
                        ) : filteredAppointments.length > 0 ? (
                            filteredAppointments.map((apt) => (
                                <div 
                                    key={apt.id} 
                                    className="appointment-item"
                                    onClick={() => handleAppointmentClick(apt)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            handleAppointmentClick(apt);
                                        }
                                    }}
                                >
                                    <p><strong>Ngày:</strong> {formatDate(apt.appointment_date)}</p>
                                    <p><strong>Giờ:</strong> {formatTime(apt.appointment_time)}</p>
                                    <p><strong>Bác sĩ:</strong> {apt.doctor_name || 'Đang cập nhật'}</p>
                                    <p><strong>Trạng thái:</strong> <span className={`status-${apt.status}`}>{getStatusText(apt.status)}</span></p>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <div className="empty-state-icon">
                                    <i className="fas fa-calendar-plus" aria-hidden="true"></i>
                                </div>
                                <h3 className="empty-state-title">Chưa có lịch hẹn nào</h3>
                                <p className="empty-state-text">
                                    Bạn chưa có lịch hẹn{activeTab !== 'all' ? ` ở trạng thái "${getStatusText(activeTab)}"` : ''}.
                                    Hãy đặt lịch khám ngay để chăm sóc sức khỏe của bạn.
                                </p>
                                <Link to="/book" className="btn btn-primary empty-state-action">
                                    Đặt lịch khám ngay
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Appointment Details Popup */}
                    <div
                        className={`appointment-popup ${selectedAppointment ? 'active' : ''}`}
                        onClick={closePopup}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="popup-title"
                    >
                        <div className="appointment-popup-content" onClick={(e) => e.stopPropagation()}>
                            <button className="close-popup" onClick={closePopup} aria-label="Đóng">&times;</button>
                            <h3 id="popup-title">Chi tiết lịch hẹn</h3>
                            
                            {selectedAppointment && (
                                <div className="appointment-details">
                                    <p><strong>Ngày:</strong> {formatDate(selectedAppointment.appointment_date)}</p>
                                    <p><strong>Giờ:</strong> {formatTime(selectedAppointment.appointment_time)}</p>
                                    <p><strong>Trạng thái:</strong> <span className={`status-${selectedAppointment.status}`}>{getStatusText(selectedAppointment.status)}</span></p>
                                    <p><strong>Bác sĩ:</strong> {selectedAppointment.doctor_name || 'Đang chờ xếp lịch'}</p>
                                    <p><strong>Triệu chứng:</strong> {selectedAppointment.symptoms || 'Không có'}</p>
                                    <p><strong>Ghi chú:</strong> {selectedAppointment.notes || 'Không có'}</p>
                                    
                                    <div className="popup-actions">
                                        {(selectedAppointment.status === 'pending' || selectedAppointment.status === 'confirmed') && (
                                            <button 
                                                className="btn btn-danger"
                                                onClick={() => handleCancelAppointment(selectedAppointment.id)}
                                            >
                                                Hủy lịch hẹn
                                            </button>
                                        )}
                                        <button className="btn btn-secondary" onClick={closePopup}>Đóng</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Appointments;