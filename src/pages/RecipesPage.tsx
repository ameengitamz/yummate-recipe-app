import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Card, Input, Button, Badge, RecipeCard, EmptyState } from '../components';
import { useSearch } from '../hooks/useSearch';

const RecipesPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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
    clearError
  } = useSearch();

  // Search on page load only if there's a query parameter
  useEffect(() => {
    if (initialQuery) {
      search({ query: initialQuery, number: 12 });
    }
    // No default search - start with empty state
  }, [initialQuery, search]);

  // Handle search when user clicks search button
  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Clear any existing error before starting new search
      clearError();
      search({ 
        query: searchQuery.trim(),
        number: 12
      });
    }
  };

  const categories = ['all', 'Italian', 'Indian', 'Healthy', 'British', 'Japanese', 'American'];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

  // Use only API recipes - no fallback to static recipes
  const displayRecipes = recipes;

  // Filter recipes based on search and filters (duplicates already handled in hook)
  const filteredRecipes = displayRecipes.filter((recipe) => {
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
    navigate(`/recipes/${id}`);
  };

  const handleAddToPlanner = (_id: string) => {
    // TODO: Implement add to planner functionality
  };

  return (
    <div className="w-full py-8">
      <Container>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-5 text-yum-primary-ec drop-shadow-lg yum-text-shadow-strong">
          Recipe Collection 🍳
        </h1>
        <p className="text-xl text-yum-text-primary">
          {initialQuery 
            ? `Search results for "${initialQuery}"` 
            : 'Discover and explore our complete collection of delicious recipes'
          }
        </p>
      </div>

      {/* Search and Filters */}
      <Card variant="elevated" className="mb-8">
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="flex gap-4">
            <Input
              variant="search"
              placeholder="Search for recipes... Try 'pasta', 'chicken curry', or 'chocolate cake'"
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
            <div className="text-sm text-yum-text-secondary">
              Found {totalResults || recipes.length} recipes {searchQuery && `for "${searchQuery}"`}
              {recipes.length > 0 && (
                <span className="ml-2 text-xs text-yum-neutral">
                  (Showing {displayRecipes.length} loaded)
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

          {/* Filter Row - only show when there are recipes or user has searched */}
          {(recipes.length > 0 || searchQuery || isLoading) && (
            <>
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
              <div className="pt-4 border-t border-yum-neutral-light">
                <p className="text-yum-text-primary">
                  {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
                </p>
              </div>
            </>
          )}
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
                  {isLoading ? 'Loading more recipes...' : 'Load More Recipes'}
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
              <p className="text-sm text-yum-text-secondary">
                🎉 You've seen all {totalResults} recipes for this search!
              </p>
            </div>
          )}
          
          {/* All results loaded message */}
          {recipes.length > 0 && !hasMore && totalResults === recipes.length && totalResults > 12 && (
            <div className="text-center mt-8">
              <p className="text-sm text-yum-text-secondary">
                ✨ All {totalResults} recipes loaded!
              </p>
            </div>
          )}
        </>
      ) : (
        <Card variant="elevated">
          <EmptyState
            icon="🔍"
            title={recipes.length === 0 && !isLoading && !searchQuery ? "Ready to discover recipes?" : "No recipes found"}
            description={recipes.length === 0 && !isLoading && !searchQuery 
              ? "Search for your favorite dishes, ingredients, or cuisines to get started!"
              : "Try adjusting your search criteria or browse different categories."
            }
            action={{
              label: recipes.length === 0 && !isLoading && !searchQuery ? "Search Recipes" : "Clear Filters",
              onClick: () => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
                // Note: This will show empty state until user searches
              }
            }}
          />
        </Card>
      )}
      </Container>
    </div>
  );
};

export default RecipesPage;
