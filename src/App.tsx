import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components';
import { 
  HomePage, 
  RecipesPage, 
  RecipeDetailPage,
  MealPlannerPage, 
  GroceryListPage, 
  NotFoundPage
} from './pages';

function App() {
  return (
    <Router>
      <div className="yum-gradient-bg text-yum-secondary font-inter leading-relaxed">
        {/* Shared Navigation Header */}
        <Navbar />

        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/recipes/:id" element={<RecipeDetailPage />} />
            <Route path="/planner" element={<MealPlannerPage />} />
            <Route path="/grocery" element={<GroceryListPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App
