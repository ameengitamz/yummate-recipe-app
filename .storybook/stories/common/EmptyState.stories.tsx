import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from '../../../src/components/common/EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Common/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A component for displaying empty states with an icon, title, description, and optional action button.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: { type: 'text' },
      description: 'Icon or emoji to display',
    },
    title: {
      control: { type: 'text' },
      description: 'Main title text',
    },
    description: {
      control: { type: 'text' },
      description: 'Description text',
    },
    action: {
      control: { type: 'object' },
      description: 'Action button configuration',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: '🍽️',
    title: 'No recipes found',
    description: 'Try adjusting your search criteria or browse our featured recipes.',
    action: {
      label: 'Browse Recipes',
      onClick: () => alert('Browse recipes clicked!'),
    },
  },
};

export const WithoutIcon: Story = {
  args: {
    title: 'Welcome to Your Recipe Collection',
    description: 'Start by adding your first recipe to get cooking!',
    action: {
      label: 'Add Recipe',
      onClick: () => alert('Add recipe clicked!'),
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state without an icon.',
      },
    },
  },
};

export const WithoutAction: Story = {
  args: {
    icon: '😔',
    title: 'Something went wrong',
    description: 'We couldn\'t load your recipes right now. Please try again later.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state without an action button.',
      },
    },
  },
};

export const SearchResults: Story = {
  args: {
    icon: '🔍',
    title: 'No search results',
    description: 'We couldn\'t find any recipes matching your search. Try different keywords or browse our popular recipes.',
    action: {
      label: 'Clear Search',
      onClick: () => alert('Search cleared!'),
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state for search results.',
      },
    },
  },
};

export const FavoritesEmpty: Story = {
  args: {
    icon: '❤️',
    title: 'No favorite recipes yet',
    description: 'Start building your collection by marking recipes as favorites.',
    action: {
      label: 'Discover Recipes',
      onClick: () => alert('Discover recipes clicked!'),
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state for favorites page.',
      },
    },
  },
};

export const MealPlannerEmpty: Story = {
  args: {
    icon: '📅',
    title: 'No meals planned',
    description: 'Plan your weekly meals to stay organized and make grocery shopping easier.',
    action: {
      label: 'Plan Meals',
      onClick: () => alert('Plan meals clicked!'),
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state for meal planner.',
      },
    },
  },
};

export const GroceryListEmpty: Story = {
  args: {
    icon: '🛒',
    title: 'Your grocery list is empty',
    description: 'Add ingredients from recipes to create your shopping list.',
    action: {
      label: 'Browse Recipes',
      onClick: () => alert('Browse recipes clicked!'),
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state for grocery list.',
      },
    },
  },
};

export const ErrorState: Story = {
  args: {
    icon: '⚠️',
    title: 'Unable to load content',
    description: 'There was a problem loading this page. Check your internet connection and try again.',
    action: {
      label: 'Retry',
      onClick: () => alert('Retry clicked!'),
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state for error scenarios.',
      },
    },
  },
};

export const AllEmptyStates: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
      <div className="border rounded-lg p-4">
        <EmptyState
          icon="🍽️"
          title="No recipes found"
          description="Try adjusting your search criteria."
          action={{
            label: 'Browse Recipes',
            onClick: () => {},
          }}
        />
      </div>
      <div className="border rounded-lg p-4">
        <EmptyState
          icon="❤️"
          title="No favorites yet"
          description="Start building your collection."
          action={{
            label: 'Discover Recipes',
            onClick: () => {},
          }}
        />
      </div>
      <div className="border rounded-lg p-4">
        <EmptyState
          icon="📅"
          title="No meals planned"
          description="Plan your weekly meals."
          action={{
            label: 'Plan Meals',
            onClick: () => {},
          }}
        />
      </div>
      <div className="border rounded-lg p-4">
        <EmptyState
          icon="⚠️"
          title="Unable to load"
          description="Check your connection."
          action={{
            label: 'Retry',
            onClick: () => {},
          }}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'All empty state variations in different contexts.',
      },
    },
  },
};
