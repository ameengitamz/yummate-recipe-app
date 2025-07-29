import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Introduction',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Welcome: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <img 
            src="/yummate-logo.png" 
            alt="YumMate Logo" 
            className="w-16 h-16" 
          />
          <h1 className="text-4xl font-bold text-orange-600">YumMate Design System</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A comprehensive component library for the YumMate recipe application. 
          Built with React, TypeScript, and Tailwind CSS.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-3xl mb-4">🎨</div>
          <h3 className="text-lg font-semibold mb-2">Design System</h3>
          <p className="text-gray-600 text-sm">
            Consistent visual language with color schemes, typography, and spacing guidelines.
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-3xl mb-4">🧩</div>
          <h3 className="text-lg font-semibold mb-2">Reusable Components</h3>
          <p className="text-gray-600 text-sm">
            Modular components with consistent APIs, props, and behavior patterns.
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-3xl mb-4">📱</div>
          <h3 className="text-lg font-semibold mb-2">Responsive Design</h3>
          <p className="text-gray-600 text-sm">
            Mobile-first approach with components that work across all device sizes.
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-3xl mb-4">⚡</div>
          <h3 className="text-lg font-semibold mb-2">Performance</h3>
          <p className="text-gray-600 text-sm">
            Optimized components with efficient rendering and minimal bundle impact.
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-3xl mb-4">♿</div>
          <h3 className="text-lg font-semibold mb-2">Accessibility</h3>
          <p className="text-gray-600 text-sm">
            WCAG compliant components with proper ARIA attributes and keyboard navigation.
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-3xl mb-4">🔧</div>
          <h3 className="text-lg font-semibold mb-2">Developer Experience</h3>
          <p className="text-gray-600 text-sm">
            TypeScript support, comprehensive documentation, and interactive examples.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Component Categories</h2>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3 text-orange-800">🎛️ UI Components</h3>
            <p className="text-orange-700 mb-4">
              Basic building blocks for user interfaces including buttons, inputs, cards, and badges.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm">Button</span>
              <span className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm">Input</span>
              <span className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm">Card</span>
              <span className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm">Badge</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3 text-blue-800">🏗️ Common Components</h3>
            <p className="text-blue-700 mb-4">
              Specialized components for specific functionality like loading states, recipe cards, and empty states.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">LoadingSpinner</span>
              <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">RecipeCard</span>
              <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">EmptyState</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Getting Started</h2>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Using Components</h3>
          <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <div className="text-green-400 mb-2">// Import components from the index</div>
            <div>import &#123; Button, Card, LoadingSpinner &#125; from '../components';</div>
            <div className="mt-4 text-green-400">// Use components with TypeScript support</div>
            <div>&lt;Button variant="primary" size="lg" onClick=&#123;handleClick&#125;&gt;</div>
            <div className="ml-4">Click me!</div>
            <div>&lt;/Button&gt;</div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Explore the Components</h3>
        <p className="text-gray-600 mb-6">
          Use the sidebar to browse through all available components, see their variants, 
          and interact with their properties using the controls panel.
        </p>
        <div className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg">
          <span>🚀</span>
          <span className="font-semibold">Happy Building!</span>
        </div>
      </div>
    </div>
  ),
};
