import React from 'react';
import Card from '../../components/common/Card';
import { BarChart3, LineChart, PieChart } from 'lucide-react';

const SuperAdminAnalytics = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Platform Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Monthly Revenue">
          <div className="h-64 flex items-center justify-center">
            <LineChart size={48} className="text-gray-300" />
            <p className="ml-4 text-gray-500">Revenue data will appear here</p>
          </div>
        </Card>
        
        <Card title="New Users">
          <div className="h-64 flex items-center justify-center">
            <BarChart3 size={48} className="text-gray-300" />
            <p className="ml-4 text-gray-500">User data will appear here</p>
          </div>
        </Card>
        
        <Card title="Plan Distribution">
          <div className="h-64 flex items-center justify-center">
            <PieChart size={48} className="text-gray-300" />
            <p className="ml-4 text-gray-500">Plan data will appear here</p>
          </div>
        </Card>
        
        <Card title="Platform Usage">
          <div className="h-64 flex items-center justify-center">
            <BarChart3 size={48} className="text-gray-300" />
            <p className="ml-4 text-gray-500">Usage data will appear here</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminAnalytics;