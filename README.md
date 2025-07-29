# 🍳 YumMate - AI-Powered Recipe Discovery

> Your ultimate culinary companion with 300,000+ recipes, smart meal planning, and personalized nutrition insights

![YumMate](public/yummate-logo.png)

## 🌟 Features

### 🔍 Smart Recipe Discovery
- Browse 300,000+ recipes from Spoonacular API
- AI-powered search with intelligent filters
- Filter by cuisine, diet, allergies, and cooking time
- Real-time search suggestions
- Interactive step-by-step cooking instructions
- Recipe scaling for any number of servings

### 🥗 Nutrition Intelligence
- Detailed nutrition analysis for every recipe
- Health scores and dietary recommendations
- Calorie tracking and macro breakdowns
- Support for dietary restrictions (Vegan, Keto, Gluten-Free, etc.)

### 🤖 AI Meal Planning
- Generate personalized weekly meal plans
- Based on preferences and dietary goals
- Smart ingredient optimization
- Automated grocery list generation

### 🛒 Smart Grocery Lists
- Auto-generate organized shopping lists
- Sorted by store aisles for efficiency
- Integration with meal plans
- Ingredient scaling for any serving size

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Spoonacular API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/yummate-recipe-app.git
   cd yummate-recipe-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Spoonacular API key:
   ```env
   VITE_SPOONACULAR_API_KEY=your_actual_api_key_here
   VITE_SPOONACULAR_BASE_URL=https://api.spoonacular.com
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔑 Getting Your API Key

1. Visit [Spoonacular API](https://spoonacular.com/food-api)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env` file

**Free Tier Limits:**
- 150 requests/day
- Perfect for development and testing

## 🏗️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router v7
- **API**: Spoonacular Food API
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **State Management**: React Hooks + Custom hooks
- **Code Quality**: ESLint + TypeScript

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI elements (Button, Card, Input)
│   ├── common/         # Shared components (RecipeCard, ErrorBoundary)
│   └── layout/         # Layout components (Navbar, Container)
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page with search
│   ├── RecipesPage.tsx # Recipe browsing and filtering
│   ├── RecipeDetailPage.tsx # Individual recipe details
│   ├── MealPlannerPage.tsx  # Meal planning interface
│   └── GroceryListPage.tsx  # Shopping list management
├── hooks/              # Custom React hooks
│   └── useSearch.ts    # API integration and search logic
├── services/           # API services
│   └── spoonacularApi.ts # Spoonacular API integration
├── types/              # TypeScript type definitions
└── constants/          # App constants and configuration
```

## 🎨 Design System

### Color Palette

#### Primary Colors
- **Primary Orange**: `#ff6b35` (Main brand color)
- **Primary Orange Light**: `#ff8a65` (Hover states)
- **Primary Orange Dark**: `#e55722` (Active states)

#### Secondary Colors
- **Teal**: `#55cfc7` (Secondary brand color)
- **Dark Teal**: `#02a08a` (Secondary dark)
- **Blue Accent**: `#7388c6` (Accent color)

#### Neutral Colors
- **Text Primary**: `rgb(255, 240, 214)` (Warm White)
- **Text Secondary**: `#6b7280` (Gray)
- **Background**: `#f9fafb` (Light Gray)
- **White**: `#ffffff`
- **Black**: `#000000`

#### Status Colors
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Amber)
- **Error**: `#ef4444` (Red)
- **Info**: `#3b82f6` (Blue)

#### Gradient Colors
- **Primary Gradient**: `linear-gradient(135deg, #ff6b35 0%, #ff8a65 100%)`
- **Background Gradient**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

### Components
- Glassmorphism design effects
- Smooth animations and transitions
- Responsive design for all devices
- Accessible navigation and interactions

## 🚀 Performance Optimizations

### Bundle Size
- Code splitting by routes
- Lazy loading of components
- Tree shaking for minimal bundle size
- Production build: ~101KB gzipped

### Runtime Performance
- React.memo for component optimization
- useCallback for event handlers
- Efficient state management
- Image optimization and lazy loading

### SEO & Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Meta tags for social sharing
- Keyboard navigation support

## 🧪 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Code linting
npm run lint

# Preview production build
npm run preview

# Storybook (Component Documentation)
npm run storybook
```

### Code Quality
- TypeScript for type safety
- ESLint for code quality
- Consistent code formatting
- Error boundaries for fault tolerance
- Storybook for component documentation

## 🐛 Troubleshooting

### Common Issues

1. **API Key Issues**
   ```bash
   # Check if your API key is set correctly
   echo $VITE_SPOONACULAR_API_KEY
   ```

2. **Build Errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Storybook Issues**
   ```bash
   # Use Node.js 20 for compatibility
   nvm use 20
   npm run storybook
   ```

## 📈 Roadmap

- [ ] **User Authentication** - Save favorites and meal plans
- [ ] **Social Features** - Share recipes and meal plans
- [ ] **Mobile App** - React Native implementation
- [ ] **Offline Support** - PWA with service workers
- [ ] **Advanced Filters** - AI-powered recipe recommendations
- [ ] **Shopping Integration** - Direct grocery store APIs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

<p align="center">
  Made with ❤️ for food lovers everywhere
</p>