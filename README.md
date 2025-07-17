# 🍽️ YumMate - Recipe Discovery & Meal Planning App

YumMate is a modern, responsive web application built with React and TypeScript that helps users discover recipes, plan meals, and organize grocery lists.

## ✨ Features

### 🔍 Recipe Discovery
- Search through thousands of recipes
- Filter by cuisine, meal type, dietary restrictions, and cooking time
- View detailed recipe information with ingredients and instructions
- Beautiful, responsive recipe cards

### 📅 Meal Planning
- Interactive weekly meal planner
- Drag-and-drop meal scheduling
- Visual calendar interface
- Plan breakfast, lunch, and dinner for the entire week

### 🛒 Smart Grocery Lists
- Auto-generated grocery lists from meal plans
- Organized by food categories (Produce, Meat, Dairy, etc.)
- Interactive checkboxes for shopping
- Export and share functionality

### 🎨 Modern Design System
- Custom YumMate brand colors and theme
- Consistent Tailwind CSS styling
- Responsive design for all devices
- Interactive wireframes and prototypes

## 🛠️ Tech Stack

- **Frontend**: React 19.1.0 + TypeScript
- **Styling**: Tailwind CSS v4.1.11 with custom color system
- **Build Tool**: Vite 7.0.4
- **State Management**: Zustand 5.0.6
- **Routing**: React Router 7.6.3
- **HTTP Client**: Axios 1.10.0

## 🎨 Design System

### Custom Color Palette
```javascript
'yum-primary': '#55cfc7',        // Primary teal
'yum-secondary': '#02a08a',      // Dark teal
'yum-accent': '#7388c6',         // Steel blue
'yum-purple': '#dda0dd',         // Light purple
'yum-green': '#90ee90',          // Light green
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd my-recipe-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Wireframes & Prototypes

The project includes comprehensive interactive wireframes showcasing all major features:

- **Home Page** - Landing page with feature highlights
- **Recipe Finder** - Search and filter interface
- **Recipe Detail** - Detailed recipe view
- **Meal Planner** - Weekly calendar interface
- **Grocery List** - Categorized shopping lists
- **404 Page** - Error handling

View wireframes: Open `wireframes.html` in your browser

## 🏗️ Project Structure

```
my-recipe-app/
├── public/
│   ├── yummate-logo.png     # Brand logo
│   └── vite.svg
├── src/
│   ├── components/          # React components
│   ├── pages/              # Page components
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── wireframes.html          # Interactive wireframes
├── tailwind.config.js       # Tailwind configuration
└── package.json
```

## 🎯 Roadmap

### Phase 1: Core Features (Current)
- [x] Project setup and configuration
- [x] Design system and wireframes
- [x] Tailwind CSS integration
- [ ] Recipe search and display
- [ ] Basic meal planning

### Phase 2: Enhanced Features
- [ ] User authentication
- [ ] Recipe favorites and collections
- [ ] Advanced meal planning
- [ ] Grocery list generation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Happy Cooking! 👨‍🍳👩‍🍳**
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
