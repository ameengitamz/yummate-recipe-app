import React, { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { usePopularSuggestions, useRecipeStats } from "../hooks/useSearch";
import { responsive } from "../constants";

const HomePage: React.FC = memo(() => {
  const navigate = useNavigate();
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // API hooks - Only using stats (one-time call) and static suggestions to conserve API quota
  const { suggestions: popularSuggestions } = usePopularSuggestions();
  const { stats, isLoading: isLoadingStats } = useRecipeStats();

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
      <div className={`${responsive.hero} ${responsive.padding.page} flex flex-col items-center justify-center text-center relative`}>
        <div className={`${responsive.container.normal} relative z-10 w-full`}>
          <h1 className={`${responsive.text.hero} ${responsive.margin.element} font-bold text-yum-primary-ec drop-shadow-lg yum-text-shadow-strong leading-tight`}>
            Discover, Cook, Enjoy!
          </h1>
          <p className={`${responsive.text.body} ${responsive.margin.section} max-w-2xl mx-auto font-normal drop-shadow-md yum-text-shadow leading-relaxed`} style={{ color: 'rgb(255, 235, 170)' }}>
            Your AI-powered culinary companion with <span className="font-semibold">300,000+ recipes</span>, smart meal planning, and personalized nutrition insights
          </p>
          
          {/* Modern Search Bar */}
          <div className={`relative max-w-2xl mx-auto z-50 ${responsive.margin.section}`}>
            <div className="relative group">
              <div 
                className="relative bg-white/10 backdrop-blur-xl rounded-full border border-white/20 p-1 shadow-2xl hover:shadow-3xl transition-all duration-300 z-40"
                onMouseEnter={() => setShowSuggestions(true)}
                onMouseLeave={() => setShowSuggestions(false)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yum-primary/20 via-yum-secondary/20 to-yum-primary/20 rounded-full blur-xl opacity-0 hover:opacity-100 transition-all duration-500 z-30"></div>
                
                <div className="relative flex items-center z-40">
                  <div className="pl-4 sm:pl-6 pr-2">
                    <svg width="20" height="20" className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  
                  <input 
                    type="text" 
                    placeholder="What would you like to cook today?" 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress}
                    className={`${responsive.text.body} flex-1 bg-transparent text-white placeholder-white/60 font-medium border-0 outline-none focus:placeholder-white/40 transition-all duration-300 py-3 sm:py-4 px-1 sm:px-2`}
                  />
                  
                  <button 
                    onClick={() => handleSearchSubmit()}
                    className={`${responsive.button.padding} ${responsive.button.text} bg-gradient-to-r from-yum-primary to-yum-secondary text-white rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 mr-1 flex items-center gap-1 sm:gap-2`}
                  >
                    <span className="hidden sm:inline">Search</span>
                    <span className="sm:hidden">Go</span>
                    <svg width="16" height="16" className="w-4 h-4 sm:w-5 sm:h-5 hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
                
                {/* Search Suggestions */}
                {showSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-4 z-[9999] mx-2 sm:mx-0">
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-white/30 p-3 sm:p-4 shadow-2xl">
                      <div className="text-gray-700 text-xs sm:text-sm font-medium mb-2 sm:mb-3">
                        Popular searches:
                      </div>
                      
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {displaySuggestions.map((suggestion: string, index: number) => (
                          <button 
                            key={`${suggestion}-${index}`}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="bg-gradient-to-r from-yum-primary/10 to-yum-secondary/10 hover:from-yum-primary/20 hover:to-yum-secondary/20 text-yum-primary-ec border border-yum-primary/20 text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-md"
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
          <div className="flex justify-center gap-2 sm:gap-4 lg:gap-6 text-white/90 text-xs sm:text-sm font-medium flex-wrap relative z-10 px-2">
            {[
              { color: 'from-green-400 to-emerald-400', text: 'AI-Powered' },
              { color: 'from-blue-400 to-cyan-400', text: '300K+ Recipes' },
              { color: 'from-purple-400 to-pink-400', text: 'Smart Nutrition' },
              { color: 'from-orange-400 to-red-400', text: 'Meal Planning' }
            ].map((highlight, index) => (
              <div key={index} className="flex items-center gap-1 sm:gap-2 bg-white/10 px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm">
                <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r ${highlight.color} rounded-full animate-pulse`}></div>
                <span className="whitespace-nowrap">{highlight.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Feature Cards */}
      <div className={`${responsive.padding.section} ${responsive.padding.page}`}>
        <div className={responsive.container.wide}>
          <div className="text-center mb-6 sm:mb-10 lg:mb-12">
            <h2 className={`${responsive.text.heading} font-bold text-yum-primary-ec mb-3 sm:mb-4 lg:mb-6`}>Powerful Features</h2>
            <p className={`${responsive.text.body} text-yum-text-primary max-w-2xl mx-auto`}>Everything you need to transform your cooking experience</p>
          </div>
          
          <div className={responsive.grid.cards}>
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
            <div key={feature.id} className={`group relative ${responsive.card}`}>
              <div className={`${responsive.padding.card} relative bg-white rounded-2xl shadow-lg text-center border border-gray-100 transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105 h-full flex flex-col`}>
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className={`${responsive.text.subheading} font-bold text-yum-primary-ec mb-2 sm:mb-3`}>{feature.title}</h3>
                <p className={`${responsive.text.small} text-gray-600 leading-relaxed flex-grow mb-4 sm:mb-6`}>{feature.description}</p>
                
                <button 
                  onClick={() => feature.route && navigate(feature.route)}
                  className="bg-gradient-to-r from-yum-primary to-yum-secondary text-white px-6 py-2 rounded-xl font-semibold w-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 mt-auto"
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
