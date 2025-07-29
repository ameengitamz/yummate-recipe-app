import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { path: '/', label: 'Home', ariaLabel: 'Go to home page' },
    { path: '/recipes', label: 'Recipes', ariaLabel: 'Browse recipes' },
    { path: '/planner', label: 'Planner', ariaLabel: 'Meal planner' },
    { path: '/grocery', label: 'Grocery', ariaLabel: 'Grocery list' },
  ];

  return (
    <header className="h-17 flex items-center justify-between px-8" role="banner">
      {/* Logo Section - Sleek & Minimal */}
      <Link 
        to="/" 
        className="flex items-center gap-3 group transition-all duration-300 hover:scale-105"
        aria-label="YumMate homepage"
      >
        <img 
          src="/yummate-logo.png" 
          alt="YumMate Logo" 
          className="w-8 h-8 drop-shadow-lg transition-all duration-300 group-hover:drop-shadow-xl" 
        />
        <span className="text-2xl font-bold text-yum-primary-ec hover:text-yum-primary transition-colors drop-shadow-lg yum-text-shadow-strong">
          YumMate
        </span>
      </Link>

      {/* Sleek Navigation Links */}
      <nav className="flex items-center gap-8" role="navigation" aria-label="Main navigation">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            aria-label={link.ariaLabel}
            className={`relative px-4 py-2 font-medium text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg ${
              isActive(link.path)
                ? 'text-white border-b-2 border-white pb-1 drop-shadow-md yum-text-shadow'
                : 'text-white/90 hover:text-white drop-shadow-md yum-text-shadow hover:scale-105'
            }`}
          >
            {link.label}
            
            {/* Subtle hover effect */}
            <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </Link>
        ))}
      </nav>
    </header>
  );
};
