import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/css/register.css';
import '../assets/css/login.css';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        if (formData.password !== formData.confirmPassword) {
            setMessage({ text: 'Mật khẩu không khớp!', type: 'error' });
            return;
        }

        setIsLoading(true);

        try {
            // 1. Validate user data
            const validateResponse = await fetch('http://localhost:8000/users/validate', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    password_hash: formData.password,
                    email: formData.email,
                    phone_number: formData.phone,
                    role: 'user'
                })
            });

            if (!validateResponse.ok) {
                const validateData = await validateResponse.json();
                throw new Error(validateData.detail || 'Validation failed');
            }

            // 2. Create User
            const createUserResponse = await fetch('http://localhost:8000/users/', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    password_hash: formData.password,
                    email: formData.email,
                    phone_number: formData.phone,
                    role: 'user'
                })
            });

            const userData = await createUserResponse.json();

            if (!createUserResponse.ok) {
                throw new Error(userData.detail || 'Failed to create user');
            }

            // 3. Create Patient Record
            const createPatientResponse = await fetch('http://localhost:8000/patients/', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: userData.user_id,
                    monthly_subscription: false
                })
            });

            if (!createPatientResponse.ok) {
                throw new Error('Failed to create patient record');
            }

            // 4. Create Empty Profile
            const createProfileResponse = await fetch('http://localhost:8000/users/profile/', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    full_name: '',
                    date_of_birth: '2000-01-01', // Default date
                    gender: '',
                    bio: '',
                    address: '',
                    emergency_contact: '',
                    emergency_contact_relationship: '',
                    user_id: userData.user_id
                })
            });

            if (!createProfileResponse.ok) {
                throw new Error('Failed to create user profile');
            }

            setMessage({ text: 'Đăng ký thành công! Đang chuyển hướng...', type: 'success' });
            
            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            setMessage({ text: error.message || 'Có lỗi xảy ra. Vui lòng thử lại.', type: 'error' });
            console.error('Registration Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="auth-container">
                <form id="registerForm" className="auth-form" onSubmit={handleSubmit}>
                    <h2>Đăng ký tài khoản</h2>
                    
                    {message.text && (
                        <div className={`form-message ${message.type}`}>
                            {message.text}
                        </div>
                    )}
                    
                    <div className="form-group">
                        <label htmlFor="username">Tên đăng nhập</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            value={formData.username}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <div className="password-input-group" style={{ position: 'relative' }}>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                id="password" 
                                name="password" 
                                value={formData.password}
                                onChange={handleChange}
                                required 
                                style={{ width: '100%', paddingRight: '40px' }} // Make space for icon
                            />
                            <button 
                                type="button" 
                                className="password-toggle" 
                                aria-label="Toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#666'
                                }}
                            >
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                {/* Text fallback if fontawesome not loaded */}
                                <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}></span>
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                        <div className="password-input-group" style={{ position: 'relative' }}>
                            <input 
                                type={showConfirmPassword ? "text" : "password"} 
                                id="confirmPassword" 
                                name="confirmPassword" 
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required 
                                style={{ width: '100%', paddingRight: '40px' }}
                            />
                            <button 
                                type="button" 
                                className="password-toggle" 
                                aria-label="Toggle password visibility"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#666'
                                }}
                            >
                                <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}></span>
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            value={formData.phone}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                        {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
                    </button>

                    <div className="auth-link">
                        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default RegisterPage;