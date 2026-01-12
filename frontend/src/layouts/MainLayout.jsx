import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <>
            <Header />
            {/* Outlet là nơi các trang con (HomePage, Profile...) sẽ hiển thị */}
            <main className="main-content" style={{ paddingTop: '4rem' }}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;