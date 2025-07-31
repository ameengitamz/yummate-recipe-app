import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as spoonacularApi from '../services/spoonacularApi';
import { LoadingSpinner } from '../components';
import { responsive } from '../constants';

interface RecipeIngredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  original: string;
}

interface RecipeInstruction {
  number: number;
  step: string;
}

interface RecipeNutrition {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  fiber: string;
  sugar: string;
}

interface RecipeDetail {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  healthScore: number;
  pricePerServing: number;
  summary: string;
  ingredients: RecipeIngredient[];
  instructions: RecipeInstruction[];
  nutrition: RecipeNutrition;
  diets: string[];
  cuisines: string[];
  dishTypes: string[];
}

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [servings, setServings] = useState(4);
  const [activeAccordion, setActiveAccordion] = useState<'ingredients' | 'instructions' | null>('ingredients');
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  // Toggle step completion
  const toggleStepCompletion = (stepNumber: number) => {
    const newCompletedSteps = new Set(completedSteps);
    if (newCompletedSteps.has(stepNumber)) {
      newCompletedSteps.delete(stepNumber);
    } else {
      newCompletedSteps.add(stepNumber);
    }
    setCompletedSteps(newCompletedSteps);
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const fetchRecipe = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await spoonacularApi.getRecipeById(parseInt(id));
        
        if (!response.success || !response.data) {
          throw new Error(response.message || 'Failed to fetch recipe');
        }
        
        const recipeData = response.data;
        
        const processedRecipe: RecipeDetail = {
          id: parseInt(recipeData.id),
          title: recipeData.title,
          image: recipeData.image || '',
          readyInMinutes: recipeData.readyInMinutes || 30,
          servings: recipeData.servings || 4,
          healthScore: recipeData.healthScore || 0,
          pricePerServing: recipeData.pricePerServing || 0,
          summary: recipeData.summary || '',
          ingredients: recipeData.extendedIngredients?.map((ing: any) => ({
            id: ing.id,
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit,
            original: ing.original
          })) || [],
          instructions: recipeData.instructions 
            ? (() => {
                // Parse HTML instructions if they contain <li> tags
                if (recipeData.instructions.includes('<li>')) {
                  const tempDiv = document.createElement('div');
                  tempDiv.innerHTML = recipeData.instructions;
                  const listItems = tempDiv.querySelectorAll('li');
                  return Array.from(listItems).map((li, index) => ({
                    number: index + 1,
                    step: li.textContent?.trim() || ''
                  }));
                }
                // Fallback to splitting by newlines for plain text
                return recipeData.instructions.split('\n').filter(Boolean).map((step: string, index: number) => ({
                  number: index + 1,
                  step: step.trim()
                }));
              })()
            : [],
          nutrition: recipeData.nutrition?.nutrients ? {
            calories: Math.round(recipeData.nutrition.nutrients.find((n: any) => n.name === 'Calories')?.amount || 0),
            protein: `${Math.round(recipeData.nutrition.nutrients.find((n: any) => n.name === 'Protein')?.amount || 0)}g`,
            carbs: `${Math.round(recipeData.nutrition.nutrients.find((n: any) => n.name === 'Carbohydrates')?.amount || 0)}g`,
            fat: `${Math.round(recipeData.nutrition.nutrients.find((n: any) => n.name === 'Fat')?.amount || 0)}g`,
            fiber: `${Math.round(recipeData.nutrition.nutrients.find((n: any) => n.name === 'Fiber')?.amount || 0)}g`,
            sugar: `${Math.round(recipeData.nutrition.nutrients.find((n: any) => n.name === 'Sugar')?.amount || 0)}g`
          } : {
            // Fallback values when nutrition data is not available
            calories: 250,
            protein: "15g",
            carbs: "30g",
            fat: "12g",
            fiber: "5g",
            sugar: "8g"
          },
          diets: recipeData.diets || [],
          cuisines: recipeData.cuisine ? [recipeData.cuisine] : [],
          dishTypes: recipeData.dishTypes || []
        };
        
        setRecipe(processedRecipe);
        setServings(processedRecipe.servings);
      } catch (err) {
        setError('Failed to load recipe details');
        // Log error for debugging without exposing to user
        if (import.meta.env.DEV) {
          console.error('Error fetching recipe:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const adjustServings = (newServings: number) => {
    if (newServings < 1) return;
    setServings(newServings);
  };

  const getScaledAmount = (originalAmount: number, originalServings: number) => {
    return ((originalAmount * servings) / originalServings).toFixed(1);
  };

  const handleAddToGroceryList = () => {
    // TODO: Implement grocery list integration
    alert('Feature coming soon! This will add all ingredients to your shopping list.');
  };

  if (loading) {
    return (
      <LoadingSpinner
        variant="fullscreen"
        size="xl"
        message="Loading Recipe"
        subtitle="Preparing delicious details..."
        showIcon={true}
        showDots={true}
      />
    );
  }

  if (error || !recipe) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-8xl mb-6">😔</div>
          <h2 className="text-3xl font-bold text-yum-text-primary mb-4">Recipe Not Found</h2>
          <p className="text-yum-text-secondary mb-8 text-lg">{error || 'The recipe you\'re looking for doesn\'t exist.'}</p>
          <button 
            onClick={() => navigate('/recipes')}
            className="bg-gradient-to-r from-yum-primary to-yum-primary-dark text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            ← Browse Other Recipes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${responsive.padding.section}`}>
      {/* Navigation Header */}
      <div className="sticky top-0 z-50">
        <div className={`${responsive.container.full} ${responsive.padding.mobile}`}>
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)}
              className={`flex items-center gap-2 text-gray-700 hover:text-yum-primary transition-colors font-medium ${responsive.text.small}`}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Recipes
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section with Enhanced Image Display */}
      <div className={`${responsive.container.full} ${responsive.padding.section}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-8 lg:mb-12">
          {/* Left: Enhanced Image Section */}
          <div className="order-2 lg:order-1">
            <div className="sticky top-24">
              {/* Main Recipe Image */}
              <div className="relative group">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-teal-500 border-4 border-white/50 shadow-2xl backdrop-blur-sm">
                  {recipe?.image ? (
                    <>
                      <img 
                        src={recipe.image} 
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
                      <div className="text-center">
                        <svg className="w-16 h-16 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm font-medium">No Image Available</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Image Info Badge */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-white/95 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 shadow-lg border border-white/20">
                  <div className={`flex items-center gap-2 ${responsive.text.small} font-medium text-gray-700`}>
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    High Quality
                  </div>
                </div>

                {/* Quick Stats Floating Cards */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 grid grid-cols-3 gap-1 sm:gap-2">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-2 sm:p-3 shadow-lg border border-white/20">
                    <div className="text-center">
                      <div className={`${responsive.text.body} font-bold text-yum-primary`}>{recipe.readyInMinutes}</div>
                      <div className={`${responsive.text.small} text-gray-600`}>Minutes</div>
                    </div>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-2 sm:p-3 shadow-lg border border-white/20">
                    <div className="text-center">
                      <div className={`${responsive.text.body} font-bold text-yum-primary`}>{servings}</div>
                      <div className={`${responsive.text.small} text-gray-600`}>Servings</div>
                    </div>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-2 sm:p-3 shadow-lg border border-white/20">
                    <div className="text-center">
                      <div className={`${responsive.text.body} font-bold text-green-600`}>{recipe.healthScore}</div>
                      <div className={`${responsive.text.small} text-gray-600`}>Health</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recipe Meta Information */}
              <div className={`${responsive.margin.element} bg-white/90 backdrop-blur-sm rounded-xl ${responsive.padding.card} shadow-lg border border-white/20`}>
                <div className={`grid grid-cols-2 gap-3 sm:gap-4 ${responsive.text.small}`}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-orange-600 text-sm">⏱️</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Prep Time</div>
                      <div className="text-gray-600">{Math.round(recipe.readyInMinutes * 0.3)} min</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <span className="text-red-600 text-sm">🔥</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Cook Time</div>
                      <div className="text-gray-600">{Math.round(recipe.readyInMinutes * 0.7)} min</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 text-sm">💰</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Cost</div>
                      <div className="text-gray-600">${(recipe.pricePerServing / 100).toFixed(2)}/serving</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 text-sm">⭐</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Health Score</div>
                      <div className="text-gray-600">{recipe.healthScore}/100</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Recipe Information */}
          <div className="order-1 lg:order-2">
            {/* Recipe Title & Basic Info */}
            <div className={responsive.margin.section}>
              <h1 className={`${responsive.text.heading} font-bold text-gray-900 ${responsive.margin.element} leading-tight`}>
                {recipe?.title}
              </h1>
              
              {/* Rating and Tags */}
              <div className={`flex flex-wrap items-center gap-3 sm:gap-4 ${responsive.margin.element}`}>
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className={`text-gray-600 ${responsive.text.small}`}>4.8 (324 reviews)</span>
                </div>
                
                <div className="flex gap-1 sm:gap-2">
                  <span className={`bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full ${responsive.text.small} font-medium`}>
                    Healthy
                  </span>
                  <span className={`bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full ${responsive.text.small} font-medium`}>
                    Quick
                  </span>
                </div>
              </div>

              {/* Summary */}
              {recipe.summary && (
                <div 
                  className="text-gray-600 leading-relaxed mb-6 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: recipe.summary.replace(/<[^>]*>/g, '').substring(0, 200) + '...' 
                  }}
                />
              )}

              {/* Price and Nutrition Quick View */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="text-lg font-bold text-gray-900">${(recipe.pricePerServing / 100).toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Per Serving</div>
                </div>
                {recipe.nutrition && (
                  <>
                    <div className="text-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 relative">
                      <div className="text-lg font-bold text-orange-600">{recipe.nutrition.calories}</div>
                      <div className="text-sm text-gray-600">Calories</div>
                      {recipe.nutrition.calories === 250 && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full" title="Estimated value"></div>
                      )}
                    </div>
                    <div className="text-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 relative">
                      <div className="text-lg font-bold text-blue-600">{recipe.nutrition.protein}</div>
                      <div className="text-sm text-gray-600">Protein</div>
                      {recipe.nutrition.protein === "15g" && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full" title="Estimated value"></div>
                      )}
                    </div>
                    <div className="text-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 relative">
                      <div className="text-lg font-bold text-green-600">{recipe.nutrition.carbs}</div>
                      <div className="text-sm text-gray-600">Carbs</div>
                      {recipe.nutrition.carbs === "30g" && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full" title="Estimated value"></div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Servings Control */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Adjust Servings</h3>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => adjustServings(servings - 1)}
                    className="w-10 h-10 bg-gray-100 hover:bg-yum-primary hover:text-white text-gray-700 rounded-full font-bold transition-all duration-300 hover:scale-110"
                  >
                    -
                  </button>
                  <div className="text-center min-w-[3rem]">
                    <div className="text-2xl font-bold text-yum-primary">{servings}</div>
                    <div className="text-xs text-gray-600">servings</div>
                  </div>
                  <button 
                    onClick={() => adjustServings(servings + 1)}
                    className="w-10 h-10 bg-gray-100 hover:bg-yum-primary hover:text-white text-gray-700 rounded-full font-bold transition-all duration-300 hover:scale-110"
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-3">Ingredients will adjust automatically</p>
              
              {/* Quick Serving Presets */}
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs text-gray-500 mr-2">Quick select:</span>
                {[1, 2, 4, 6, 8].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setServings(preset)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      servings === preset
                        ? 'bg-yum-primary text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-yum-primary hover:text-white'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToGroceryList}
                className="flex-1 bg-gradient-to-r from-yum-primary to-yum-primary-dark text-white py-4 px-6 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                </svg>
                Add to Shopping List
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Sections - Accordion */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Ingredients Accordion */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => setActiveAccordion(activeAccordion === 'ingredients' ? null : 'ingredients')}
                className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                      <span className="text-white">🛒</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">Ingredients</h2>
                      <p className="text-sm text-gray-500">({servings} servings • {recipe.ingredients.length} items)</p>
                    </div>
                  </div>
                  <div className={`transform transition-transform duration-200 ${activeAccordion === 'ingredients' ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                activeAccordion === 'ingredients' ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-6">
                  <div className="space-y-3 mb-6">
                    {recipe.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                        <div className="w-2 h-2 bg-yum-primary rounded-full mt-2 group-hover:scale-125 transition-transform"></div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row gap-1">
                            <span className="font-semibold text-yum-primary text-sm">
                              {getScaledAmount(ingredient.amount, recipe.servings)}{ingredient.unit}
                            </span>
                            <span className="text-gray-700 text-sm">{ingredient.name}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={handleAddToGroceryList}
                    className="w-full bg-gradient-to-r from-yum-accent to-orange-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    📋 Add All to Shopping List
                  </button>
                </div>
              </div>
            </div>

            {/* Instructions Accordion */}
            <div>
              <button
                onClick={() => setActiveAccordion(activeAccordion === 'instructions' ? null : 'instructions')}
                className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center">
                      <span className="text-white">👨‍🍳</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">Instructions</h2>
                      <p className="text-sm text-gray-500">{recipe.instructions.length} steps • ~{recipe.readyInMinutes} minutes</p>
                    </div>
                  </div>
                  <div className={`transform transition-transform duration-200 ${activeAccordion === 'instructions' ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                activeAccordion === 'instructions' ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    {recipe.instructions.map((instruction, index) => (
                      <div key={index} className={`flex gap-4 group p-3 rounded-lg transition-all duration-200 ${
                        completedSteps.has(instruction.number) ? 'bg-green-50 border border-green-200' : 'hover:bg-gray-50'
                      }`}>
                        <div className="flex-shrink-0">
                          <button
                            onClick={() => toggleStepCompletion(instruction.number)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 ${
                              completedSteps.has(instruction.number)
                                ? 'bg-green-500 text-white'
                                : 'bg-yum-primary text-white hover:scale-110'
                            }`}
                          >
                            {completedSteps.has(instruction.number) ? '✓' : instruction.number}
                          </button>
                        </div>
                        <div className="flex-1 pt-1">
                          <p className={`leading-relaxed text-sm transition-colors ${
                            completedSteps.has(instruction.number)
                              ? 'text-green-700 line-through'
                              : 'text-gray-700 group-hover:text-gray-900'
                          }`}>
                            {instruction.step}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Progress Indicator */}
                  {recipe.instructions.length > 0 && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-800">Cooking Progress</span>
                        <span className="text-sm text-blue-600">
                          {completedSteps.size} of {recipe.instructions.length} steps completed
                        </span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(completedSteps.size / recipe.instructions.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        {(recipe.diets.length > 0 || recipe.cuisines.length > 0 || recipe.dishTypes.length > 0) && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Categories & Tags</h3>
            
            <div className="space-y-4">
              {recipe.diets.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">Diet Types</div>
                  <div className="flex flex-wrap gap-2">
                    {recipe.diets.map((diet, index) => (
                      <span key={index} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        {diet}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {recipe.cuisines.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">Cuisines</div>
                  <div className="flex flex-wrap gap-2">
                    {recipe.cuisines.map((cuisine, index) => (
                      <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {cuisine}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {recipe.dishTypes.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">Dish Types</div>
                  <div className="flex flex-wrap gap-2">
                    {recipe.dishTypes.map((dishType, index) => (
                      <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                        {dishType}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetailPage;
