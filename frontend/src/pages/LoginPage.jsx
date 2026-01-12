import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../assets/css/login.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    setLoading(true);

    try {
      const result = await login(formData.username, formData.password);
      
      if (result.success) {
        setMessage({ text: 'Đăng nhập thành công!', type: 'success' });
        // Note: navigate happens after 1 second in AuthContext
      } else {
        setMessage({ text: result.message, type: 'error' });
        setLoading(false);
      }
    } catch {
      setMessage({ text: 'Có lỗi xảy ra. Vui lòng thử lại sau.', type: 'error' });
      setLoading(false);
    }
  };

  return (
    <>
      <title>Đăng nhập - CareCab</title>
      <Header />

      <main className="auth-container">
        <div className="auth-form">
          <h2>Đăng nhập</h2>
          {message.text && (
            <div className={`form-message ${message.type}`}>
              {message.text}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ padding: '20px 20px 0 0px' }}>
              <input
                required
                type="text"
                className="input"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <label htmlFor="username" className="label">
                <span className="char" style={{ '--index': 0, paddingLeft: '5px' }}>T</span>
                <span className="char" style={{ '--index': 1 }}>ê</span>
                <span className="char" style={{ '--index': 2 }}>n</span>
                <span className="char" style={{ '--index': 3 }}>&nbsp;</span>
                <span className="char" style={{ '--index': 4 }}>đ</span>
                <span className="char" style={{ '--index': 5 }}>ă</span>
                <span className="char" style={{ '--index': 6 }}>n</span>
                <span className="char" style={{ '--index': 7 }}>g</span>
                <span className="char" style={{ '--index': 7 }}>&nbsp;</span>
                <span className="char" style={{ '--index': 8 }}>n</span>
                <span className="char" style={{ '--index': 9 }}>h</span>
                <span className="char" style={{ '--index': 10 }}>ậ</span>
                <span className="char" style={{ '--index': 11 }}>p</span>
              </label>
            </div>

            <div className="form-group" style={{ padding: '20px 20px 0 0px', position: 'relative' }}>
              <input
                required
                type={showPassword ? "text" : "password"}
                className="input"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={{ paddingRight: '40px' }}
              />
              <label htmlFor="password" className="label">
                <span className="char" style={{ '--index': 0, paddingLeft: '5px' }}>M</span>
                <span className="char" style={{ '--index': 1 }}>ậ</span>
                <span className="char" style={{ '--index': 2 }}>t</span>
                <span className="char" style={{ '--index': 3 }}>&nbsp;</span>
                <span className="char" style={{ '--index': 4 }}>k</span>
                <span className="char" style={{ '--index': 5 }}>h</span>
                <span className="char" style={{ '--index': 6 }}>ẩ</span>
                <span className="char" style={{ '--index': 7 }}>u</span>
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '25px', // Aligned within form-group
                  top: '25px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#666',
                  zIndex: 10
                }}
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

          <p className="auth-footer" style={{ textAlign: 'center', marginTop: '1rem' }}>
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default LoginPage;