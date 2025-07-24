import { Container, Card, Button } from '../components';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full py-8">
      <Container>
        <div className="min-h-[60vh] flex items-center justify-center">
        <Card variant="elevated" className="text-center max-w-2xl mx-auto p-12">
          {/* 404 Illustration */}
          <div className="text-8xl mb-8">🍽️</div>
          
          {/* Error Code */}
          <h1 className="text-6xl font-bold text-yum-primary-ec mb-4">
            404
          </h1>
          
          {/* Error Message */}
          <h2 className="text-3xl font-bold text-yum-primary-ec mb-6">
            Oops! Recipe Not Found
          </h2>
          
          <p className="text-xl text-yum-text-primary mb-8 leading-relaxed">
            It looks like this page has been eaten by our hungry developers! 
            Don't worry, there are plenty of delicious recipes waiting for you.
          </p>
          
          {/* Suggestions */}
          <div className="bg-yum-neutral-light/50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-yum-primary-ec mb-4">
              What would you like to do?
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <Button variant="primary" className="w-full" onClick={() => navigate('/')}>
                  🏠 Go to Home
                </Button>
                <Button variant="secondary" className="w-full" onClick={() => navigate('/recipes')}>
                  🍳 Browse Recipes
                </Button>
              </div>
              <div className="space-y-4">
                <Button variant="accent" className="w-full" onClick={() => navigate('/planner')}>
                  📅 Meal Planner
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate('/grocery')}>
                  🛒 Grocery List
                </Button>
              </div>
            </div>
          </div>
          
          {/* Search Suggestion */}
          <div className="text-center">
            <p className="text-yum-text-primary mb-4">
              Or try searching for something specific:
            </p>
            <div className="flex max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search recipes..."
                className="flex-1 px-4 py-2 border border-yum-neutral-light rounded-l-lg 
                         focus:outline-none focus:ring-2 focus:ring-yum-primary/50"
              />
              <Button variant="primary" className="rounded-l-none">
                🔍
              </Button>
            </div>
          </div>
          
          {/* Fun Facts */}
          <div className="mt-12 pt-8 border-t border-yum-neutral-light">
            <h4 className="text-lg font-semibold text-yum-primary-ec mb-4">
              🍴 Fun Kitchen Fact
            </h4>
            <p className="text-yum-text-secondary italic">
              "The word 'recipe' comes from the Latin word 'recipere' meaning 'to receive' 
              - and we're here to help you receive all the best cooking inspiration!"
            </p>
          </div>
          
          {/* Help Section */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-700 text-sm">
              <strong>Need help?</strong> If you think this page should exist, 
              please contact our support team or check if the URL is correct.
            </p>
          </div>
        </Card>
        </div>
      </Container>
    </div>
  );
};

export default NotFoundPage;
