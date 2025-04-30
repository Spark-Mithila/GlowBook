import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { MessageCircle, CheckCircle } from 'lucide-react';

const WhatsAppIntegration = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [connected, setConnected] = useState(false);

  const handleConnect = (e) => {
    e.preventDefault();
    // In a real app, this would connect to WhatsApp Business API
    setConnected(true);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">WhatsApp Integration</h1>
      
      <Card>
        <div className="text-center py-6">
          <MessageCircle size={48} className="mx-auto text-green-500 mb-4" />
          <h3 className="text-lg font-medium mb-2">Connect Your WhatsApp</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Link your WhatsApp number to send automated appointment reminders and notifications to your customers.
          </p>
          
          {connected ? (
            <div className="bg-green-50 p-4 rounded-xl text-green-800 flex items-center justify-center">
              <CheckCircle size={20} className="mr-2" />
              <span>WhatsApp successfully connected!</span>
            </div>
          ) : (
            <form onSubmit={handleConnect} className="max-w-md mx-auto">
              <div className="mb-4">
                <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  id="whatsappNumber"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your WhatsApp number"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700"
                fullWidth
              >
                Connect WhatsApp
              </Button>
            </form>
          )}
        </div>
      </Card>
      
      <Card title="How It Works">
        <div className="space-y-4">
          <div className="flex">
            <div className="bg-green-100 p-2 rounded-full h-8 w-8 flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-green-800 font-medium">1</span>
            </div>
            <div>
              <h4 className="font-medium">Connect your WhatsApp number</h4>
              <p className="text-sm text-gray-500">Enter your business WhatsApp number above</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="bg-green-100 p-2 rounded-full h-8 w-8 flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-green-800 font-medium">2</span>
            </div>
            <div>
              <h4 className="font-medium">Verify your number</h4>
              <p className="text-sm text-gray-500">You'll receive a code on your WhatsApp to verify</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="bg-green-100 p-2 rounded-full h-8 w-8 flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-green-800 font-medium">3</span>
            </div>
            <div>
              <h4 className="font-medium">Start sending notifications</h4>
              <p className="text-sm text-gray-500">Automated reminders will be sent to your customers</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WhatsAppIntegration;