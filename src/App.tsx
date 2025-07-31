import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Navbar, Footer, ErrorBoundary, LoadingSpinner } from './components';

// Lazy load all page components
const HomePage = lazy(() => import('./pages/HomePage'));
const RecipesPage = lazy(() => import('./pages/RecipesPage'));
const RecipeDetailPage = lazy(() => import('./pages/RecipeDetailPage'));
const MealPlannerPage = lazy(() => import('./pages/MealPlannerPage'));
const GroceryListPage = lazy(() => import('./pages/GroceryListPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="yum-gradient-bg text-yum-secondary font-inter leading-relaxed">
          {/* Shared Navigation Header */}
          <Navbar />

          <main className="min-h-screen">
            <Suspense fallback={
              <div className="flex items-center justify-center h-96">
                <LoadingSpinner />
              </div>
            }>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/recipes" element={<RecipesPage />} />
                <Route path="/recipes/:id" element={<RecipeDetailPage />} />
                <Route path="/planner" element={<MealPlannerPage />} />
                <Route path="/grocery" element={<GroceryListPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
