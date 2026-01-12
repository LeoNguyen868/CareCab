import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/home.css';

const HomePage = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('Người dùng');
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUserProfile();
        loadPatientData();
        document.title = "Trang chủ - CareCab";
    }, []);

    const loadUserProfile = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (!userData) return;

            const cachedProfile = localStorage.getItem('userProfile');
            if (cachedProfile) {
                const profileData = JSON.parse(cachedProfile);
                setUserName(profileData.full_name || userData.username);
                return;
            }

            const response = await fetch(`http://localhost:8000/users/profile/${userData.user_id}`, {
                headers: { 'accept': 'application/json' }
            });
            const data = await response.json();

            if (data) {
                localStorage.setItem('userProfile', JSON.stringify(data));
                setUserName(data.full_name || userData.username);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const loadPatientData = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (!userData?.user_id) return;

            const response = await fetch(`http://localhost:8000/patients/user/${userData.user_id}`, {
                headers: { 'accept': 'application/json' }
            });
            const patientData = await response.json();

            if (patientData) {
                localStorage.setItem('patientData', JSON.stringify(patientData));
                await fetchAppointments(patientData.id);
            }
        } catch (error) {
            console.error('Error loading patient data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAppointments = async (patientId) => {
        try {
            const response = await fetch(`http://localhost:8000/appointments/patient/${patientId}`, {
                headers: { 'accept': 'application/json' }
            });

            if (!response.ok) return;

            const appointments = await response.json();
            
            // Logic matching home.js:
            // Today at 00:00:00 to Today + 5 days at 23:59:59
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const fiveDaysFromNow = new Date();
            fiveDaysFromNow.setDate(today.getDate() + 5);
            fiveDaysFromNow.setHours(23, 59, 59, 999);

            const upcoming = appointments
                .filter(apt => {
                    const aptDate = new Date(apt.appointment_date + 'T00:00:00'); // Assuming date is YYYY-MM-DD
                    // Backoff for date format if needed, but home.js uses this
                    return aptDate >= today && 
                           aptDate <= fiveDaysFromNow && 
                           (apt.status === 'pending' || apt.status === 'confirmed');
                })
                .sort((a, b) => new Date(a.appointment_date) - new Date(b.appointment_date));

            setUpcomingAppointments(upcoming);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const formatDate = (dateString) => {
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

    const handleAppointmentClick = () => {
        navigate('/appointments');
    };

    return (
        <>
            <main className="dashboard">
                <section className="welcome-section">
                    <h2>Xin chào, <span id="userName">{userName}</span></h2>
                    <p>Chào mừng bạn đến với hệ thống đặt lịch tái khám CareCab</p>
                </section>

                <section className="quick-actions">
                    <div className="action-card">
                        <h3>Đặt lịch tái khám</h3>
                        <p>Tạo lịch hẹn mới với bác sĩ</p>
                        <Link to="/home/book" className="btn btn-primary">Đặt lịch ngay</Link>
                    </div>
                    <div className="action-card">
                        <h3>Lịch sắp tới</h3>
                        <div id="upcomingAppointments">
                            {loading ? (
                                <p>Đang tải...</p>
                            ) : upcomingAppointments.length > 0 ? (
                                upcomingAppointments.map((apt) => (
                                    <div
                                        key={apt.id}
                                        className="appointment-item"
                                        onClick={handleAppointmentClick}
                                    >
                                        <p><strong>Ngày:</strong> {formatDate(apt.appointment_date)}</p>
                                        <p><strong>Giờ:</strong> {formatTime(apt.appointment_time)}</p>
                                        <p><strong>Trạng thái:</strong> <span className={`status-${apt.status}`}>{getStatusText(apt.status)}</span></p>
                                    </div>
                                ))
                            ) : (
                                <p>Không có lịch hẹn nào trong 5 ngày tới</p>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default HomePage;