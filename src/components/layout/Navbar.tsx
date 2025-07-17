import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="yum-gradient-bg h-17 flex items-center justify-between px-7 text-yum-primary-ec shadow-sm border-b border-yum-primary/10">
      <Link to="/" className="text-2xl font-bold flex items-center gap-2 text-yum-primary-ec hover:text-yum-primary transition-colors">
        <img src="/yummate-logo.png" alt="YumMate Logo" className="w-8 h-8" />
        YumMate
      </Link>
      <nav className="flex gap-7">
        <Link 
          to="/" 
          className={`no-underline font-medium transition-colors ${
            isActive('/') 
              ? 'text-yum-primary border-b-2 border-yum-primary pb-1' 
              : 'text-yum-primary-ec hover:text-yum-primary'
          }`}
        >
          Home
        </Link>
        <Link 
          to="/recipes" 
          className={`no-underline font-medium transition-colors ${
            isActive('/recipes') 
              ? 'text-yum-primary border-b-2 border-yum-primary pb-1' 
              : 'text-yum-primary-ec hover:text-yum-primary'
          }`}
        >
          Recipes
        </Link>
        <Link 
          to="/planner" 
          className={`no-underline font-medium transition-colors ${
            isActive('/planner') 
              ? 'text-yum-primary border-b-2 border-yum-primary pb-1' 
              : 'text-yum-primary-ec hover:text-yum-primary'
          }`}
        >
          Planner
        </Link>
        <Link 
          to="/grocery" 
          className={`no-underline font-medium transition-colors ${
            isActive('/grocery') 
              ? 'text-yum-primary border-b-2 border-yum-primary pb-1' 
              : 'text-yum-primary-ec hover:text-yum-primary'
          }`}
        >
          Grocery
        </Link>
      </nav>
    </div>
  );
};
