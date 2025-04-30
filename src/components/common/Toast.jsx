import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const toastIcons = {
  success: <CheckCircle className="text-green-500" size={20} />,
  error: <AlertCircle className="text-red-500" size={20} />,
  info: <Info className="text-blue-500" size={20} />
};

const Toast = ({ 
  message, 
  type = 'success', 
  duration = 5000,
  onClose 
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) setTimeout(onClose, 300); // Give time for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) setTimeout(onClose, 300);
  };

  const baseClasses = "fixed bottom-4 right-4 flex items-center p-4 rounded-xl shadow-lg z-50 transition-all duration-300";
  const typeClasses = {
    success: "bg-green-50 border border-green-200",
    error: "bg-red-50 border border-red-200",
    info: "bg-blue-50 border border-blue-200"
  };

  const animationClass = visible 
    ? "translate-y-0 opacity-100" 
    : "translate-y-2 opacity-0";

  return (
    <div className={`${baseClasses} ${typeClasses[type]} ${animationClass}`}>
      <div className="mr-3">
        {toastIcons[type]}
      </div>
      <div className="flex-1">
        {message}
      </div>
      <button 
        onClick={handleClose}
        className="ml-3 text-gray-400 hover:text-gray-600"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;