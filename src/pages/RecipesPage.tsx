import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Card, Input, Button, Badge, RecipeCard, EmptyState } from '../components';
import { useSearch } from '../hooks/useSearch';

const RecipesPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('search') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Use the API search hook
  const {
    recipes,
    isLoading,
    error,
    search,
    totalResults,
    hasMore,
    loadMore,
    clearError,
    clearResults
  } = useSearch();

  // Search on page load if there's a query parameter
  useEffect(() => {
    if (initialQuery) {
      console.log('🔍 Performing initial search for:', initialQuery);
      search({ query: initialQuery, number: 12 });
    }
  }, [initialQuery, search]);

  // Handle search when user clicks search button
  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('🔍 Searching for:', searchQuery);
      // Clear any existing error before starting new search
      clearError();
      search({ 
        query: searchQuery.trim(),
        number: 12
      });
    }
  };

  // Sample recipes data
  const staticRecipes = [
    {
      id: '1',
      title: 'Creamy Pasta Carbonara',
      cookingTime: 30,
      servings: 4,
      difficulty: 'Easy' as const,
      cuisine: 'Italian',
    },
    {
      id: '2',
      title: 'Spicy Chicken Curry',
      cookingTime: 45,
      servings: 6,
      difficulty: 'Medium' as const,
      cuisine: 'Indian',
    },
    {
      id: '3',
      title: 'Fresh Garden Salad Bowl',
      cookingTime: 15,
      servings: 2,
      difficulty: 'Easy' as const,
      cuisine: 'Healthy',
    },
    {
      id: '4',
      title: 'Beef Wellington',
      cookingTime: 120,
      servings: 8,
      difficulty: 'Hard' as const,
      cuisine: 'British',
    },
    {
      id: '5',
      title: 'Sushi Roll Platter',
      cookingTime: 60,
      servings: 4,
      difficulty: 'Medium' as const,
      cuisine: 'Japanese',
    },
    {
      id: '6',
      title: 'Classic Pancakes',
      cookingTime: 20,
      servings: 4,
      difficulty: 'Easy' as const,
      cuisine: 'American',
    },
  ];

  const categories = ['all', 'Italian', 'Indian', 'Healthy', 'British', 'Japanese', 'American'];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

  // Use API recipes if available, otherwise fallback to static recipes for demo
  const displayRecipes = recipes.length > 0 ? recipes : staticRecipes;

  // Remove duplicates based on recipe ID to prevent duplicate display
  const uniqueDisplayRecipes = displayRecipes.filter((recipe, index, self) => 
    index === self.findIndex((r) => r.id === recipe.id)
  );

  // Filter recipes based on search and filters
  const filteredRecipes = uniqueDisplayRecipes.filter((recipe) => {
    const matchesSearch = !searchQuery || 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (recipe.cuisine && recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || recipe.cuisine === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Handle Enter key press for search
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleRecipeView = (id: string) => {
    console.log('Navigate to recipe:', id);
  };

  const handleAddToPlanner = (id: string) => {
    console.log('Add to planner:', id);
  };

  return (
    <Container>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-yum-primary-ec mb-4">
          Recipe Collection 🍳
        </h1>
        <p className="text-xl text-yum-secondary">
          Discover and explore our complete collection of delicious recipes
        </p>
      </div>

      {/* Search and Filters */}
      <Card variant="elevated" className="mb-8">
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="flex gap-4">
            <Input
              variant="search"
              placeholder="Search recipes, ingredients, or cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              leftIcon="🔍"
              className="flex-1"
            />
            <Button 
              variant="primary"
              onClick={handleSearch}
              isLoading={isLoading}
              disabled={!searchQuery.trim()}
            >
              Search
            </Button>
          </div>

          {/* Show search results count for API results */}
          {recipes.length > 0 && (
            <div className="text-sm text-yum-secondary">
              Found {totalResults || recipes.length} recipes {searchQuery && `for "${searchQuery}"`}
              {recipes.length > 0 && (
                <span className="ml-2 text-xs text-yum-neutral">
                  (Showing {uniqueDisplayRecipes.length} unique)
                </span>
              )}
            </div>
          )}

          {/* Show error if any */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">❌ {error}</p>
              <Button variant="secondary" size="sm" onClick={clearError} className="mt-2">
                Try Again
              </Button>
            </div>
          )}

          {/* Filter Row */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-yum-primary-ec mb-2">
                Cuisine Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? 'primary' : 'info'}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'all' ? 'All Cuisines' : category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-yum-primary-ec mb-2">
                Difficulty Level
              </label>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <Badge
                    key={difficulty}
                    variant={selectedDifficulty === difficulty ? 'primary' : 
                            difficulty === 'Easy' ? 'success' :
                            difficulty === 'Medium' ? 'warning' :
                            difficulty === 'Hard' ? 'error' : 'info'}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedDifficulty(difficulty)}
                  >
                    {difficulty === 'all' ? 'All Levels' : difficulty}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Results Counter */}
          <div className="flex justify-between items-center pt-4 border-t border-yum-neutral-light">
            <p className="text-yum-secondary">
              {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
            </p>
            <Button variant="outline" size="sm">
              Sort by: Newest
            </Button>
          </div>
        </div>
      </Card>

      {/* Results */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : filteredRecipes.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                {...recipe}
                onViewDetails={handleRecipeView}
                onAddToPlanner={handleAddToPlanner}
              />
            ))}
          </div>
          
          {/* Load More Button - only show for API results */}
          {hasMore && recipes.length > 0 && (
            <div className="text-center mt-8">
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  onClick={loadMore}
                  isLoading={isLoading}
                  disabled={isLoading || !hasMore}
                >
                  {isLoading ? 'Loading...' : 'Load More Recipes'}
                </Button>
                <p className="text-xs text-yum-neutral">
                  Showing {recipes.length} of {totalResults} recipes
                </p>
              </div>
            </div>
          )}
          
          {/* No more results message */}
          {recipes.length > 0 && !hasMore && totalResults > recipes.length && (
            <div className="text-center mt-8">
              <p className="text-sm text-yum-secondary">
                🎉 You've seen all {totalResults} recipes for this search!
              </p>
            </div>
          )}
        </>
      ) : (
        <Card variant="elevated">
          <EmptyState
            icon="🔍"
            title="No recipes found"
            description="Try adjusting your search criteria or browse our featured recipes."
            action={{
              label: "Clear Filters",
              onClick: () => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
                clearResults(); // Clear API results to show static recipes
              }
            }}
          />
        </Card>
      )}
    </Container>
  );
};

export default RecipesPage;
