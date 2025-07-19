import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="h-17 flex items-center justify-between px-7 shadow-sm border-b border-yum-primary/10 bg-transparent">
      <Link to="/" className="text-2xl font-bold flex items-center gap-2 text-yum-primary-ec hover:text-yum-primary transition-colors drop-shadow-lg yum-text-shadow-strong">
        <img src="/yummate-logo.png" alt="YumMate Logo" className="w-8 h-8 drop-shadow-lg" />
        YumMate
      </Link>
      <nav className="flex gap-7">
        <Link 
          to="/" 
          className={`no-underline font-medium transition-colors drop-shadow-md yum-text-shadow ${
            isActive('/') 
              ? 'text-white border-b-2 border-white pb-1' 
              : 'text-white/90 hover:text-white'
          }`}
        >
          Home
        </Link>
        <Link 
          to="/recipes" 
          className={`no-underline font-medium transition-colors drop-shadow-md yum-text-shadow ${
            isActive('/recipes') 
              ? 'text-white border-b-2 border-white pb-1' 
              : 'text-white/90 hover:text-white'
          }`}
        >
          Recipes
        </Link>
        <Link 
          to="/planner" 
          className={`no-underline font-medium transition-colors drop-shadow-md yum-text-shadow ${
            isActive('/planner') 
              ? 'text-white border-b-2 border-white pb-1' 
              : 'text-white/90 hover:text-white'
          }`}
        >
          Planner
        </Link>
        <Link 
          to="/grocery" 
          className={`no-underline font-medium transition-colors drop-shadow-md yum-text-shadow ${
            isActive('/grocery') 
              ? 'text-white border-b-2 border-white pb-1' 
              : 'text-white/90 hover:text-white'
          }`}
        >
          Grocery
        </Link>
      </nav>
    </div>
  );
};
