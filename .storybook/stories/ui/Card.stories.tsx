import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../../../src/components/ui/Card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible card component with multiple variants, hover effects, and padding options. Perfect for displaying content in containers.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'outlined', 'gradient'],
      description: 'Card visual style',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    hover: {
      control: { type: 'boolean' },
      description: 'Enable hover effects',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Internal padding',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    children: {
      control: { type: 'text' },
      description: 'Card content',
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
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Recipe Card</h3>
        <p className="text-gray-600">A delicious recipe awaits your discovery.</p>
      </div>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-4xl">
      <Card variant="default" padding="lg">
        <h3 className="font-semibold mb-2">Default Card</h3>
        <p className="text-sm text-gray-600">Standard card with subtle border.</p>
      </Card>
      <Card variant="elevated" padding="lg">
        <h3 className="font-semibold mb-2">Elevated Card</h3>
        <p className="text-sm text-gray-600">Card with shadow for depth.</p>
      </Card>
      <Card variant="outlined" padding="lg">
        <h3 className="font-semibold mb-2">Outlined Card</h3>
        <p className="text-sm text-gray-600">Card with prominent border.</p>
      </Card>
      <Card variant="gradient" padding="lg">
        <h3 className="font-semibold mb-2">Gradient Card</h3>
        <p className="text-sm text-gray-600">Card with gradient background.</p>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All card variants displayed together.',
      },
    },
  },
};

export const WithHover: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card hover padding="lg">
        <h3 className="font-semibold mb-2">Hover Me!</h3>
        <p className="text-sm text-gray-600">This card has hover effects enabled.</p>
      </Card>
      <Card padding="lg">
        <h3 className="font-semibold mb-2">No Hover</h3>
        <p className="text-sm text-gray-600">This card has no hover effects.</p>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of cards with and without hover effects.',
      },
    },
  },
};

export const PaddingVariations: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Card padding="sm" variant="outlined">
        <div className="text-sm">Small padding</div>
      </Card>
      <Card padding="md" variant="outlined">
        <div className="text-sm">Medium padding</div>
      </Card>
      <Card padding="lg" variant="outlined">
        <div className="text-sm">Large padding</div>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different padding options for various use cases.',
      },
    },
  },
};

export const RecipeCard: Story = {
  render: () => (
    <Card variant="elevated" hover padding="none" className="max-w-sm">
      <img 
        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=250&fit=crop" 
        alt="Recipe" 
        className="w-full h-48 object-cover rounded-t-2xl"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">Delicious Pasta</h3>
        <p className="text-gray-600 text-sm mb-3">
          A mouth-watering pasta dish that will make your taste buds dance.
        </p>
        <div className="flex justify-between items-center">
          <span className="text-orange-500 font-semibold">30 mins</span>
          <span className="text-green-500 font-semibold">4 servings</span>
        </div>
      </div>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of a recipe card with image and details.',
      },
    },
  },
};

export const ContentCard: Story = {
  render: () => (
    <Card variant="gradient" padding="xl" className="max-w-md">
      <div className="text-center">
        <div className="text-4xl mb-4">🍳</div>
        <h2 className="text-xl font-bold mb-2">Start Cooking!</h2>
        <p className="text-gray-600 mb-4">
          Discover thousands of recipes from around the world and start your culinary journey today.
        </p>
        <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
          Browse Recipes
        </button>
      </div>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of a content card with call-to-action.',
      },
    },
  },
};
