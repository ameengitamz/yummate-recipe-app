import React, { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePopularSuggestions, useRecipeStats } from "../hooks/useSearch";
import { responsive } from "../constants";

const HomePage: React.FC = memo(() => {
  const navigate = useNavigate();
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  
  // API hooks - Only using stats (one-time call) and static suggestions to conserve API quota
  const { suggestions: popularSuggestions } = usePopularSuggestions();
  const { stats, isLoading: isLoadingStats } = useRecipeStats();

  // Trigger animations on mount
  useEffect(() => {
    const timer1 = setTimeout(() => setIsVisible(true), 200);
    const timer2 = setTimeout(() => setFeaturesVisible(true), 800);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Handle search input changes (no API calls)
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    // No API calls here - just update the input value
  }, []);

  // Handle search submission
  const handleSearchSubmit = useCallback((query?: string) => {
    const searchTerm = query || searchQuery;
    if (searchTerm.trim()) {
      // Navigate to recipes page with search query
      navigate(`/recipes?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  }, [searchQuery, navigate]);

  // Handle suggestion click
  const handleSuggestionClick = useCallback((suggestion: string) => {
    handleSearchSubmit(suggestion);
  }, [handleSearchSubmit]);

  // Handle Enter key press
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  }, [handleSearchSubmit]);

  // Display suggestions (always show popular suggestions to avoid API calls)
  const displaySuggestions = popularSuggestions;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className={`${responsive.hero} ${responsive.padding.page} flex flex-col items-center justify-center text-center relative overflow-hidden`}>
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full animate-float animation-delay-2000"
            style={{ opacity: isVisible ? 0.3 : 0, transition: 'opacity 2s ease-out 2s' }}
          />
          <div 
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/3 rounded-full animate-breathe animation-delay-4000"
            style={{ opacity: isVisible ? 0.2 : 0, transition: 'opacity 2s ease-out 4s' }}
          />
        </div>        <div className={`${responsive.container.normal} relative z-10 w-full transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Main Heading */}
          <h1 className={`${responsive.text.hero} ${responsive.margin.element} font-bold text-yum-primary-ec drop-shadow-lg yum-text-shadow-strong leading-tight transform transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block animate-bounce-gentle">Discover,</span>{' '}
            <span className="inline-block animate-bounce-gentle animation-delay-200">Cook,</span>{' '}
            <span className="inline-block animate-bounce-gentle animation-delay-400">Enjoy!</span>
          </h1>
          
          <p className={`${responsive.text.body} ${responsive.margin.section} max-w-2xl mx-auto font-normal drop-shadow-md yum-text-shadow leading-relaxed transform transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ color: 'rgb(255, 235, 170)' }}>
            Your AI-powered culinary companion with 300,000+ recipes, smart meal planning, and personalized nutrition insights
          </p>
          
          {/* Search Bar */}
          <div className={`relative max-w-2xl mx-auto z-50 ${responsive.margin.section} transform transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
            <div className="relative group">
              <div 
                className="relative bg-white/10 backdrop-blur-xl rounded-full border border-white/20 p-1 shadow-2xl hover:shadow-3xl transition-all duration-500 z-40 transform hover:scale-105 group-hover:bg-white/15"
                onMouseEnter={() => setShowSuggestions(true)}
                onMouseLeave={() => setShowSuggestions(false)}
              >
                <div className="relative flex items-center z-40">
                  <div className="pl-4 sm:pl-6 pr-2 transform transition-transform duration-300 group-hover:scale-110">
                    <svg width="20" height="20" className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  
                  <input 
                    type="text" 
                    placeholder="What would you like to cook today?" 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress}
                    className={`${responsive.text.body} flex-1 bg-transparent text-white placeholder-white/60 font-medium border-0 outline-none focus:placeholder-white/40 transition-all duration-300 py-3 sm:py-4 px-1 sm:px-2 focus:scale-105`}
                  />
                  
                  <button 
                    onClick={() => handleSearchSubmit()}
                    className={`${responsive.button.padding} ${responsive.button.text} bg-gradient-to-r from-yum-primary to-yum-secondary text-white rounded-full font-semibold hover:shadow-xl hover:scale-110 transition-all duration-300 mr-1 flex items-center gap-1 sm:gap-2`}
                  >
                    <span className="hidden sm:inline">Search</span>
                    <span className="sm:hidden">Go</span>
                    <svg width="16" height="16" className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
                
                {/* Search Suggestions */}
                {showSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-4 z-[9999] mx-2 sm:mx-0 animate-fade-in-up">
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-white/30 p-3 sm:p-4 shadow-2xl transform transition-all duration-300 scale-100 hover:scale-105">
                      <div className="text-gray-700 text-xs sm:text-sm font-medium mb-2 sm:mb-3 animate-fade-in">
                        Popular searches:
                      </div>
                      
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {displaySuggestions.map((suggestion: string, index: number) => (
                          <button 
                            key={`${suggestion}-${index}`}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="bg-white hover:bg-gray-50 text-yum-primary-ec border border-yum-primary/20 text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Feature Highlights */}
          <div className={`flex justify-center gap-2 sm:gap-4 lg:gap-6 text-white/90 text-xs sm:text-sm font-medium flex-wrap relative z-10 px-2 transform transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {[
              { color: 'from-green-400 to-emerald-400', text: 'AI-Powered' },
              { color: 'from-blue-400 to-cyan-400', text: '300K+ Recipes' },
              { color: 'from-purple-400 to-pink-400', text: 'Smart Nutrition' },
              { color: 'from-orange-400 to-red-400', text: 'Meal Planning' }
            ].map((highlight, index) => (
              <div 
                key={index} 
                className="flex items-center gap-1 sm:gap-2 bg-white/10 px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-110 cursor-pointer"
              >
                <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r ${highlight.color} rounded-full`}></div>
                <span className="whitespace-nowrap hover:text-white transition-colors duration-300">{highlight.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Feature Cards */}
      <div className={`${responsive.padding.section} ${responsive.padding.page} transform transition-all duration-1000 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className={responsive.container.wide}>
          <div className="text-center mb-6 sm:mb-10 lg:mb-12">
            <h2 className={`${responsive.text.heading} font-bold text-yum-primary-ec mb-3 sm:mb-4 lg:mb-6 transform transition-all duration-800 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Powerful Features
            </h2>
            <p className={`${responsive.text.body} text-yum-text-primary max-w-2xl mx-auto transform transition-all duration-800 delay-200 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Everything you need to transform your cooking experience
            </p>
          </div>
          
          <div className={`${responsive.grid.cards} ${featuresVisible ? 'stagger-fade-in' : ''}`}>
            {[
            {
              id: 'recipes',
              icon: '🔍',
              title: 'Smart Recipe Discovery',
              description: 'Explore 300,000+ recipes with AI-powered filters for cuisine, diet, allergies, and cooking time',
              buttonText: 'Explore Recipes',
              route: '/recipes'
            },
            {
              id: 'nutrition',
              icon: '📊',
              title: 'Nutrition Intelligence',
              description: 'Get detailed nutrition analysis, health scores, and personalized dietary recommendations',
              buttonText: 'View Nutrition'
            },
            {
              id: 'planner',
              icon: '🤖',
              title: 'AI Meal Planning',
              description: 'Generate personalized weekly meal plans based on your preferences and dietary goals',
              buttonText: 'Plan Meals',
              route: '/planner'
            },
            {
              id: 'grocery',
              icon: '🛒',
              title: 'Smart Grocery Lists',
              description: 'Auto-generate organized grocery lists from meal plans, sorted by store aisles',
              buttonText: 'Create List',
              route: '/grocery'
            },
            {
              id: 'scaling',
              icon: '⚖️',
              title: 'Recipe Scaling',
              description: 'Automatically adjust ingredient quantities for any number of servings',
              buttonText: 'Try Scaling'
            },
            {
              id: 'preferences',
              icon: '🌱',
              title: 'Dietary Preferences',
              description: 'Filter recipes by dietary restrictions, allergies, and personal preferences',
              buttonText: 'Set Preferences'
            }
          ].map((feature) => (
            <div 
              key={feature.id} 
              className="group relative transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            >
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-yum-primary/30 transition-all duration-500 h-full flex flex-col overflow-hidden text-center group-hover:bg-gradient-to-br group-hover:from-yum-primary/5 group-hover:to-yum-secondary/5 p-6 sm:p-8">
                {/* Icon */}
                <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 transition-all duration-300 group-hover:scale-110 flex justify-center">
                  {feature.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold text-yum-primary-ec mb-3 sm:mb-4 group-hover:text-yum-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed flex-grow mb-6 sm:mb-8 group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>
                
                {/* Button */}
                <button 
                  onClick={() => feature.route && navigate(feature.route)}
                  className="bg-gradient-to-r from-yum-primary to-yum-secondary text-white px-6 py-3 rounded-xl font-semibold w-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl group-hover:from-yum-secondary group-hover:to-yum-primary"
                >
                  {feature.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className={`bg-gradient-to-r from-yum-primary/10 to-yum-secondary/10 backdrop-blur-sm ${responsive.padding.section} ${responsive.padding.page}`}>
        <div className={responsive.container.wide}>
          <div className={`text-center ${responsive.margin.section}`}>
            <h2 className={`${responsive.text.heading} font-bold text-yum-primary-ec mb-2 sm:mb-3`}>Powered by Advanced AI & Data</h2>
            <p className={`${responsive.text.body} text-yum-text-primary max-w-2xl mx-auto`}>
              YumMate leverages Spoonacular's comprehensive food database and cutting-edge algorithms to deliver the ultimate cooking experience
            </p>
          </div>
          <div className={responsive.grid.features}>
            {[
              { value: stats.totalRecipes, label: 'Recipes' },
              { value: stats.cuisines, label: 'Cuisines' },
              { value: stats.dietTypes, label: 'Diet Types' },
              { value: stats.nutritionData, label: 'Nutrition Data' }
            ].map((stat, index) => (
              <div key={index} className={`text-center bg-white/60 backdrop-blur-sm rounded-xl ${responsive.padding.card} border border-white/20`}>
                <div className={`${responsive.text.heading} font-bold mb-1 sm:mb-2 bg-gradient-to-r from-yum-primary to-yum-secondary bg-clip-text text-transparent`}>
                  {isLoadingStats ? (
                    <div className="animate-pulse bg-gradient-to-r from-yum-primary to-yum-secondary rounded h-6 sm:h-8 w-12 sm:w-16 mx-auto"></div>
                  ) : (
                    stat.value
                  )}
                </div>
                <div className={`${responsive.text.small} text-yum-text-secondary font-medium`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

HomePage.displayName = 'HomePage';

export default HomePage;
