import React from 'react';
import Card from '../../components/common/Card';
import { Users, DollarSign, ActivitySquare } from 'lucide-react';

const SuperAdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Superadmin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-blue-50">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-500 text-white mr-4">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold">0</h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-green-50">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-500 text-white mr-4">
              <ActivitySquare size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Subscriptions</p>
              <h3 className="text-2xl font-bold">0</h3>
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
              <h3 className="text-2xl font-bold">₹0</h3>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Visualizations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="User Growth">
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-500">User growth chart will appear here</p>
          </div>
        </Card>
        
        <Card title="Plan Distribution">
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-500">Plan distribution chart will appear here</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;