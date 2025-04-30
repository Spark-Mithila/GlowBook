import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Users, Plus } from 'lucide-react';

const Customers = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customers</h1>
        <Button className="flex items-center">
          <Plus size={18} className="mr-1" />
          Add Customer
        </Button>
      </div>
      
      <Card>
        <div className="text-center py-8">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">No customers yet</h3>
          <p className="text-gray-500 mb-4">
            Add your first customer to get started
          </p>
          <Button>
            <Plus size={18} className="mr-1" />
            Add Customer
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Customers;