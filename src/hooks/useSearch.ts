import { useState, useEffect, useCallback } from 'react';
import * as spoonacularApi from '../services/spoonacularApi';
import type { Recipe, RecipeSearchParams, ApiError } from '../types/api';

interface UseSearchOptions {
  debounceMs?: number;
  minQueryLength?: number;
  autoSearch?: boolean;
}

interface SearchState {
  recipes: Recipe[];
  suggestions: string[];
  isLoading: boolean;
  isLoadingSuggestions: boolean;
  error: string | null;
  totalResults: number;
  hasMore: boolean;
  offset: number;
}

interface UseSearchReturn extends SearchState {
  search: (params: RecipeSearchParams) => Promise<void>;
  getSuggestions: (query: string) => Promise<void>;
  loadMore: () => Promise<void>;
  clearResults: () => void;
  clearError: () => void;
}

export const useSearch = (options: UseSearchOptions = {}): UseSearchReturn => {
  const {
    debounceMs = 300,
    minQueryLength = 2,
    autoSearch = false,
  } = options;

  const [state, setState] = useState<SearchState>({
    recipes: [],
    suggestions: [],
    isLoading: false,
    isLoadingSuggestions: false,
    error: null,
    totalResults: 0,
    hasMore: false,
    offset: 0,
  });

  const [lastSearchParams, setLastSearchParams] = useState<RecipeSearchParams | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Debounced search effect
  useEffect(() => {
    if (!autoSearch || !searchQuery || searchQuery.length < minQueryLength) {
      return;
    }

    const timeoutId = setTimeout(() => {
      search({ query: searchQuery, number: 9 }); // Changed to 9 recipes
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, autoSearch, minQueryLength, debounceMs]);

  const search = useCallback(async (params: RecipeSearchParams, append = false) => {
    try {
      // Get current offset for pagination
      let currentOffset = 0;
      
      setState(prev => {
        // For append (load more), use current offset
        // For new search, start from 0
        currentOffset = append ? prev.recipes.length : 0;
        return {
          ...prev,
          isLoading: true,
          error: null,
          ...(append ? {} : { recipes: [], offset: 0 }),
        };
      });

      const searchParams = {
        ...params,
        offset: currentOffset,
        number: params.number || 9,
      };

      const result = await spoonacularApi.searchRecipes(searchParams);

      if (result.success && result.data.recipes.length > 0) {
        setState(prev => {
          // For append, merge new recipes with existing ones
          // Use a Set to prevent duplicates based on recipe ID
          const existingIds = new Set(prev.recipes.map(r => r.id));
          const newUniqueRecipes = result.data.recipes.filter(recipe => !existingIds.has(recipe.id));
          
          const finalRecipes = append ? [...prev.recipes, ...newUniqueRecipes] : result.data.recipes;
          
          return {
            ...prev,
            recipes: finalRecipes,
            totalResults: result.data.totalResults,
            offset: finalRecipes.length, // Use actual recipe count as offset
            hasMore: finalRecipes.length < result.data.totalResults,
            isLoading: false,
            error: null,
          };
        });

        // Store search params for loadMore
        setLastSearchParams({ ...params, number: params.number || 9 });
      } else if (result.success && result.data.recipes.length === 0) {
        // No more recipes available
        setState(prev => ({
          ...prev,
          isLoading: false,
          hasMore: false,
          error: null,
        }));
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: result.message || 'Search failed',
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: (error as ApiError).message || 'An unexpected error occurred',
      }));
    }
  }, []);

  const getSuggestions = useCallback(async (query: string) => {
    if (query.length < minQueryLength) {
      setState(prev => ({ ...prev, suggestions: [] }));
      return;
    }

    try {
      setState(prev => ({
        ...prev,
        isLoadingSuggestions: true,
      }));

      const result = await spoonacularApi.getAutocompleteSuggestions(query, 6);

      setState(prev => ({
        ...prev,
        suggestions: result.success ? result.data : [],
        isLoadingSuggestions: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        suggestions: [],
        isLoadingSuggestions: false,
      }));
    }
  }, [minQueryLength]);

  const loadMore = useCallback(async () => {
    // Check if we can load more
    let canLoadMore = false;
    
    setState(prev => {
      canLoadMore = !prev.isLoading && prev.hasMore && lastSearchParams !== null;
      return prev;
    });

    if (!canLoadMore || !lastSearchParams) {
      return;
    }

    // Call search with append=true to add more recipes
    await search(lastSearchParams, true);
  }, [lastSearchParams, search]);

  const clearResults = useCallback(() => {
    setState(prev => ({
      ...prev,
      recipes: [],
      suggestions: [],
      error: null,
      totalResults: 0,
      hasMore: false,
      offset: 0,
    }));
    setLastSearchParams(null);
    setSearchQuery('');
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Set search query for auto-search
  const setQuery = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return {
    ...state,
    search,
    getSuggestions,
    loadMore,
    clearResults,
    clearError,
    // Additional utility
    setQuery: autoSearch ? setQuery : undefined,
  } as UseSearchReturn & { setQuery?: (query: string) => void };
};

// Hook for popular/trending suggestions (static to save API calls)
export const usePopularSuggestions = () => {
  const [suggestions] = useState<string[]>([
    'Italian Pasta',
    'Healthy Breakfast', 
    'Quick Dinner',
    'Vegan Recipes',
    'Chicken Curry',
    'Chocolate Dessert',
    'Mediterranean',
    'Asian Stir Fry'
  ]);

  // No API calls - using curated popular suggestions to save API quota
  return {
    suggestions,
    isLoading: false,
    refresh: () => {}, // No-op function to maintain interface
  };
};

// Hook for recipe statistics (using static data to conserve API quota)
export const useRecipeStats = () => {
  const [stats] = useState({
    totalRecipes: '300K+',
    cuisines: '26+',      // Known count from Spoonacular documentation
    dietTypes: '11+',     // Known count from Spoonacular documentation  
    nutritionData: '100%',
  });

  // Using static data to avoid unnecessary API calls
  // The actual numbers are well-documented by Spoonacular
  return {
    stats,
    isLoading: false,
    refresh: () => {}, // No-op function to maintain interface
  };
};

export default useSearch;
