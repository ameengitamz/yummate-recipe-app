import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner } from '../../../src/components/common/LoadingSpinner';

const meta: Meta<typeof LoadingSpinner> = {
  title: 'Common/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A professional loading spinner with multiple variants, sizes, and customization options. Features dual-ring animation with food icon and animated dots.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the spinner',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'lg' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'fullscreen', 'inline'],
      description: 'Display variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    message: {
      control: { type: 'text' },
      description: 'Main loading message',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Loading...' },
      },
    },
    subtitle: {
      control: { type: 'text' },
      description: 'Subtitle text',
    },
    showIcon: {
      control: { type: 'boolean' },
      description: 'Show food icon in center',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showDots: {
      control: { type: 'boolean' },
      description: 'Show animated dots',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
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
    size: 'lg',
    variant: 'default',
    message: 'Loading...',
    showIcon: true,
    showDots: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Small</h3>
        <LoadingSpinner size="sm" variant="inline" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Medium</h3>
        <LoadingSpinner size="md" variant="inline" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Large</h3>
        <LoadingSpinner size="lg" variant="inline" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Extra Large</h3>
        <LoadingSpinner size="xl" variant="inline" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available sizes displayed together for comparison.',
      },
    },
  },
};

export const InlineUsage: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
        <LoadingSpinner variant="inline" size="sm" />
        <span className="text-gray-700">Loading recipes...</span>
      </div>
      <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
        <LoadingSpinner variant="inline" size="sm" showIcon={false} showDots={false} />
        Submitting...
      </button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples of inline spinner usage in different contexts.',
      },
    },
  },
};

export const RecipePageLoading: Story = {
  args: {
    size: 'xl',
    variant: 'default',
    message: 'Loading Recipe',
    subtitle: 'Preparing delicious details...',
    showIcon: true,
    showDots: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration used in recipe detail pages.',
      },
    },
  },
};

export const Fullscreen: Story = {
  args: {
    size: 'xl',
    variant: 'fullscreen',
    message: 'Loading Application',
    subtitle: 'Setting up your culinary experience...',
    showIcon: true,
    showDots: true,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Fullscreen overlay variant for page transitions.',
      },
    },
  },
};
