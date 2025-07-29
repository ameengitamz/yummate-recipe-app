import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../../src/components/ui/Badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A small status indicator component with multiple variants and sizes. Perfect for tags, labels, and status indicators.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Badge color variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    children: {
      control: { type: 'text' },
      description: 'Badge content',
    },
    onClick: {
      description: 'Click handler (makes badge clickable)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Badge',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All badge variants displayed together.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All badge sizes displayed together.',
      },
    },
  },
};

export const Clickable: Story = {
  render: () => (
    <div className="flex gap-3">
      <Badge onClick={() => alert('Badge clicked!')}>
        Clickable Badge
      </Badge>
      <Badge>
        Non-clickable Badge
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of clickable and non-clickable badges.',
      },
    },
  },
};

export const RecipeTags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 max-w-md">
      <Badge variant="success" size="sm">Vegetarian</Badge>
      <Badge variant="info" size="sm">Quick</Badge>
      <Badge variant="warning" size="sm">Spicy</Badge>
      <Badge variant="primary" size="sm">Italian</Badge>
      <Badge variant="secondary" size="sm">Low Carb</Badge>
      <Badge variant="success" size="sm">Healthy</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of badges used as recipe tags.',
      },
    },
  },
};

export const StatusIndicators: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Recipe Status:</span>
        <Badge variant="success">Published</Badge>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Preparation:</span>
        <Badge variant="warning">In Progress</Badge>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Review:</span>
        <Badge variant="info">Pending</Badge>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Error:</span>
        <Badge variant="error">Failed</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges used as status indicators.',
      },
    },
  },
};

export const DifficultyLevels: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium w-20">Easy:</span>
        <Badge variant="success" size="sm">Beginner</Badge>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium w-20">Medium:</span>
        <Badge variant="warning" size="sm">Intermediate</Badge>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium w-20">Hard:</span>
        <Badge variant="error" size="sm">Advanced</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges representing recipe difficulty levels.',
      },
    },
  },
};

export const CuisineTypes: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-3 max-w-md">
      <Badge variant="primary" size="sm">Italian</Badge>
      <Badge variant="secondary" size="sm">Chinese</Badge>
      <Badge variant="info" size="sm">Mexican</Badge>
      <Badge variant="primary" size="sm">Indian</Badge>
      <Badge variant="secondary" size="sm">French</Badge>
      <Badge variant="info" size="sm">Thai</Badge>
      <Badge variant="primary" size="sm">Japanese</Badge>
      <Badge variant="secondary" size="sm">Greek</Badge>
      <Badge variant="info" size="sm">American</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges representing different cuisine types.',
      },
    },
  },
};

export const WithNumbers: Story = {
  render: () => (
    <div className="flex gap-3">
      <Badge variant="primary">🕐 30 min</Badge>
      <Badge variant="success">👥 4 servings</Badge>
      <Badge variant="info">⭐ 4.8</Badge>
      <Badge variant="warning">🔥 350°F</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges with numbers and icons for recipe metrics.',
      },
    },
  },
};
