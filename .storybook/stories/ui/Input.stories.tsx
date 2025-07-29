import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../../../src/components/ui/Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with labels, error states, helper text, icons, and multiple variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Input label',
    },
    error: {
      control: { type: 'text' },
      description: 'Error message',
    },
    helper: {
      control: { type: 'text' },
      description: 'Helper text',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'search', 'rounded'],
      description: 'Input visual style',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the input',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'search'],
      description: 'Input type',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const WithLabel: Story = {
  args: {
    label: 'Recipe Name',
    placeholder: 'Enter recipe name...',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email...',
    error: 'Please enter a valid email address',
    defaultValue: 'invalid-email',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const WithHelper: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password...',
    helper: 'Password must be at least 8 characters long',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Input
        variant="default"
        label="Default Input"
        placeholder="Default variant..."
      />
      <Input
        variant="search"
        label="Search Input"
        placeholder="Search recipes..."
      />
      <Input
        variant="rounded"
        label="Rounded Input"
        placeholder="Rounded variant..."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All input variants displayed together.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input
        label="Search Recipes"
        placeholder="Search..."
        leftIcon={<span>🔍</span>}
        variant="search"
      />
      <Input
        label="Email"
        placeholder="Enter email..."
        rightIcon={<span>✉️</span>}
      />
      <Input
        label="Price Range"
        placeholder="Enter amount..."
        leftIcon={<span>💰</span>}
        rightIcon={<span>USD</span>}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Inputs with left and right icons.',
      },
    },
  },
};

export const InputTypes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input
        type="text"
        label="Recipe Name"
        placeholder="Enter recipe name..."
      />
      <Input
        type="email"
        label="Email"
        placeholder="Enter email..."
      />
      <Input
        type="password"
        label="Password"
        placeholder="Enter password..."
      />
      <Input
        type="number"
        label="Servings"
        placeholder="Number of servings..."
      />
      <Input
        type="search"
        label="Search"
        placeholder="Search recipes..."
        variant="search"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different input types for various use cases.',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input
        label="Normal State"
        placeholder="Normal input..."
      />
      <Input
        label="Focused State"
        placeholder="This input is focused..."
        autoFocus
      />
      <Input
        label="Disabled State"
        placeholder="Disabled input..."
        disabled
      />
      <Input
        label="Error State"
        placeholder="Input with error..."
        error="This field is required"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different input states: normal, focused, disabled, and error.',
      },
    },
  },
};

export const RecipeForm: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Input
        label="Recipe Title"
        placeholder="Give your recipe a name..."
        leftIcon={<span>🍳</span>}
      />
      <Input
        label="Cooking Time (minutes)"
        type="number"
        placeholder="30"
        helper="Total time from start to finish"
        leftIcon={<span>⏱️</span>}
      />
      <Input
        label="Servings"
        type="number"
        placeholder="4"
        helper="Number of people this recipe serves"
        leftIcon={<span>👥</span>}
      />
      <Input
        label="Cuisine Type"
        placeholder="e.g., Italian, Mexican, Asian..."
        leftIcon={<span>🌍</span>}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of inputs used in a recipe creation form.',
      },
    },
  },
};

export const SearchExamples: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <Input
        variant="search"
        placeholder="Search for recipes..."
        leftIcon={<span>🔍</span>}
      />
      <Input
        variant="rounded"
        placeholder="Quick search..."
        leftIcon={<span>🔍</span>}
      />
      <Input
        variant="default"
        label="Advanced Search"
        placeholder="Search with filters..."
        leftIcon={<span>🔍</span>}
        rightIcon={<span>⚙️</span>}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different search input configurations.',
      },
    },
  },
};
