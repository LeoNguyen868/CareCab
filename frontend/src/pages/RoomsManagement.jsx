import React, { useState, useEffect } from 'react';
import { getAllRooms, createRoom, updateRoom, deleteRoom } from '../apis/apis';
import { generateEmptyRoom } from '../apis/ultis_api';
import RoomCard from '../components/RoomCard';
import '../assets/css/rooms.css';

const RoomsManagement = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [formData, setFormData] = useState(generateEmptyRoom());

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        setLoading(true);
        try {
            const data = await getAllRooms();
            setRooms(data);
        } catch (err) {
            setError(err.message || 'Có lỗi xảy ra khi tải danh sách phòng');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setCurrentRoom(null);
        setFormData(generateEmptyRoom());
        setShowModal(true);
    };

    const handleEdit = (room) => {
        setCurrentRoom(room);
        setFormData({ ...room });
        setShowModal(true);
    };

    const handleDelete = async (room) => {
        if (window.confirm(`Bạn có chắc muốn xóa phòng ${room.room_name}?`)) {
            try {
                await deleteRoom(room.room_id || room.id);  // Support both fields
                fetchRooms();
            } catch (err) {
                alert(err.message || 'Không thể xóa phòng');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentRoom) {
                await updateRoom(currentRoom.room_id || currentRoom.id, formData);
            } else {
                await createRoom(formData);
            }
            setShowModal(false);
            fetchRooms();
        } catch (err) {
            alert(err.message || 'Có lỗi xảy ra');
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="rooms-container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Quản lý Phòng khám</h2>
                <button className="btn btn-primary" onClick={handleCreate}>
                    <i className="fas fa-plus"></i> Thêm phòng mới
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status"></div>
                </div>
            ) : (
                <div className="row">
                    {rooms.map(room => (
                        <div key={room.id} className="col-md-4 col-sm-6">
                            <RoomCard 
                                room={room} 
                                onEdit={handleEdit} 
                                onDelete={handleDelete}
                            />
                        </div>
                    ))}
                    {rooms.length === 0 && (
                        <div className="col-12 text-center text-muted">
                            Chưa có phòng khám nào được tạo.
                        </div>
                    )}
                </div>
            )}

            {/* Simple Modal Implementation */}
            {showModal && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {currentRoom ? 'Cập nhật phòng' : 'Thêm phòng mới'}
                                </h5>
                                <button type="button" className="close" onClick={() => setShowModal(false)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Tên phòng <span className="text-danger">*</span></label>
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            name="room_name"
                                            value={formData.room_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Số phòng</label>
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            name="room_number"
                                            value={formData.room_number || ''}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Mô tả</label>
                                        <textarea 
                                            className="form-control"
                                            name="description"
                                            value={formData.description || ''}
                                            onChange={handleChange}
                                            rows="3"
                                        ></textarea>
                                    </div>
                                    <div className="form-group form-check">
                                        <input 
                                            type="checkbox" 
                                            className="form-check-input"
                                            name="is_available"
                                            id="isAvailableCheck"
                                            checked={formData.is_available}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="isAvailableCheck">
                                            Đang hoạt động (Available)
                                        </label>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
                                    <button type="submit" className="btn btn-primary">Lưu</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomsManagement;
