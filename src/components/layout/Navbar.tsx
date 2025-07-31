import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { path: "/", label: "Home", ariaLabel: "Go to home page" },
  { path: "/recipes", label: "Recipes", ariaLabel: "Browse recipes" },
  { path: "/planner", label: "Planner", ariaLabel: "Meal planner" },
  { path: "/grocery", label: "Grocery", ariaLabel: "Grocery list" },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const isActive = useCallback((path: string) => location.pathname === path, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Don't close if clicking on the mobile menu button or its children
      const mobileButton = document.querySelector('[aria-label="Toggle mobile menu"]');
      if (mobileButton && mobileButton.contains(target)) {
        return;
      }
      
      // Close if clicking outside the mobile menu
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Main Navbar */}
      <header
        className="sticky top-0 z-50"
        role="banner"
      >
        <div className="max-w-9xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <Link
              to="/"
              className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105"
              aria-label="YumMate homepage"
            >
              <img
                src="/yummate-logo.png"
                alt="YumMate Logo"
                className="w-8 h-8 transition-transform duration-300 group-hover:rotate-12"
              />
              <span className="text-xl font-bold text-yum-primary transition-colors duration-300 group-hover:text-yum-secondary">
                YumMate
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center space-x-6"
              role="navigation"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-label={link.ariaLabel}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 rounded-lg ${isActive(link.path)
                      ? "text-yum-primary bg-yum-primary/10 shadow-sm"
                      : "text-black font-medium hover:text-yum-primary hover:bg-gray-50"
                    }`}
                >
                  {link.label}
                  {/* Active indicator */}
                  {isActive(link.path) && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yum-primary rounded-full"></div>
                  )}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:text-yum-primary hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yum-primary transition-all duration-300 transform hover:scale-110"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-6 h-6 relative flex flex-col justify-center items-center">
                <span
                  className={`block w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen
                      ? "rotate-45 translate-y-0.5"
                      : "-translate-y-1"
                    }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : "my-1"
                    }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen
                      ? "-rotate-45 -translate-y-0.5"
                      : "translate-y-1"
                    }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
              ? "max-h-80 opacity-100 visible"
              : "max-h-0 opacity-0 invisible overflow-hidden"
            }`}
        >
          <div className="bg-white/20 backdrop-blur-xl border-t border-gray-200/30 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {NAV_LINKS.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-label={link.ariaLabel}
                  className={`block px-3 py-3 rounded-md text-base font-medium transition-all duration-300 transform hover:scale-105 hover:translate-x-2 ${isActive(link.path)
                      ? "bg-yum-primary text-white shadow-md"
                      : "text-black hover:text-yum-primary hover:bg-white/30"
                    } ${isMobileMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-4 opacity-0"
                    }`}
                  style={{
                    transitionDelay: isMobileMenuOpen
                      ? `${index * 100}ms`
                      : "0ms",
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
