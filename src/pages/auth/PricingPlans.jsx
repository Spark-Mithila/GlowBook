import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { usePlan } from '../../contexts/PlanContext';
import { useAuth } from '../../contexts/AuthContext';

const PricingPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const { plans, updatePlan, currentPlan } = usePlan();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSelectPlan = async (planType) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    try {
      setLoading(true);
      await updatePlan(planType);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating plan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Choose the right plan for your parlour
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Select a plan that best suits your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(plans).map(([planType, plan]) => (
            <Card
              key={planType}
              className={`border-2 transition-all ${
                selectedPlan === planType || currentPlan === planType
                  ? 'border-blue-500 transform scale-105 shadow-lg'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setSelectedPlan(planType)}
            >
              <div className="p-2">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <div className="mt-4">
                    <span className="text-5xl font-extrabold">₹{plan.price}</span>
                    <span className="text-gray-500 ml-2">/month</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  variant={currentPlan === planType ? "secondary" : "primary"}
                  fullWidth
                  disabled={loading}
                  onClick={() => handleSelectPlan(planType)}
                >
                  {currentPlan === planType ? 'Current Plan' : 'Select Plan'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;