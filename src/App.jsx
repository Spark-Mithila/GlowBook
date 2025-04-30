import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PlanProvider } from './contexts/PlanContext';
import { BookingProvider } from './contexts/BookingContext';
import { useAuth } from './contexts/AuthContext';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PricingPlans from './pages/auth/PricingPlans';

// Dashboard Pages
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Appointments from './pages/dashboard/Appointments';
import Customers from './pages/dashboard/Customers';
import BusinessProfile from './pages/dashboard/BusinessProfile';
import WhatsAppIntegration from './pages/dashboard/WhatsAppIntegration';
import Analytics from './pages/dashboard/Analytics';

// Superadmin Pages
import SuperAdminLayout from './layouts/SuperAdminLayout';
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';
import UserManagement from './pages/superadmin/UserManagement';
import SuperAdminAnalytics from './pages/superadmin/SuperAdminAnalytics';

// Protected route components
const OwnerRoute = ({ children }) => {
  const { currentUser, userRole } = useAuth();
  return currentUser && userRole === 'owner' ? children : <Navigate to="/login" />;
};

const SuperAdminRoute = ({ children }) => {
  const { currentUser, userRole } = useAuth();
  return currentUser && userRole === 'superadmin' ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PlanProvider>
          <BookingProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/pricing" element={<PricingPlans />} />
              
              {/* Owner Routes */}
              <Route path="/dashboard" element={
                <OwnerRoute>
                  <DashboardLayout />
                </OwnerRoute>
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
                <SuperAdminRoute>
                  <SuperAdminLayout />
                </SuperAdminRoute>
              }>
                <Route index element={<SuperAdminDashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="analytics" element={<SuperAdminAnalytics />} />
              </Route>
              
              {/* Default Route */}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </BookingProvider>
        </PlanProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;