import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Calendar, Plus } from 'lucide-react';

const Appointments = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <Button className="flex items-center">
          <Plus size={18} className="mr-1" />
          New Appointment
        </Button>
      </div>
      
      <Card>
        <div className="text-center py-8">
          <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">No appointments yet</h3>
          <p className="text-gray-500 mb-4">
            Start by creating your first appointment
          </p>
          <Button>
            <Plus size={18} className="mr-1" />
            Create Appointment
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Appointments;