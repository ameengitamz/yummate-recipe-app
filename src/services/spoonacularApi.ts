import axios from 'axios';
import type { 
  SpoonacularSearchResult, 
  SpoonacularRecipe, 
  SpoonacularRecipeDetail,
  RecipeSearchParams,
  Recipe,
  SearchResult,
  ApiResponse
} from '../types/api';

// Get API configuration from environment
const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY || '';
const BASE_URL = import.meta.env.VITE_SPOONACULAR_BASE_URL || 'https://api.spoonacular.com';

// Check if API key is properly set up
if (!API_KEY) {
  console.error('❌ Spoonacular API key not found. Please add VITE_SPOONACULAR_API_KEY to your .env file');
  console.log('💡 Get your free API key at: https://spoonacular.com/food-api');
} else if (API_KEY === 'your_spoonacular_api_key_here') {
  console.error('❌ Please replace the placeholder API key with your actual key in .env file');
} else if (API_KEY.length < 32) {
  console.warn('⚠️ API key seems too short. Spoonacular keys are usually 32+ characters');
} else {
  console.log('✅ Spoonacular API key loaded successfully');
}

// Helper function to make API requests
async function makeApiRequest(endpoint: string, params: any = {}) {
  try {
    // Add API key to all requests
    params.apiKey = API_KEY;
    
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params,
      timeout: 15000,
    });
    
    return response.data;
    
  } catch (error: any) {
    console.error('❌ API Error:', error.response?.status, error.message);
    
    // Handle different error types
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        throw new Error('Invalid API key. Please check your VITE_SPOONACULAR_API_KEY in .env file');
      } else if (status === 402) {
        throw new Error('API quota exceeded. Please upgrade your Spoonacular plan or wait for quota reset');
      } else if (status === 403) {
        throw new Error('API access forbidden. Please check your API key permissions');
      } else if (status === 404) {
        throw new Error('API endpoint not found');
      }
      throw new Error(`API request failed with status ${status}`);
    } else if (error.request) {
      throw new Error('Network error - please check your internet connection');
    } else {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
}

// Helper function to convert Spoonacular recipe to our format
function convertRecipe(spoonacularRecipe: SpoonacularRecipe): Recipe {
  // Simple difficulty calculation
  let difficulty: 'Easy' | 'Medium' | 'Hard' = 'Easy';
  if (spoonacularRecipe.readyInMinutes > 60) {
    difficulty = 'Hard';
  } else if (spoonacularRecipe.readyInMinutes > 30) {
    difficulty = 'Medium';
  }

  return {
    id: spoonacularRecipe.id.toString(),
    title: spoonacularRecipe.title,
    image: spoonacularRecipe.image,
    cookingTime: spoonacularRecipe.readyInMinutes,
    servings: spoonacularRecipe.servings,
    difficulty,
    cuisine: spoonacularRecipe.cuisines?.[0] || 'International',
    healthScore: spoonacularRecipe.healthScore,
    pricePerServing: spoonacularRecipe.pricePerServing,
    readyInMinutes: spoonacularRecipe.readyInMinutes,
    aggregateLikes: spoonacularRecipe.aggregateLikes,
    vegan: spoonacularRecipe.vegan,
    vegetarian: spoonacularRecipe.vegetarian,
    glutenFree: spoonacularRecipe.glutenFree,
    dairyFree: spoonacularRecipe.dairyFree,
    veryHealthy: spoonacularRecipe.veryHealthy,
    cheap: spoonacularRecipe.cheap,
    veryPopular: spoonacularRecipe.veryPopular,
    sustainable: spoonacularRecipe.sustainable,
    weightWatcherSmartPoints: spoonacularRecipe.weightWatcherSmartPoints,
    gaps: spoonacularRecipe.gaps,
    lowFodmap: spoonacularRecipe.lowFodmap,
    ketogenic: spoonacularRecipe.ketogenic,
    whole30: spoonacularRecipe.whole30,
    sourceUrl: spoonacularRecipe.sourceUrl,
    spoonacularSourceUrl: spoonacularRecipe.spoonacularSourceUrl,
    dishTypes: spoonacularRecipe.dishTypes,
    diets: spoonacularRecipe.diets,
    occasions: spoonacularRecipe.occasions,
    summary: spoonacularRecipe.summary,
    instructions: spoonacularRecipe.instructions,
    extendedIngredients: spoonacularRecipe.extendedIngredients?.map(ingredient => ({
      id: ingredient.id,
      name: ingredient.name,
      nameClean: ingredient.nameClean,
      original: ingredient.original,
      originalName: ingredient.originalName,
      amount: ingredient.amount,
      unit: ingredient.unit,
      image: ingredient.image,
      aisle: ingredient.aisle,
      consistency: ingredient.consistency,
      meta: ingredient.meta,
      measures: ingredient.measures,
    })),
  };
}

// 🔍 SEARCH RECIPES
export async function searchRecipes(params: RecipeSearchParams): Promise<ApiResponse<SearchResult>> {
  try {
    const searchParams = {
      query: params.query,
      number: params.number || 12,
      offset: params.offset || 0,
      addRecipeInformation: true,
      fillIngredients: false, // Reduced for faster loading
      sort: 'popularity', // Sort by popularity for better results
      sortDirection: 'desc',
      ...(params.cuisine && { cuisine: params.cuisine }),
      ...(params.diet && { diet: params.diet }),
      ...(params.intolerances && { intolerances: params.intolerances }),
      ...(params.type && { type: params.type }),
    };

    console.log('🍳 Searching recipes with params:', searchParams);
    const data = await makeApiRequest('/recipes/complexSearch', searchParams) as SpoonacularSearchResult;

    // Convert recipes to our format
    const convertedRecipes = data.results.map(recipe => convertRecipe(recipe));

    return {
      success: true,
      data: {
        recipes: convertedRecipes,
        offset: data.offset,
        number: data.number,
        totalResults: data.totalResults,
      },
    };
  } catch (error: any) {
    console.error('❌ Search recipes failed:', error.message);
    return {
      success: false,
      data: { recipes: [], offset: 0, number: 0, totalResults: 0 },
      message: error.message,
    };
  }
}

// 📖 GET RECIPE BY ID
export async function getRecipeById(id: number): Promise<ApiResponse<Recipe>> {
  try {
    const data = await makeApiRequest(`/recipes/${id}/information`, {
      includeNutrition: true,
    }) as SpoonacularRecipeDetail;

    return {
      success: true,
      data: convertRecipe(data),
    };
  } catch (error: any) {
    return {
      success: false,
      data: {} as Recipe,
      message: error.message,
    };
  }
}

// 💡 GET SEARCH SUGGESTIONS
export async function getAutocompleteSuggestions(query: string, number: number = 10): Promise<ApiResponse<string[]>> {
  try {
    const data = await makeApiRequest('/recipes/autocomplete', {
      query,
      number,
    }) as {title: string}[];

    const suggestions = data.map(item => item.title);

    return {
      success: true,
      data: suggestions,
    };
  } catch (error: any) {
    return {
      success: false,
      data: [],
      message: error.message,
    };
  }
}

// 🎲 GET RANDOM RECIPES
export async function getRandomRecipes(number: number = 6, tags?: string): Promise<ApiResponse<Recipe[]>> {
  try {
    const params: any = { number };
    if (tags) params.tags = tags;

    const data = await makeApiRequest('/recipes/random', params) as {recipes: SpoonacularRecipe[]};

    const convertedRecipes = data.recipes.map(recipe => convertRecipe(recipe));

    return {
      success: true,
      data: convertedRecipes,
    };
  } catch (error: any) {
    return {
      success: false,
      data: [],
      message: error.message,
    };
  }
}

// 🥕 FIND RECIPES BY INGREDIENTS
export async function findRecipesByIngredients(
  ingredients: string[], 
  number: number = 12,
  ranking: number = 1,
  ignorePantry: boolean = true
): Promise<ApiResponse<Recipe[]>> {
  try {
    const data = await makeApiRequest('/recipes/findByIngredients', {
      ingredients: ingredients.join(',+'),
      number,
      ranking,
      ignorePantry,
    }) as SpoonacularRecipe[];

    const convertedRecipes = data.map(recipe => convertRecipe(recipe));

    return {
      success: true,
      data: convertedRecipes,
    };
  } catch (error: any) {
    return {
      success: false,
      data: [],
      message: error.message,
    };
  }
}

// 🌍 GET AVAILABLE CUISINES
export async function getCuisines(): Promise<ApiResponse<string[]>> {
  // Static list - no API call needed
  const cuisines = [
    'African', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 
    'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian', 
    'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American', 
    'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern', 
    'Spanish', 'Thai', 'Vietnamese'
  ];

  return {
    success: true,
    data: cuisines,
  };
}

// 🥗 GET DIET TYPES
export async function getDietTypes(): Promise<ApiResponse<string[]>> {
  // Static list - no API call needed
  const diets = [
    'Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 
    'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 
    'Low FODMAP', 'Whole30'
  ];

  return {
    success: true,
    data: diets,
  };
}

// 🍽️ GET MEAL TYPES
export async function getMealTypes(): Promise<ApiResponse<string[]>> {
  // Static list - no API call needed
  const mealTypes = [
    'main course', 'side dish', 'dessert', 'appetizer', 'salad', 
    'bread', 'breakfast', 'soup', 'beverage', 'sauce', 'marinade', 
    'fingerfood', 'snack', 'drink'
  ];

  return {
    success: true,
    data: mealTypes,
  };
}

// 🩺 CHECK API CONNECTION
export async function checkApiHealth(): Promise<boolean> {
  try {
    await makeApiRequest('/recipes/random', { number: 1 });
    return true;
  } catch {
    return false;
  }
}

// Export all functions for easy importing
export default {
  searchRecipes,
  getRecipeById,
  getAutocompleteSuggestions,
  getRandomRecipes,
  findRecipesByIngredients,
  getCuisines,
  getDietTypes,
  getMealTypes,
  checkApiHealth,
};
