import React from 'react';

const Card = ({ 
  children, 
  title, 
  subtitle,
  className = '',
  titleClassName = '',
  bodyClassName = '' 
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-md overflow-hidden ${className}`}>
      {(title || subtitle) && (
        <div className={`p-4 border-b ${titleClassName}`}>
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      <div className={`p-4 ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default Card;