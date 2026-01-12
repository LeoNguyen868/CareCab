import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/css/home.css';

const IndexPage = () => {
    return (
        <>
            <Header />
            <main>
                <section className="hero">
                    <div className="hero-content">
                        <h1>Dịch Vụ Đặt Lịch Tái Khám</h1>
                        <p>Chăm sóc sức khỏe chuyên nghiệp, nhanh chóng thuận tiện</p>
                    </div>
                </section>

                <section className="features">
                    <h2>Tại sao chọn chúng tôi?</h2>
                    <div className="feature-grid">
                        <div className="feature-item">
                            <h3>Đội ngũ y tá chuyên nghiệp</h3>
                            <p>Được đào tạo bài bản và có nhiều năm kinh nghiệm</p>
                        </div>
                        <div className="feature-item">
                            <h3>Đặt lịch dễ dàng</h3>
                            <p>Chỉ vài thao tác đơn giản trên điện thoại hoặc máy tính</p>
                        </div>
                        <div className="feature-item">
                            <h3>Chăm sóc tận tâm</h3>
                            <p>Theo dõi sức khỏe và điều trị tại nhà theo chỉ định của bác sĩ</p>
                        </div>
                    </div>
                </section>

                <section className="cta">
                    <h2>Bắt đầu ngay hôm nay</h2>
                    <p>Đăng ký tài khoản để trải nghiệm dịch vụ chăm sóc sức khỏe tốt nhất</p>
                    <Link to="/register" className="btn btn-primary">Đăng ký ngay</Link>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default IndexPage;
