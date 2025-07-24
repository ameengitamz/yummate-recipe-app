import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as spoonacularApi from '../services/spoonacularApi';

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

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await spoonacularApi.getRecipeById(parseInt(id));
        
        if (!response.success || !response.data) {
          throw new Error(response.message || 'Failed to fetch recipe');
        }
        
        const recipeData = response.data;
        console.log('🔍 Raw API Response:', recipeData);
        
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
            ? recipeData.instructions.split('\n').filter(Boolean).map((step: string, index: number) => ({
                number: index + 1,
                step: step.trim()
              }))
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
        
        console.log('🔍 Processed Nutrition:', processedRecipe.nutrition);
        setRecipe(processedRecipe);
        setServings(processedRecipe.servings);
      } catch (err) {
        setError('Failed to load recipe details');
        console.error('Error fetching recipe:', err);
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
    console.log('Add to grocery list');
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-yum-primary/30 rounded-full animate-spin"></div>
            <div className="w-16 h-16 border-4 border-yum-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-yum-text-primary mt-4 text-lg">Loading recipe details...</p>
        </div>
      </div>
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
    <div className="w-full py-8">
      {/* Navigation Header */}
      <div className="sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-700 hover:text-yum-primary transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Recipes
            </button>
            
            <div className="flex gap-3">
              <button className="p-2 text-red-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button className="p-2 text-blue-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Enhanced Image Display */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
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
                      {/* Image Overlay with Actions */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end justify-end p-4 opacity-0 group-hover:opacity-100">
                        <div className="flex gap-2">
                          <button className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </button>
                          <button className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
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
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg border border-white/20">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-700">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    High Quality
                  </div>
                </div>

                {/* Quick Stats Floating Cards */}
                <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-2">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/20">
                    <div className="text-center">
                      <div className="text-lg font-bold text-yum-primary">{recipe.readyInMinutes}</div>
                      <div className="text-xs text-gray-600">Minutes</div>
                    </div>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/20">
                    <div className="text-center">
                      <div className="text-lg font-bold text-yum-primary">{servings}</div>
                      <div className="text-xs text-gray-600">Servings</div>
                    </div>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/20">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{recipe.healthScore}</div>
                      <div className="text-xs text-gray-600">Health</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recipe Meta Information */}
              <div className="mt-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
                <div className="grid grid-cols-2 gap-4 text-sm">
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
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {recipe?.title}
              </h1>
              
              {/* Rating and Tags */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">4.8 (324 reviews)</span>
                </div>
                
                <div className="flex gap-2">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Healthy
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
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
              <div className="flex items-center justify-between">
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
              <p className="text-sm text-gray-500 mt-2">Ingredients will adjust automatically</p>
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
              <button className="flex-1 bg-white border-2 border-yum-primary text-yum-primary py-4 px-6 rounded-2xl font-semibold hover:bg-yum-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m6-10v10M5 7h14l-1 12H6L5 7z" />
                </svg>
                Save Recipe
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
                        <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-yum-primary transition-all duration-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
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
                      <div key={index} className="flex gap-4 group">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-yum-primary text-white rounded-full flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform">
                            {instruction.number}
                          </div>
                        </div>
                        <div className="flex-1 pt-1">
                          <p className="text-gray-700 leading-relaxed text-sm group-hover:text-gray-900 transition-colors">
                            {instruction.step}
                          </p>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-green-500 transition-all duration-200 self-start">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {/* Cooking Timer Section */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-teal-800">Total Cooking Time</p>
                          <p className="text-sm text-teal-600">{recipe.readyInMinutes} minutes</p>
                        </div>
                      </div>
                      <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                        Start Timer
                      </button>
                    </div>
                  </div>
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
