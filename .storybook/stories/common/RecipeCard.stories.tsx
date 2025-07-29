import type { Meta, StoryObj } from '@storybook/react';
import { RecipeCard } from '../../../src/components/common/RecipeCard';

const meta: Meta<typeof RecipeCard> = {
  title: 'Common/RecipeCard',
  component: RecipeCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A specialized card component for displaying recipe information including image, title, cooking time, servings, and actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: { type: 'text' },
      description: 'Unique recipe identifier',
    },
    title: {
      control: { type: 'text' },
      description: 'Recipe title',
    },
    image: {
      control: { type: 'text' },
      description: 'Recipe image URL',
    },
    cookingTime: {
      control: { type: 'number' },
      description: 'Cooking time in minutes',
    },
    servings: {
      control: { type: 'number' },
      description: 'Number of servings',
    },
    difficulty: {
      control: { type: 'select' },
      options: ['Easy', 'Medium', 'Hard'],
      description: 'Recipe difficulty level',
    },
    cuisine: {
      control: { type: 'text' },
      description: 'Cuisine type',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop';

export const Default: Story = {
  args: {
    id: '1',
    title: 'Delicious Pasta Carbonara',
    image: sampleImage,
    cookingTime: 30,
    servings: 4,
    difficulty: 'Medium',
    cuisine: 'Italian',
  },
};

export const WithoutImage: Story = {
  args: {
    id: '2',
    title: 'Quick Vegetable Stir Fry',
    cookingTime: 15,
    servings: 2,
    difficulty: 'Easy',
    cuisine: 'Asian',
  },
  parameters: {
    docs: {
      description: {
        story: 'Recipe card without an image shows a placeholder.',
      },
    },
  },
};

export const LongTitle: Story = {
  args: {
    id: '3',
    title: 'Grandmother\'s Secret Recipe for the Most Incredible Chocolate Chip Cookies You\'ve Ever Tasted',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop',
    cookingTime: 45,
    servings: 24,
    difficulty: 'Easy',
    cuisine: 'American',
  },
  parameters: {
    docs: {
      description: {
        story: 'How the card handles long recipe titles.',
      },
    },
  },
};

export const DifficultyLevels: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
      <RecipeCard
        id="easy"
        title="Simple Green Salad"
        image="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop"
        cookingTime={10}
        servings={2}
        difficulty="Easy"
        cuisine="Mediterranean"
      />
      <RecipeCard
        id="medium"
        title="Beef Stir Fry"
        image="https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop"
        cookingTime={25}
        servings={4}
        difficulty="Medium"
        cuisine="Asian"
      />
      <RecipeCard
        id="hard"
        title="Beef Wellington"
        image="https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&h=300&fit=crop"
        cookingTime={120}
        servings={6}
        difficulty="Hard"
        cuisine="British"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Recipe cards showing different difficulty levels.',
      },
    },
  },
};

export const InteractiveCard: Story = {
  args: {
    id: '4',
    title: 'Spicy Thai Curry',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop',
    cookingTime: 40,
    servings: 4,
    difficulty: 'Medium',
    cuisine: 'Thai',
    onViewDetails: (id: string) => alert(`Viewing details for recipe ${id}`),
    onAddToPlanner: (id: string) => alert(`Added recipe ${id} to meal planner`),
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive recipe card with working action buttons.',
      },
    },
  },
};

export const RecipeGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      {[
        {
          id: '1',
          title: 'Margherita Pizza',
          image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
          cookingTime: 20,
          servings: 2,
          difficulty: 'Easy' as const,
          cuisine: 'Italian',
        },
        {
          id: '2',
          title: 'Chicken Teriyaki',
          image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop',
          cookingTime: 35,
          servings: 4,
          difficulty: 'Medium' as const,
          cuisine: 'Japanese',
        },
        {
          id: '3',
          title: 'Fish and Chips',
          image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=400&h=300&fit=crop',
          cookingTime: 45,
          servings: 3,
          difficulty: 'Medium' as const,
          cuisine: 'British',
        },
        {
          id: '4',
          title: 'Caesar Salad',
          image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
          cookingTime: 15,
          servings: 4,
          difficulty: 'Easy' as const,
          cuisine: 'Mediterranean',
        },
        {
          id: '5',
          title: 'Beef Tacos',
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
          cookingTime: 30,
          servings: 6,
          difficulty: 'Easy' as const,
          cuisine: 'Mexican',
        },
        {
          id: '6',
          title: 'Chocolate Soufflé',
          image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
          cookingTime: 60,
          servings: 4,
          difficulty: 'Hard' as const,
          cuisine: 'French',
        },
      ].map((recipe) => (
        <RecipeCard key={recipe.id} {...recipe} />
      ))}
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Example of multiple recipe cards in a grid layout.',
      },
    },
  },
};
