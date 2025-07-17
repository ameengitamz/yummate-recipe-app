import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="yum-gradient-bg h-[540px] flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold mb-5 text-yum-primary-ec">Welcome to YumMate!</h1>
        <p className="text-xl text-yum-secondary mb-10 max-w-lg font-normal">Your personal recipe discovery and meal planning companion</p>
      </div>
      
      {/* Quick Action Cards (wireframe style - only 2 cards as per wireframes.html) */}
      <div className="flex gap-10 p-12 justify-center flex-wrap">
        <div className="bg-yum-card w-80 h-64 rounded-3xl shadow-lg p-10 text-center flex flex-col justify-between border border-yum-primary/20 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-xl hover:bg-yum-card-hover yum-card-enhanced">
          <div>
            <h3 className="text-2xl text-yum-secondary-ec mb-4 font-semibold">🔍 Find Recipes</h3>
            <p className="text-yum-secondary text-base leading-relaxed">Discover new recipes from thousands of options</p>
          </div>
          <button 
            onClick={() => navigate('/recipes')}
            className="yum-button-primary text-white border-0 px-9 py-4 rounded-2xl font-semibold cursor-pointer transition-all duration-300 yum-shadow-accent text-base"
          >
            Get Started
          </button>
        </div>
        <div className="bg-yum-card w-80 h-64 rounded-3xl shadow-lg p-10 text-center flex flex-col justify-between border border-yum-primary/20 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-xl hover:bg-yum-card-hover yum-card-enhanced">
          <div>
            <h3 className="text-2xl text-yum-secondary-ec mb-4 font-semibold">📅 Plan Meals</h3>
            <p className="text-yum-secondary text-base leading-relaxed">Schedule your weekly meals and organize your cooking</p>
          </div>
          <button 
            onClick={() => navigate('/planner')}
            className="yum-button-primary text-white border-0 px-9 py-4 rounded-2xl font-semibold cursor-pointer transition-all duration-300 yum-shadow-accent text-base"
          >
            Start Planning
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

