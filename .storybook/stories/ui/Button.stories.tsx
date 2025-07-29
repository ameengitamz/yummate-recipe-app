import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../../src/components/ui/Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and states. Features hover animations, loading states, and icon support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'outline', 'ghost'],
      description: 'Button visual style',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Button size',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    isLoading: {
      control: { type: 'boolean' },
      description: 'Show loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the button',
    },
    children: {
      control: { type: 'text' },
      description: 'Button content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button variants displayed together.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button sizes displayed together.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button leftIcon={<span>🍳</span>}>Cook Recipe</Button>
        <Button rightIcon={<span>→</span>}>Next Step</Button>
        <Button leftIcon={<span>📋</span>} rightIcon={<span>✓</span>}>Add to List</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with left icons, right icons, and both.',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button>Normal</Button>
      <Button isLoading>Loading</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different button states: normal, loading, and disabled.',
      },
    },
  },
};

export const RecipeActions: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Button variant="primary" leftIcon={<span>🔍</span>} size="lg">
          Search Recipes
        </Button>
        <Button variant="accent" leftIcon={<span>🛒</span>}>
          Add to Grocery List
        </Button>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="lg" isLoading>
          Load More Recipes
        </Button>
        <Button variant="ghost" leftIcon={<span>❤️</span>}>
          Save Favorite
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples of buttons used in the recipe application.',
      },
    },
  },
};
