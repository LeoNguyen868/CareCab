import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    date_of_birth: '',
    gender: '',
    bio: '',
    address: '',
    emergency_contact: '',
    emergency_contact_relationship: ''
  });

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        navigate('/login');
        return;
      }

      const response = await fetch(`http://localhost:8000/users/profile/${userData.user_id}`, {
        headers: { 'accept': 'application/json' }
      });

      const data = await response.json();

      // Format date for input
      let formattedDate = '';
      if (data.date_of_birth) {
        const date = new Date(data.date_of_birth);
        if (!isNaN(date.getTime())) {
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          formattedDate = `${year}-${month}-${day}`;
        }
      }

      setFormData({
        full_name: data.full_name || '',
        date_of_birth: formattedDate,
        gender: data.gender || '',
        bio: data.bio || '',
        address: data.address || '',
        emergency_contact: data.emergency_contact || '',
        emergency_contact_relationship: data.emergency_contact_relationship || ''
      });

      // Update localStorage
      localStorage.setItem('userProfile', JSON.stringify(data));
    } catch (error) {
      console.error('Error loading profile:', error);
      alert('Không thể tải thông tin hồ sơ. Vui lòng thử lại sau.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const userId = userData.user_id;

      // Prepare data for API
      const submitData = { ...formData };
      
      // Format date as DD/MM/YYYY for the API
      if (submitData.date_of_birth) {
        const date = new Date(submitData.date_of_birth);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        submitData.date_of_birth = `${day}/${month}/${year}`;
      }

      const response = await fetch(`http://localhost:8000/users/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      if (response.ok) {
        const updatedData = await response.json();
        localStorage.setItem('userProfile', JSON.stringify(updatedData));
        alert('Cập nhật hồ sơ thành công!');
        navigate('/profile');
      } else {
        const error = await response.json();
        alert(error.message || 'Không thể cập nhật hồ sơ. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <title>Chỉnh sửa hồ sơ - CareCab</title>
    <main className="profile-container main-content">
      <h2>Chỉnh sửa thông tin</h2>
      <div className="profile-content">
        <form id="editProfileForm" className="edit-profile-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Họ và tên:</label>
              <input
                type="text"
                id="fullName"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthDate">Ngày sinh:</label>
              <input
                type="date"
                id="birthDate"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="gender">Giới tính:</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Chọn giới tính</option>
                <option value="M">Nam</option>
                <option value="F">Nữ</option>
                <option value="O">Khác</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="address">Địa chỉ:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="bio">Tiểu sử:</label>
            <textarea
              id="bio"
              name="bio"
              rows="3"
              value={formData.bio}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="emergencyContact">Liên hệ khẩn cấp:</label>
              <input
                type="text"
                id="emergencyContact"
                name="emergency_contact"
                value={formData.emergency_contact}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="emergencyRelation">Quan hệ:</label>
              <input
                type="text"
                id="emergencyRelation"
                name="emergency_contact_relationship"
                value={formData.emergency_contact_relationship}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/profile')}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </main>
    </>
  );
};

export default EditProfilePage;
