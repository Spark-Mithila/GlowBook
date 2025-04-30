// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PlanProvider } from './contexts/PlanContext';
import { BookingProvider } from './contexts/BookingContext';
import { CustomerProvider } from './contexts/CustomerContext';
import DashboardLayout from './layouts/DashboardLayout';
import SuperAdminLayout from './layouts/SuperAdminLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PricingPlans from './pages/auth/PricingPlans';
import Dashboard from './pages/dashboard/Dashboard';
import Appointments from './pages/dashboard/Appointments';
import Customers from './pages/dashboard/Customers';
import BusinessProfile from './pages/dashboard/BusinessProfile';
import WhatsAppIntegration from './pages/dashboard/WhatsAppIntegration';
import Analytics from './pages/dashboard/Analytics';
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';
import UserManagement from './pages/superadmin/UserManagement';
import SuperAdminAnalytics from './pages/superadmin/SuperAdminAnalytics';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <PlanProvider>
          <BookingProvider>
            <CustomerProvider>
              <Routes>
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/pricing" element={<PricingPlans />} />
                
                {/* Dashboard Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Dashboard />} />
                  <Route path="appointments" element={<Appointments />} />
                  <Route path="customers" element={<Customers />} />
                  <Route path="profile" element={<BusinessProfile />} />
                  <Route path="whatsapp" element={<WhatsAppIntegration />} />
                  <Route path="analytics" element={<Analytics />} />
                </Route>
                
                {/* Superadmin Routes */}
                <Route path="/admin" element={
                  <ProtectedRoute requiredRole="admin">
                    <SuperAdminLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<SuperAdminDashboard />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="analytics" element={<SuperAdminAnalytics />} />
                </Route>
                
                {/* Redirect to login by default */}
                <Route path="*" element={<Login />} />
              </Routes>
            </CustomerProvider>
          </BookingProvider>
        </PlanProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;