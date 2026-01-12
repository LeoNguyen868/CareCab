import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Appointments from './pages/Appointments';
import Profile from './pages/Profile';
import BookPage from './pages/BookPage';
import EditProfilePage from './pages/EditProfilePage';
import AdminPage from './pages/AdminPage';
import IndexPage from './pages/indexPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Redirect root to welcome */}
          <Route path="/" element={<Navigate to="/welcome" replace />} />
          
          {/* Public routes */}
          <Route path="/welcome" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected routes with MainLayout */}
          <Route path="/home" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route index element={<HomePage />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="profile" element={<Profile />} />
            <Route path="book" element={<BookPage />} />
            <Route path="edit-profile" element={<EditProfilePage />} />
          </Route>

          {/* Admin route */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;