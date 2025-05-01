import React, { useState, useEffect } from 'react';
import { Calendar, Users, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useBookings } from '../../contexts/BookingContext';
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../services/firebase';

const Dashboard = () => {
  const { bookings } = useBookings();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalCustomers: 0,
    totalRevenue: 0
  });
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      if (!currentUser) return;

      try {
        // Get upcoming bookings (next 5)
        const today = new Date();
        const bookingsRef = collection(db, "bookings");
        const upcomingQuery = query(
          bookingsRef,
          where("ownerId", "==", currentUser.uid),
          where("appointmentTime", ">=", today),
          orderBy("appointmentTime"),
          limit(5)
        );
        
        const upcomingSnapshot = await getDocs(upcomingQuery);
        const upcomingData = [];
        
        upcomingSnapshot.forEach(doc => {
          upcomingData.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        setUpcomingBookings(upcomingData);
        
        // Calculate stats
        setStats({
          totalBookings: bookings.length,
          totalCustomers: new Set(bookings.map(b => b.customerId)).size,
          totalRevenue: bookings.reduce((sum, booking) => sum + (booking.amount || 0), 0)
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchStats();
  }, [currentUser, bookings]);

  // Format date and time
  const formatDateTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    
    const date = timestamp instanceof Date 
      ? timestamp 
      : timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-blue-50">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-500 text-white mr-4">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Bookings</p>
              <h3 className="text-2xl font-bold">{stats.totalBookings}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-green-50">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-500 text-white mr-4">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Customers</p>
              <h3 className="text-2xl font-bold">{stats.totalCustomers}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-purple-50">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-500 text-white mr-4">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold">₹{stats.totalRevenue}</h3>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Upcoming Bookings */}
      <Card title="Upcoming Appointments">
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : upcomingBookings.length > 0 ? (
          <div className="divide-y">
            {upcomingBookings.map(booking => (
              <div key={booking.id} className="py-3">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">{booking.customerName || 'Unknown Customer'}</h4>
                    <p className="text-sm text-gray-500">{booking.service || 'No service specified'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatDateTime(booking.appointmentTime)}</p>
                    {booking.amount && (
                      <p className="text-sm text-gray-500">₹{booking.amount}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No upcoming appointments</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => navigate('/dashboard/appointments')}
            >
              Create Appointment
            </Button>
          </div>
        )}
      </Card>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Quick Actions" className="md:col-span-2">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Button 
              variant="outline"
              className="flex flex-col items-center justify-center h-24"
              onClick={() => navigate('/dashboard/appointments')}
            >
              <Calendar className="mb-2" size={24} />
              <span>New Appointment</span>
            </Button>
            
            <Button 
              variant="outline"
              className="flex flex-col items-center justify-center h-24"
              onClick={() => navigate('/dashboard/customers')}
            >
              <Users className="mb-2" size={24} />
              <span>New Customer</span>
            </Button>
            
            <Button 
              variant="outline"
              className="flex flex-col items-center justify-center h-24"
              onClick={() => navigate('/dashboard/profile')}
            >
              <DollarSign className="mb-2" size={24} />
              <span>Business Profile</span>
            </Button>
          </div>
        </Card>
        
        <Card title="Getting Started">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-medium">
                1
              </div>
              <p className="text-sm">Set up your business profile</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-medium">
                2
              </div>
              <p className="text-sm">Add your services and prices</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-medium">
                3
              </div>
              <p className="text-sm">Create your first appointment</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-medium">
                4
              </div>
              <p className="text-sm">Connect your WhatsApp number</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;