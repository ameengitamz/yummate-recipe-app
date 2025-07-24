import React from "react";
import { useNavigate } from "react-router-dom";
import { usePopularSuggestions, useRecipeStats } from "../hooks/useSearch";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // API hooks - Only using stats (one-time call) and static suggestions to conserve API quota
  const { suggestions: popularSuggestions } = usePopularSuggestions();
  const { stats, isLoading: isLoadingStats } = useRecipeStats();

  // Handle search input changes (no API calls)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    // No API calls here - just update the input value
  };

  // Handle search submission
  const handleSearchSubmit = (query?: string) => {
    const searchTerm = query || searchQuery;
    if (searchTerm.trim()) {
      // Navigate to recipes page with search query
      navigate(`/recipes?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    handleSearchSubmit(suggestion);
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  // Display suggestions (always show popular suggestions to avoid API calls)
  const displaySuggestions = popularSuggestions;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="h-[500px] flex flex-col items-center justify-center text-center relative">
        <div className="relative z-10 max-w-4xl px-4">
          <h1 className="text-5xl font-bold mb-5 text-yum-primary-ec drop-shadow-lg yum-text-shadow-strong">
            Discover, Cook, Enjoy!
          </h1>
          <p className="text-xl mb-6 max-w-2xl font-normal drop-shadow-md yum-text-shadow leading-relaxed" style={{ color: 'rgb(255, 235, 170)' }}>
            Your AI-powered culinary companion with <span className="font-semibold">300,000+ recipes</span>, smart meal planning, and personalized nutrition insights
          </p>
          
          {/* Modern Search Bar */}
          <div className="relative max-w-3xl mx-auto mb-12 z-50">
            <div className="relative group">
              <div 
                className="relative bg-white/10 backdrop-blur-xl rounded-full border border-white/20 p-1 shadow-2xl hover:shadow-3xl transition-all duration-300 z-40"
                onMouseEnter={() => setShowSuggestions(true)}
                onMouseLeave={() => setShowSuggestions(false)}
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-yum-primary/20 via-yum-secondary/20 to-yum-primary/20 rounded-full blur-xl opacity-0 hover:opacity-100 transition-all duration-500 z-30"></div>
                
                <div className="relative flex items-center z-40">
                  {/* Search Icon */}
                  <div className="pl-6 pr-2">
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-white/70">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  
                  {/* Input Field */}
                  <input 
                    type="text" 
                    placeholder="What would you like to cook today?" 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-transparent text-white placeholder-white/60 text-lg font-medium py-4 px-2 border-0 outline-none focus:placeholder-white/40 transition-all duration-300"
                  />
                  
                  {/* Search Button */}
                  <button 
                    onClick={() => handleSearchSubmit()}
                    className="bg-gradient-to-r from-yum-primary to-yum-secondary text-white px-8 py-3 rounded-full font-semibold text-base hover:shadow-xl hover:scale-105 transition-all duration-300 mr-1 flex items-center gap-2"
                  >
                    <span>Search</span>
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="hover:translate-x-1 transition-transform duration-300">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
                
                {/* Search Suggestions */}
                {showSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-4 z-[9999]">
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-white/30 p-4 shadow-2xl">
                      <div className="text-gray-700 text-sm font-medium mb-3">
                        Popular searches:
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {displaySuggestions.map((suggestion: string, index: number) => (
                          <button 
                            key={`${suggestion}-${index}`}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="bg-gradient-to-r from-yum-primary/10 to-yum-secondary/10 hover:from-yum-primary/20 hover:to-yum-secondary/20 text-yum-primary-ec border border-yum-primary/20 text-sm px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-md"
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
            
            {/* Advanced Search Toggle */}
            <div className="text-center mt-6 z-10 relative">
              <button className="text-white/70 hover:text-white text-sm font-medium flex items-center gap-2 mx-auto transition-all duration-300 hover:scale-105">
                <span>Advanced Search</span>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Feature Highlights */}
          <div className="flex justify-center gap-6 text-white/90 text-sm font-medium flex-wrap relative z-10">
            {[
              { color: 'from-green-400 to-emerald-400', text: 'AI-Powered' },
              { color: 'from-blue-400 to-cyan-400', text: '300K+ Recipes' },
              { color: 'from-purple-400 to-pink-400', text: 'Smart Nutrition' },
              { color: 'from-orange-400 to-red-400', text: 'Meal Planning' }
            ].map((highlight, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                <div className={`w-2 h-2 bg-gradient-to-r ${highlight.color} rounded-full animate-pulse`}></div>
                <span>{highlight.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Feature Cards */}
      <div className="px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-yum-primary-ec mb-3">Powerful Features</h2>
            <p className="text-lg text-yum-text-primary max-w-2xl mx-auto">Everything you need to transform your cooking experience</p>
          </div>
          
          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: 'recipes',
                icon: '🔍',
                title: 'Smart Recipe Discovery',
                description: 'Explore 300,000+ recipes with AI-powered filters for cuisine, diet, allergies, and cooking time',
                tags: ['Italian', 'Vegan', '< 30min'],
                tagColors: ['from-green-100 to-emerald-100 text-green-700', 'from-blue-100 to-cyan-100 text-blue-700', 'from-purple-100 to-pink-100 text-purple-700'],
                gradient: 'from-yum-primary to-yum-secondary',
                buttonText: 'Explore Recipes',
                buttonGradient: 'from-yum-primary to-yum-secondary',
                route: '/recipes'
              },
              {
                id: 'nutrition',
                icon: '📊',
                title: 'Nutrition Intelligence',
                description: 'Get detailed nutrition analysis, health scores, and personalized dietary recommendations',
                stats: [
                  { value: '420', label: 'Calories', color: 'text-green-600', bg: 'from-green-50 to-emerald-50', border: 'border-green-100' },
                  { value: '85%', label: 'Health Score', color: 'text-blue-600', bg: 'from-blue-50 to-cyan-50', border: 'border-blue-100' }
                ],
                gradient: 'from-green-400 to-blue-500',
                buttonText: 'View Nutrition',
                buttonGradient: 'from-green-500 to-blue-500'
              },
              {
                id: 'planner',
                icon: '🤖',
                title: 'AI Meal Planning',
                description: 'Generate personalized weekly meal plans based on your preferences and dietary goals',
                planInfo: { meals: '15 meals', calories: '2,000 cal/day' },
                gradient: 'from-purple-400 to-pink-500',
                buttonText: 'Plan Meals',
                buttonGradient: 'from-purple-500 to-pink-500',
                route: '/planner'
              },
              {
                id: 'grocery',
                icon: '🛒',
                title: 'Smart Grocery Lists',
                description: 'Auto-generate organized grocery lists from meal plans, sorted by store aisles',
                groceryInfo: { items: '18 items', cost: '$67.50' },
                gradient: 'from-orange-400 to-red-500',
                buttonText: 'Create List',
                buttonGradient: 'from-orange-500 to-red-500',
                route: '/grocery'
              },
              {
                id: 'scaling',
                icon: '⚖️',
                title: 'Recipe Scaling',
                description: 'Automatically adjust ingredient quantities for any number of servings',
                servings: 4,
                gradient: 'from-indigo-400 to-purple-500',
                buttonText: 'Try Scaling',
                buttonGradient: 'from-indigo-500 to-purple-500'
              },
              {
                id: 'preferences',
                icon: '🌱',
                title: 'Dietary Preferences',
                description: 'Filter recipes by dietary restrictions, allergies, and personal preferences',
                preferences: [
                  { name: 'Vegetarian', color: 'from-green-100 to-emerald-100 text-green-700' },
                  { name: 'Gluten-Free', color: 'from-blue-100 to-cyan-100 text-blue-700' },
                  { name: 'Keto', color: 'from-purple-100 to-pink-100 text-purple-700' },
                  { name: 'Paleo', color: 'from-orange-100 to-red-100 text-orange-700' }
                ],
                gradient: 'from-emerald-400 to-teal-500',
                buttonText: 'Set Preferences',
                buttonGradient: 'from-emerald-500 to-teal-500'
              }
            ].map((feature) => (
              <div key={feature.id} className="group relative h-96">
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-105`}></div>
                <div className="relative bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100 transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105 h-full flex flex-col">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-yum-primary-ec mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">{feature.description}</p>
                  
                  {/* Feature-specific content */}
                  {feature.tags && (
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {feature.tags.map((tag, index) => (
                        <span key={tag} className={`bg-gradient-to-r ${feature.tagColors[index]} px-2 py-1 rounded-full text-xs font-medium`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {feature.stats && (
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {feature.stats.map((stat, index) => (
                        <div key={index} className={`bg-gradient-to-br ${stat.bg} rounded-lg p-3 border ${stat.border}`}>
                          <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                          <div className={`text-xs ${stat.color} font-medium`}>{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {feature.planInfo && (
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 mb-4 border border-purple-100">
                      <div className="text-xs text-gray-600 mb-1">This Week's Plan</div>
                      <div className="text-yum-primary-ec font-bold text-base">{feature.planInfo.meals} • {feature.planInfo.calories}</div>
                    </div>
                  )}
                  
                  {feature.groceryInfo && (
                    <div className="flex justify-between items-center bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-3 mb-4 border border-orange-100">
                      <div className="text-xs text-gray-600">{feature.groceryInfo.items}</div>
                      <div className="text-yum-primary-ec font-bold text-base">{feature.groceryInfo.cost}</div>
                    </div>
                  )}
                  
                  {feature.servings && (
                    <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3 mb-4 border border-indigo-100">
                      <button className="w-8 h-8 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-600 rounded-full font-bold hover:scale-110 transition-transform">-</button>
                      <span className="text-yum-primary-ec font-bold text-base">{feature.servings} servings</span>
                      <button className="w-8 h-8 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-600 rounded-full font-bold hover:scale-110 transition-transform">+</button>
                    </div>
                  )}
                  
                  {feature.preferences && (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {feature.preferences.map((pref) => (
                        <span key={pref.name} className={`bg-gradient-to-r ${pref.color} px-2 py-1 rounded-lg text-xs font-medium`}>
                          {pref.name}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <button 
                    onClick={() => feature.route && navigate(feature.route)}
                    className={`bg-gradient-to-r ${feature.buttonGradient} text-white px-6 py-2 rounded-xl font-semibold w-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 mt-auto`}
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
      <div className="bg-gradient-to-r from-yum-primary/10 to-yum-secondary/10 backdrop-blur-sm py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-yum-primary-ec mb-3">Powered by Advanced AI & Data</h2>
            <p className="text-lg text-yum-text-primary max-w-2xl mx-auto">
              YumMate leverages Spoonacular's comprehensive food database and cutting-edge algorithms to deliver the ultimate cooking experience
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: stats.totalRecipes, label: 'Recipes' },
              { value: stats.cuisines, label: 'Cuisines' },
              { value: stats.dietTypes, label: 'Diet Types' },
              { value: stats.nutritionData, label: 'Nutrition Data' }
            ].map((stat, index) => (
              <div key={index} className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-yum-primary to-yum-secondary bg-clip-text text-transparent">
                  {isLoadingStats ? (
                    <div className="animate-pulse bg-gradient-to-r from-yum-primary to-yum-secondary rounded h-8 w-16 mx-auto"></div>
                  ) : (
                    stat.value
                  )}
                </div>
                <div className="text-yum-text-secondary font-medium text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

