import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../assets/css/header.css';

const Header = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { logout, user } = useAuth();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
    };

    const handleSettingsClick = (e) => {
        e.preventDefault();
        setIsMenuOpen(false);
        
        // Use logic from admin.js
        const message = 'Tính năng đang được phát triển!';
        const type = 'info';
        
        const messageContainer = document.getElementById('messageContainer');
        if (messageContainer) {
            const messageElement = document.createElement('div');
            messageElement.className = `message ${type}`;
            messageElement.textContent = message;
            
            // Xóa thông báo cũ nếu có
            messageContainer.innerHTML = '';
            
            // Thêm thông báo mới
            messageContainer.appendChild(messageElement);
            
            // Tự động xóa sau 3 giây (admin.js sets 500ms timeout to remove, but usually it should be longer. I'll use 3000ms for better UX)
            setTimeout(() => {
                messageElement.remove();
            }, 3000);
        } else {
            alert(message);
        }
    };

    return (
        <header className="header">
            <nav className="nav-container">
                <div className="logo">
                    <Link to={user ? "/home" : "/"} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', gap: '0.5rem' }}>
                        <img src="/assets/images/logo.png" alt="CareCab Logo" />
                        <h1>CareCab</h1>
                    </Link>
                </div>

                <button 
                    className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`} 
                    onClick={toggleMenu}
                    aria-label="Menu"
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer', zIndex: 101 }}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div 
                    className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                ></div>

                <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    {!['/home', '/admin','/appointments','/profile' ,'/booking'].includes(location.pathname) && (
                        <Link to="/home" className="nav-link btn btn-login" onClick={() => setIsMenuOpen(false)}>Trang chủ</Link>
                    )}
                    
                    {user ? (
                        <>
                            {user.role === 'admin' && (
                                <>
                                <Link to="/admin" className="nav-link" onClick={() => setIsMenuOpen(false)}>Quản trị</Link>
                                <Link to="/settings" className="nav-link" onClick={handleSettingsClick}>Cài đặt</Link>
                                </>
                            )}
                            
                            {user.role === 'user' && (
                                <>
                                <Link to="/home/appointments" className="nav-link" onClick={() => setIsMenuOpen(false)}>Lịch hẹn</Link>
                                <Link to="/home/profile" className="nav-link" onClick={() => setIsMenuOpen(false)}>Hồ sơ</Link>
                                </>
                            )}
                            
                            <button 
                                onClick={handleLogout} 
                                className="btn btn-login"
                                style={{ cursor: 'pointer', background: 'transparent', border: '1px solid currentColor' }}
                            >
                                Đăng xuất
                            </button>
                        </>
                    ) : (
                        <div className="auth-buttons">
                            {!['/login', '/register'].includes(location.pathname) && (
                                <>
                                    <Link to="/login" className="btn btn-login" onClick={() => setIsMenuOpen(false)}>Đăng nhập</Link>
                                    <Link to="/register" className="btn btn-register" onClick={() => setIsMenuOpen(false)}>Đăng ký</Link>
                                </>
                            )}
                        </div>
                    )
                    }
                </div>
            </nav>
        </header>
    );
};

export default Header;