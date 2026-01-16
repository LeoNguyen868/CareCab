import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/css/admin.css';

const AdminPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const WEEKDAY_SLOTS = [
    '17:00', '17:15', '17:30', '17:45',
    '18:00', '18:15', '18:30', '18:45',
    '19:00', '19:15', '19:30'
  ];

  const WEEKEND_SLOTS = [
    '08:00', '08:15', '08:30', '08:45',
    '09:00', '09:15', '09:30', '09:45',
    '10:00', '10:15', '10:30',
    '14:00', '14:15', '14:30', '14:45',
    '15:00', '15:15', '15:30', '15:45',
    '16:00', '16:15', '16:30'
  ];

  const fetchAppointments = React.useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/appointments/');
      const data = await response.json();
      
      // Map data to match the component's expected structure
      const formattedAppointments = data.map(apt => ({
        ...apt,
        appointment_date: apt.date || apt.appointment_date,
        appointment_time: apt.time || apt.appointment_time,
        patientName: apt.patient_name || 'N/A',
        phone: apt.patient_phone || 'N/A',
        email: apt.patient_email || 'N/A'
      }));
      
      setAppointments(formattedAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }, []);

  const applyFilters = React.useCallback(() => {
    let filtered = [...appointments];

    // Status filter
    if (currentFilter !== 'all') {
      filtered = filtered.filter(apt => apt.status === currentFilter);
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(apt =>
        apt.id?.toString().includes(term) ||
        apt.patientName?.toLowerCase().includes(term) ||
        apt.phone?.includes(term) ||
        apt.reason?.toLowerCase().includes(term)
      );
    }

    // Date filter
    if (dateFilter) {
      filtered = filtered.filter(apt => apt.appointment_date === dateFilter);
    }

    // Time filter
    if (timeFilter) {
      filtered = filtered.filter(apt => apt.appointment_time?.startsWith(timeFilter));
    }

    setFilteredAppointments(filtered);
  }, [appointments, currentFilter, searchTerm, dateFilter, timeFilter]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    setLoading(true);
    try {
      let endpoint;
      let method = 'POST';

      if (newStatus === 'completed') {
        endpoint = `http://localhost:8000/appointments/${appointmentId}/staff-complete`;
      } else if (newStatus === 'nurseConfirmed') {
        endpoint = `http://localhost:8000/appointments/${appointmentId}/nurse-confirm?nurse_id=1`;
      } else {
        // Fallback for other statuses if needed, though admin.js only has confirm/complete
        endpoint = `http://localhost:8000/appointments/${appointmentId}/${newStatus}`;
        method = 'PATCH';
      }

      const response = await fetch(endpoint, {
        method: method,
        headers: { 'accept': 'application/json' }
      });

      if (response.ok) {
        const statusText = newStatus === 'nurseConfirmed' ? 'xác nhận' : newStatus === 'completed' ? 'hoàn thành' : 'cập nhật';
        showMessage(`Đã ${statusText} lịch hẹn!`, 'success');
        await fetchAppointments();
        setShowPopup(false);
      } else {
        showMessage('Không thể cập nhật trạng thái', 'error');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      showMessage('Có lỗi xảy ra', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { class: 'status-pending', text: 'Chờ xác nhận' },
      nurseConfirmed: { class: 'status-confirmed', text: 'Đã xác nhận' },
      completed: { class: 'status-completed', text: 'Đã hoàn thành' },
      cancelled: { class: 'status-cancelled', text: 'Đã hủy' }
    };
    const badge = badges[status] || { class: '', text: status };
    return <span className={`status-badge ${badge.class}`}>{badge.text}</span>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const formatTime = (timeString) => {
    return timeString?.substring(0, 5) || '';
  };

  const renderAppointmentCards = () => {
    if (filteredAppointments.length === 0) {
      return (
        <div className="empty-state">
          <i className="fas fa-calendar-times"></i>
          <p>Không có lịch hẹn nào</p>
        </div>
      );
    }

    return filteredAppointments.map((apt) => (
      <div 
        key={apt.id} 
        className="appointment-card"
        onClick={() => {
           setSelectedAppointment(apt);
           setShowPopup(true);
        }}
        data-id={apt.id}
      >
        <div className="appointment-card-header">
          <h3>{apt.patientName}</h3>
          {getStatusBadge(apt.status)}
        </div>
        <div className="appointment-card-body">
          <p><i className="fas fa-calendar-check"></i> <strong>Mã lịch hẹn:</strong> {apt.id}</p>
          <p><i className="fas fa-user-tag"></i> <strong>Mã BN:</strong> {apt.patient_id}</p>
          <p><i className="far fa-clock"></i> <strong>Giờ:</strong> {formatTime(apt.appointment_time)}</p>
          <p><i className="far fa-calendar-alt"></i> <strong>Ngày:</strong> {formatDate(apt.appointment_date)}</p>
          
          {apt.status === 'pending' && (
            <button
              className="btn-confirm"
              onClick={(e) => { e.stopPropagation(); handleStatusChange(apt.id, 'nurseConfirmed'); }}
              disabled={loading}
            >
              <i className="fas fa-check"></i> Xác nhận
            </button>
          )}
          {apt.status === 'nurseConfirmed' && (
            <button
              className="btn-complete"
              onClick={(e) => { e.stopPropagation(); handleStatusChange(apt.id, 'completed'); }}
              disabled={loading}
            >
              <i className="fas fa-check"></i> Hoàn thành
            </button>
          )}
        </div>
      </div>
    ));
  };

  return (
    <>
    <Header />
    <div className="admin-wrapper">
      <div className="admin-content">
        <main className="main-content">
          <div className="dashboard">
            {/* Message Container */}
            {message.text && (
              <div className="message-container">
                <div className={`message ${message.type}`}>
                  <i className={`fas fa-${message.type === 'success' ? 'check-circle' : 'exclamation-circle'}`}></i>
                  <span>{message.text}</span>
                  <button onClick={() => setMessage({ text: '', type: '' })}>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            )}

            <section className="welcome-section">
              <div className="welcome-header">
                <h2>Quản lý lịch tái khám</h2>
                
                <div className="filters-row">
                  <div className="filters-group">
                    <div className="search-wrapper">
                      <i className="fas fa-search"></i>
                      <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="filters-actions">
                      <div className="date-filter-wrapper">
                        <input
                          type="date"
                          className="date-filter"
                          value={dateFilter}
                          onChange={(e) => setDateFilter(e.target.value)}
                        />
                      </div>
                      <div className="time-filter-wrapper">
                        <select
                          className="time-filter"
                          value={timeFilter}
                          onChange={(e) => setTimeFilter(e.target.value)}
                        >
                          <option value="">Chọn giờ</option>
                          {[...WEEKDAY_SLOTS, ...WEEKEND_SLOTS].map(slot => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                      </div>
                      {(dateFilter || timeFilter) && (
                        <button
                          className="btn-clear-filter"
                          onClick={() => {
                            setDateFilter('');
                            setTimeFilter('');
                          }}
                        >
                          <i className="fas fa-times"></i> Xóa bộ lọc
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="status-filters">
                  <button
                    className={`filter-btn ${currentFilter === 'pending' ? 'active' : ''}`}
                    onClick={() => setCurrentFilter('pending')}
                  >
                    Chờ xác nhận
                  </button>
                  <button
                    className={`filter-btn ${currentFilter === 'nurseConfirmed' ? 'active' : ''}`}
                    onClick={() => setCurrentFilter('nurseConfirmed')}
                  >
                    Đã xác nhận
                  </button>
                  <button
                    className={`filter-btn ${currentFilter === 'completed' ? 'active' : ''}`}
                    onClick={() => setCurrentFilter('completed')}
                  >
                    Đã hoàn thành
                  </button>
                  <button
                    className={`filter-btn ${currentFilter === 'cancelled' ? 'active' : ''}`}
                    onClick={() => setCurrentFilter('cancelled')}
                  >
                    Đã hủy
                  </button>
                  <button
                    className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setCurrentFilter('all')}
                  >
                    Tất cả
                  </button>
                </div>
              </div>
            </section>

            <div className="appointments-container">
              <div id="appointmentsList" className="appointments-table-view">
                <table className="appointments-table">
                  <thead>
                    <tr>
                      <th>Mã lịch hẹn</th>
                      <th>Mã BN</th>
                      <th>Tên bệnh nhân</th>
                      <th>Giờ</th>
                      <th>Ngày</th>
                      <th>Mã Nurse</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ textAlign: 'center' }}>
                          Không có lịch hẹn nào
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments.map((apt) => (
                        <tr 
                          key={apt.id} 
                          onClick={() => {
                            setSelectedAppointment(apt);
                            setShowPopup(true);
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <td>{apt.id}</td>
                          <td>{apt.patient_id}</td>
                          <td>{apt.patientName}</td>
                          <td>{formatTime(apt.appointment_time)}</td>
                          <td>{formatDate(apt.appointment_date)}</td>
                          <td>{apt.nurse_id || 'N/A'}</td>
                          <td>{getStatusBadge(apt.status)}</td>
                          <td>
                            <div className="action-buttons">
                              {apt.status === 'pending' && (
                                <button
                                  className="btn-action btn-confirm"
                                  onClick={(e) => { e.stopPropagation(); handleStatusChange(apt.id, 'nurseConfirmed'); }}
                                  disabled={loading}
                                >
                                  <i className="fas fa-check"></i> Xác nhận
                                </button>
                              )}
                              {apt.status === 'nurseConfirmed' && (
                                <button
                                  className="btn-action btn-complete"
                                  onClick={(e) => { e.stopPropagation(); handleStatusChange(apt.id, 'completed'); }}
                                  disabled={loading}
                                >
                                  <i className="fas fa-check-double"></i> Hoàn thành
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              
              <div id="appointmentsCards" className="appointments-cards-view">
                {renderAppointmentCards()}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
      {/* Appointment Details Popup */}
      {showPopup && selectedAppointment && (
        <div className="appointment-popup active" id="appointmentPopup">
          <div className="appointment-popup-content">
            <button
              className="close-popup"
              aria-label="Đóng"
              onClick={() => setShowPopup(false)}
            >
              &times;
            </button>
            <h2>Chi tiết lịch hẹn</h2>
            <div id="appointmentDetails">
              <p><strong>Mã lịch hẹn:</strong> {selectedAppointment.id}</p>
              <p><strong>Mã bệnh nhân:</strong> {selectedAppointment.patient_id}</p>
              <p><strong>Tên bệnh nhân:</strong> {selectedAppointment.patientName}</p>
              <p><strong>Giờ hẹn:</strong> {formatTime(selectedAppointment.appointment_time)}</p>
              <p><strong>Ngày hẹn:</strong> {formatDate(selectedAppointment.appointment_date)}</p>
              <p><strong>Số điện thoại:</strong> {selectedAppointment.phone}</p>
              <p><strong>Lý do tái khám:</strong> {selectedAppointment.reason || "Không có"}</p>
              <p><strong>Trạng thái:</strong> {getStatusBadge(selectedAppointment.status)}</p>
            </div>
            <div className="popup-actions">
              {selectedAppointment.status === 'pending' && (
                <>
                  <button
                    className="btn btn-confirm"
                    onClick={() => handleStatusChange(selectedAppointment.id, 'nurseConfirmed')}
                    disabled={loading}
                  >
                    <i className="fas fa-check"></i> Xác nhận
                  </button>
                  <button
                    className="btn btn-cancel"
                    onClick={() => handleStatusChange(selectedAppointment.id, 'cancelled')}
                    disabled={loading}
                  >
                    <i className="fas fa-times"></i> Hủy
                  </button>
                </>
              )}
              {selectedAppointment.status === 'nurseConfirmed' && (
                <button
                  className="btn btn-complete"
                  onClick={() => handleStatusChange(selectedAppointment.id, 'completed')}
                  disabled={loading}
                >
                  <i className="fas fa-check-double"></i> Hoàn thành
                </button>
              )}
              <button
                className="btn btn-secondary close-btn"
                onClick={() => setShowPopup(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default AdminPage;
