import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Users, 
  Settings, 
  BarChart, 
  MessageCircle, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePlan } from '../contexts/PlanContext';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { currentPlan, plans } = usePlan();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <Home size={20} /> },
    { path: '/dashboard/appointments', name: 'Appointments', icon: <Calendar size={20} /> },
    { path: '/dashboard/customers', name: 'Customers', icon: <Users size={20} />, 
      planRequired: ['standard', 'premium'] },
    { path: '/dashboard/profile', name: 'Business Profile', icon: <Settings size={20} /> },
    { path: '/dashboard/whatsapp', name: 'WhatsApp', icon: <MessageCircle size={20} /> },
    { path: '/dashboard/analytics', name: 'Analytics', icon: <BarChart size={20} />,
      planRequired: ['standard', 'premium'] }
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="fixed z-20 top-4 left-4 md:hidden">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-white shadow-md"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-10 w-64 transform transition-transform duration-300 ease-in-out bg-white shadow-lg md:translate-x-0 
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold">Parlour System</h2>
          <div className="mt-2 text-sm text-gray-500">
            {currentPlan && plans[currentPlan] && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                {plans[currentPlan].name} Plan
              </span>
            )}
          </div>
        </div>

        <nav className="mt-6">
          <ul>
            {menuItems.map((item) => {
              // Check if the menu item is restricted by plan
              const hasAccess = !item.planRequired || 
                (currentPlan && item.planRequired.includes(currentPlan));
              
              return (
                <li key={item.path}>
                  <Link
                    to={hasAccess ? item.path : '/pricing'}
                    className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                      location.pathname === item.path ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
                    } ${!hasAccess ? 'opacity-50' : ''}`}
                    onClick={closeSidebar}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                    {!hasAccess && (
                      <span className="ml-2 text-xs px-1.5 py-0.5 bg-gray-200 rounded">
                        Upgrade
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-6">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto md:ml-64">
        <header className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">
              {menuItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
            </h1>
            <div className="flex items-center">
              <span className="mr-4 text-sm">
                {currentUser?.email}
              </span>
            </div>
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;