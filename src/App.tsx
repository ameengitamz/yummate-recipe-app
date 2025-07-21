import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components';
import { 
  HomePage, 
  RecipesPage, 
  MealPlannerPage, 
  GroceryListPage, 
  NotFoundPage,
  // ApiTestPage
} from './pages';

function App() {
  return (
    <Router>
      <div className="yum-gradient-bg min-h-screen text-yum-secondary font-inter leading-relaxed">
        {/* Shared Navigation Header */}
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/planner" element={<MealPlannerPage />} />
            <Route path="/grocery" element={<GroceryListPage />} />
            {/* <Route path="/api-test" element={<ApiTestPage />} /> */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App
