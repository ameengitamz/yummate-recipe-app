import React from 'react';

export interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  hover = false,
  padding = 'md',
  children,
  className = '',
  onClick,
  ...props
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-yum-card border border-yum-primary/10',
    elevated: 'bg-yum-card shadow-lg border border-yum-primary/10',
    outlined: 'bg-yum-card border-2 border-yum-primary/20',
    gradient: 'bg-gradient-to-br from-yum-card to-yum-primary-light/20 border border-yum-primary/10'
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };
  
  const hoverClasses = hover 
    ? 'hover:-translate-y-1 hover:shadow-xl hover:border-yum-primary/30 cursor-pointer' 
    : '';
  
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  
  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};
