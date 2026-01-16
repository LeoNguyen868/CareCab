import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    address: '',
    date_of_birth: '',
    gender: '',
    bio: '',
    emergency_contact: '',
    emergency_contact_relationship: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        navigate('/login');
        return;
      }

      // Try cached profile first
      const cachedProfile = localStorage.getItem('userProfile');
      if (cachedProfile) {
        const profileData = JSON.parse(cachedProfile);
        setUserInfo({
          ...profileData,
          email: userData.email,
          phone_number: userData.phone_number
        });
        setLoading(false);
      }

      // Fetch from API
      const response = await fetch(`http://localhost:8000/users/profile/${userData.user_id}`, {
        headers: { 'accept': 'application/json' }
      });
      const data = await response.json();

      if (data) {
        localStorage.setItem('userProfile', JSON.stringify(data));
        setUserInfo({
          ...data,
          email: userData.email,
          phone_number: userData.phone_number
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Chưa cập nhật';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Chưa cập nhật';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatGender = (gender) => {
    if (!gender) return 'Chưa cập nhật';
    if (gender === 'male' || gender === 'M') return 'Nam';
    if (gender === 'female' || gender === 'F') return 'Nữ';
    return 'Khác';
  };

  const handleEditProfile = () => {
    navigate('/home/edit-profile');
  };

  return (
    <main className="profile-container main-content">
      <h2>Hồ sơ của tôi</h2>
      <div className="profile-content">
        <div className="profile-section">
            <h3>Thông tin cá nhân</h3>
            
            {loading ? (
                 <div className="loading" style={{textAlign: 'center', padding: '2rem'}}>Đang tải thông tin...</div>
            ) : (
                <>
                    <div className="profile-info">
                        <div className="info-group">
                            <label>Họ và tên:</label>
                            <p id="fullName">{userInfo.full_name || 'Chưa cập nhật'}</p>
                        </div>
                        <div className="info-group">
                            <label>Email:</label>
                            <p id="email">{userInfo.email || 'Chưa cập nhật'}</p>
                        </div>
                        <div className="info-group">
                            <label>Số điện thoại:</label>
                            <p id="phone">{userInfo.phone_number || 'Chưa cập nhật'}</p>
                        </div>
                        <div className="info-group">
                            <label>Ngày sinh:</label>
                            <p id="birthDate">{formatDate(userInfo.date_of_birth)}</p>
                        </div>
                        <div className="info-group">
                            <label>Giới tính:</label>
                            <p id="gender">{formatGender(userInfo.gender)}</p>
                        </div>
                        <div className="info-group">
                            <label>Tiểu sử:</label>
                            <p id="bio">{userInfo.bio || 'Chưa cập nhật'}</p>
                        </div>
                        <div className="info-group">
                            <label>Địa chỉ:</label>
                            <p id="address">{userInfo.address || 'Chưa cập nhật'}</p>
                        </div>
                        <div className="info-group">
                            <label>Liên hệ khẩn cấp:</label>
                            <p id="emergencyContact">{userInfo.emergency_contact || 'Chưa cập nhật'}</p>
                        </div>
                        <div className="info-group">
                            <label>Quan hệ:</label>
                            <p id="emergencyRelation">{userInfo.emergency_contact_relationship || 'Chưa cập nhật'}</p>
                        </div>
                    </div>
                    <button id="editProfileBtn" className="btn btn-primary" onClick={handleEditProfile}>Chỉnh sửa thông tin</button>
                </>
            )}
        </div>
      </div>
    </main>
  );
};

export default Profile;