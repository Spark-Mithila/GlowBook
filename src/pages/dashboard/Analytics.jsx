import React from 'react';
import Card from '../../components/common/Card';
import { BarChart3, LineChart, PieChart } from 'lucide-react';
import { usePlan } from '../../contexts/PlanContext';

const Analytics = () => {
  const { currentPlan } = usePlan();
  const isRestrictedFeature = !currentPlan || !['standard', 'premium'].includes(currentPlan);
  
  if (isRestrictedFeature) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <BarChart3 size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-bold mb-2">Premium Feature</h2>
          <p className="text-gray-500 mb-4 max-w-md">
            Analytics is available on Standard and Premium plans.
            Upgrade your plan to access this feature.
          </p>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            // onClick={() => navigate('/pricing')}
          >
            Upgrade Plan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Bookings Over Time">
          <div className="h-64 flex items-center justify-center">
            <LineChart size={48} className="text-gray-300" />
            <p className="ml-4 text-gray-500">Booking data will appear here</p>
          </div>
        </Card>
        
        <Card title="Revenue Trend">
          <div className="h-64 flex items-center justify-center">
            <BarChart3 size={48} className="text-gray-300" />
            <p className="ml-4 text-gray-500">Revenue data will appear here</p>
          </div>
        </Card>
        
        <Card title="Popular Services">
          <div className="h-64 flex items-center justify-center">
            <PieChart size={48} className="text-gray-300" />
            <p className="ml-4 text-gray-500">Service data will appear here</p>
          </div>
        </Card>
        
        <Card title="Peak Hours">
          <div className="h-64 flex items-center justify-center">
            <BarChart3 size={48} className="text-gray-300" />
            <p className="ml-4 text-gray-500">Hour data will appear here</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;