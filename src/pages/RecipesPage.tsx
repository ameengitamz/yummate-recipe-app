import { useState } from 'react';
import { Container, Card, Input, Button, Badge, RecipeCard, EmptyState } from '../components';

const RecipesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Sample recipes data
  const recipes = [
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

  // Filter recipes based on search and filters
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || recipe.cuisine === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

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
          <Input
            variant="search"
            placeholder="Search recipes, ingredients, or cuisines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon="🔍"
          />

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
      {filteredRecipes.length > 0 ? (
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
              }
            }}
          />
        </Card>
      )}

      {/* Load More Button */}
      {filteredRecipes.length > 0 && filteredRecipes.length >= 6 && (
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Recipes
          </Button>
        </div>
      )}
    </Container>
  );
};

export default RecipesPage;
