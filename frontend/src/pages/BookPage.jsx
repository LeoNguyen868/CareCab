import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/book.css';

const BookPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        appointmentDate: '',
        appointmentTime: '',
        notes: ''
    });
    const [showTimePopup, setShowTimePopup] = useState(false);
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [loading, setLoading] = useState(false);
    const [checkingSlots, setCheckingSlots] = useState(false);

    const WEEKDAY_SLOTS = [
        '17:00', '17:15', '17:30', '17:45',
        '18:00', '18:15', '18:30', '18:45',
        '19:00', '19:15', '19:30'
    ];

    const WEEKEND_MORNING_SLOTS = [
        '08:00', '08:15', '08:30', '08:45',
        '09:00', '09:15', '09:30', '09:45',
        '10:00', '10:15', '10:30'
    ];

    const WEEKEND_AFTERNOON_SLOTS = [
        '14:00', '14:15', '14:30', '14:45',
        '15:00', '15:15', '15:30', '15:45',
        '16:00', '16:15', '16:30'
    ];

    useEffect(() => {
        try {
            const userProfile = JSON.parse(localStorage.getItem('userProfile'));
            const userData = JSON.parse(localStorage.getItem('userData'));

            if (userProfile || userData) {
                setFormData(prev => ({
                    ...prev,
                    fullName: userProfile?.full_name || '',
                    phone: userData?.phone_number || ''
                }));
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (e) => {
        const date = e.target.value;
        setFormData(prev => ({ ...prev, appointmentDate: date, appointmentTime: '' }));
        setShowTimePopup(true);
        generateTimeSlots(date);
    };

    const generateTimeSlots = async (date) => {
        const selectedDate = new Date(date);
        const dayOfWeek = selectedDate.getDay();

        let slots = [];
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            slots = [...WEEKEND_MORNING_SLOTS, ...WEEKEND_AFTERNOON_SLOTS];
        } else {
            slots = WEEKDAY_SLOTS;
        }

        // Check availability
        setCheckingSlots(true);
        const availabilityChecks = slots.map(async (slot) => {
            const isAvailable = await checkTimeSlotAvailability(date, slot);
            return { slot, isAvailable };
        });

        const results = await Promise.all(availabilityChecks);
        setTimeSlots(results);
        setCheckingSlots(false);
    };

    const checkTimeSlotAvailability = async (date, timeSlot) => {
        try {
            const [hours, minutes] = timeSlot.split(':');
            const timeDate = new Date(date);
            timeDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

            const formattedTime = `${timeDate.getHours().toString().padStart(2, '0')}:${timeDate.getMinutes().toString().padStart(2, '0')}:00`;

            const response = await fetch('http://localhost:8000/appointments/check-timeslot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify({
                    date: timeDate.toISOString().split('T')[0],
                    time: formattedTime
                })
            });

            const data = await response.json();
            return data.available;
        } catch (error) {
            console.error('Error checking availability:', error);
            return false;
        }
    };



    const handleConfirmTime = () => {
        if (selectedTimeSlot) {
            setFormData(prev => ({ ...prev, appointmentTime: selectedTimeSlot }));
            setShowTimePopup(false);
        }
    };

    const handleCancelTime = () => {
        setShowTimePopup(false);
        setSelectedTimeSlot(null);
    };
    
    const handleTimeInputClick = () => {
        if (formData.appointmentDate) {
            setShowTimePopup(true);
            // Regenerate slots if needed, or rely on existing state if date hasn't changed.
            // For simplicity/robustness, checking slots again is safer but slower. 
            // Let's rely on cached slots if date is same, but here we just show popup.
             if (timeSlots.length === 0) {
                 generateTimeSlots(formData.appointmentDate);
             }
        } else {
            alert('Vui lòng chọn ngày khám trước');
        }
    };

    const getPatientId = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (!userData?.user_id) throw new Error('User ID not found');

            const response = await fetch(`http://localhost:8000/patients/user/${userData.user_id}`, {
                headers: { 'accept': 'application/json' }
            });
            const patientData = await response.json();
            return patientData.id;
        } catch (error) {
            console.error('Error getting patient ID:', error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.appointmentDate || !formData.appointmentTime) {
            alert('Vui lòng chọn ngày và giờ khám');
            return;
        }

        setLoading(true);
        try {
            const patientId = await getPatientId();
            const [hours, minutes] = formData.appointmentTime.split(':');
            const appointmentDateTime = new Date(formData.appointmentDate);
            appointmentDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

            const requestBody = {
                patient_id: patientId,
                nurse_id: 1, // Hardcoded as per book.js
                date: formData.appointmentDate,
                time: `${formData.appointmentTime}:00`,
                location: "",
                symptoms: formData.notes || "",
                transportation: "None"
            };

            const response = await fetch('http://localhost:8000/appointments/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) throw new Error('Booking failed');

            alert('Đặt lịch thành công!');
            navigate('/home'); // Redirect to home as per book.js
        } catch (error) {
            console.error('Booking error:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại sau');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelBooking = () => {
        if (window.confirm('Bạn có muốn hủy đặt lịch?')) {
            navigate('/home');
        }
    };

    return (
        <div className="booking-wrapper">
            <div className="booking-content">
                <div className="booking-container">
                    <div className="booking-form">
                        <div className="clinic-info">
                            <h2>Phòng khám Sản Phụ Khoa<br />Ngọc Hương</h2>
                            <p> 70 Quang Tiến, Đại Mỗ, Nam Từ Liêm, Hà Nội</p>
                        </div>

                        <form id="bookingForm" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="fullName">Họ và tên</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                    readOnly={!!formData.fullName}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Số điện thoại</label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    readOnly={!!formData.phone}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="appointmentDate">Ngày tái khám</label>
                                <input
                                    type="date"
                                    id="appointmentDate"
                                    name="appointmentDate"
                                    value={formData.appointmentDate}
                                    onChange={handleDateChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="appointmentTime">Giờ tái khám</label>
                                <input
                                    type="text"
                                    id="appointmentTime"
                                    name="appointmentTime"
                                    value={formData.appointmentTime}
                                    onClick={handleTimeInputClick}
                                    required
                                    readOnly
                                    placeholder="Chọn giờ"
                                />
                            </div>

                            <div className="form-group note-group">
                                <label htmlFor="notes">Ghi chú (nếu có)</label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    placeholder="Nhập ghi chú về tình trạng của bạn"
                                ></textarea>
                            </div>

                            <div className="form-actions">
                                <button type="button" className="btn btn-secondary" onClick={handleCancelBooking}>Hủy</button>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Đang xử lý...' : 'Xác nhận đặt lịch'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Time Selection Popup */}
            {showTimePopup && (
                <div className={`time-popup active`} onClick={handleCancelTime}>
                    <div className="time-popup-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Chọn giờ tái khám</h3>
                        
                        {checkingSlots ? (
                            <div className="loading-indicator">
                                <div className="spinner"></div>
                                <p>Đang kiểm tra thời gian còn trống...</p>
                            </div>
                        ) : (
                            <div className="time-grid">
                                {timeSlots.map(({ slot, isAvailable }) => (
                                    <button
                                        key={slot}
                                        type="button"
                                        className={`time-option ${!isAvailable ? 'disabled' : ''} ${selectedTimeSlot === slot ? 'selected' : ''}`}
                                        onClick={() => {
                                            if (isAvailable) setSelectedTimeSlot(slot);
                                            else alert('Khung giờ này đã đầy');
                                        }}
                                        disabled={!isAvailable}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="time-popup-actions">
                            <button type="button" className="btn btn-secondary" onClick={handleCancelTime}>Hủy</button>
                            <button 
                                type="button" 
                                className="btn btn-primary" 
                                onClick={handleConfirmTime}
                                disabled={!selectedTimeSlot || checkingSlots}
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookPage;
