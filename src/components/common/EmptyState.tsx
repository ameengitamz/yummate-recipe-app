import React from 'react';
import { Button } from '../ui/Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div className={`text-center py-12 px-6 ${className}`}>
      {icon && (
        <div className="text-6xl mb-6">
          {icon}
        </div>
      )}
      
      <h3 className="text-2xl font-bold mb-5 text-yum-primary-ec drop-shadow-lg yum-text-shadow-strong">
        {title}
      </h3>
      
      <p className="text-yum-text-primary text-lg mb-8 max-w-md mx-auto">
        {description}
      </p>
      
      {action && (
        <Button 
          variant="primary" 
          size="lg"
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};
