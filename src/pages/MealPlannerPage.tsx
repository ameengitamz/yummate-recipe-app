import { useState } from 'react';
import { Container, Card, Button, Badge } from '../components';

interface MealPlan {
  id: string;
  date: string;
  breakfast?: string;
  lunch?: string;
  dinner?: string;
  snack?: string;
}

const MealPlannerPage = () => {
  const [currentWeek, setCurrentWeek] = useState(0);

  // Generate dates for current week
  const getCurrentWeekDates = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + (currentWeek * 7));
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const weekDates = getCurrentWeekDates();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

  // Sample meal plan data
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([
    {
      id: '1',
      date: weekDates[1].toDateString(),
      breakfast: 'Oatmeal with Berries',
      lunch: 'Caesar Salad',
      dinner: 'Grilled Salmon',
    },
    {
      id: '2',
      date: weekDates[2].toDateString(),
      breakfast: 'Avocado Toast',
      lunch: 'Chicken Curry',
      dinner: 'Pasta Carbonara',
      snack: 'Greek Yogurt',
    },
  ]);

  const getMealForDateAndType = (date: Date, mealType: string) => {
    const mealPlan = mealPlans.find(plan => plan.date === date.toDateString());
    return mealPlan ? mealPlan[mealType as keyof MealPlan] : null;
  };

  const handleAddMeal = (date: string, type: string) => {
    // This would open a recipe selection modal in a real app
    console.log('Add meal for', date, type);
  };

  const handleRemoveMeal = (date: string, type: string) => {
    setMealPlans(prev => prev.map(plan => 
      plan.date === date ? { ...plan, [type]: undefined } : plan
    ));
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeek(prev => direction === 'next' ? prev + 1 : prev - 1);
  };

  const getWeekRange = () => {
    const start = weekDates[0];
    const end = weekDates[6];
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  return (
    <Container>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-yum-primary-ec mb-4">
          Meal Planner 📅
        </h1>
        <p className="text-xl text-yum-secondary">
          Plan your weekly meals and stay organized with your cooking schedule
        </p>
      </div>

      {/* Week Navigation */}
      <Card variant="elevated" className="mb-8">
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => navigateWeek('prev')}>
            ← Previous Week
          </Button>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-yum-primary-ec">
              {getWeekRange()}
            </h2>
            <p className="text-yum-secondary">
              {currentWeek === 0 ? 'This Week' : 
               currentWeek > 0 ? `${currentWeek} week${currentWeek > 1 ? 's' : ''} ahead` :
               `${Math.abs(currentWeek)} week${Math.abs(currentWeek) > 1 ? 's' : ''} ago`}
            </p>
          </div>
          
          <Button variant="outline" onClick={() => navigateWeek('next')}>
            Next Week →
          </Button>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Button variant="primary" className="h-16">
          📋 Generate Meal Plan
        </Button>
        <Button variant="secondary" className="h-16">
          🛒 Create Grocery List
        </Button>
        <Button variant="accent" className="h-16">
          📤 Share Plan
        </Button>
        <Button variant="outline" className="h-16">
          💾 Save Template
        </Button>
      </div>

      {/* Meal Planning Grid */}
      <Card variant="elevated">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-yum-neutral-light">
                <th className="text-left p-4 font-semibold text-yum-primary-ec w-32">
                  Meal
                </th>
                {weekDates.map((date, index) => (
                  <th key={date.toDateString()} className="text-center p-4 font-semibold text-yum-primary-ec">
                    <div className="space-y-1">
                      <div className="text-sm text-yum-secondary">
                        {dayNames[index]}
                      </div>
                      <div className="text-lg">
                        {date.getDate()}
                      </div>
                      <Badge 
                        variant={index === new Date().getDay() && currentWeek === 0 ? 'primary' : 'info'}
                        size="sm"
                      >
                        {date.toLocaleDateString('en-US', { month: 'short' })}
                      </Badge>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mealTypes.map((mealType) => (
                <tr key={mealType} className="border-b border-yum-neutral-light/50">
                  <td className="p-4 font-medium text-yum-primary-ec capitalize bg-yum-neutral-light/30">
                    {mealType}
                  </td>
                  {weekDates.map((date) => {
                    const meal = getMealForDateAndType(date, mealType);
                    return (
                      <td key={`${date.toDateString()}-${mealType}`} className="p-2">
                        {meal ? (
                          <div className="bg-yum-primary/10 border border-yum-primary/20 rounded-lg p-3 min-h-[80px] flex flex-col justify-between">
                            <div className="text-sm font-medium text-yum-primary-ec mb-2">
                              {meal}
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => console.log('Edit meal:', meal)}
                                className="text-xs text-yum-accent hover:underline"
                              >
                                Edit
                              </button>
                              <span className="text-xs text-yum-neutral">•</span>
                              <button
                                onClick={() => handleRemoveMeal(date.toDateString(), mealType)}
                                className="text-xs text-red-500 hover:underline"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAddMeal(date.toDateString(), mealType)}
                            className="w-full h-20 border-2 border-dashed border-yum-neutral-light rounded-lg 
                                     hover:border-yum-primary/50 hover:bg-yum-primary/5 
                                     transition-colors flex items-center justify-center text-yum-secondary"
                          >
                            <span className="text-2xl">+</span>
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Meal Planning Tips */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <Card variant="outlined">
          <h3 className="text-xl font-bold text-yum-primary-ec mb-4">
            💡 Planning Tips
          </h3>
          <ul className="space-y-2 text-yum-secondary">
            <li>• Plan meals around seasonal ingredients</li>
            <li>• Batch cook on weekends to save time</li>
            <li>• Include variety in cuisines and cooking methods</li>
            <li>• Consider your schedule when planning complex meals</li>
            <li>• Leave room for flexibility and leftovers</li>
          </ul>
        </Card>

        <Card variant="outlined">
          <h3 className="text-xl font-bold text-yum-primary-ec mb-4">
            📊 This Week's Stats
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-yum-secondary">Planned meals:</span>
              <Badge variant="primary">
                {mealPlans.reduce((acc, plan) => {
                  return acc + Object.values(plan).filter(v => v && typeof v === 'string' && v !== plan.id && v !== plan.date).length;
                }, 0)}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-yum-secondary">Empty slots:</span>
              <Badge variant="warning">
                {(weekDates.length * mealTypes.length) - mealPlans.reduce((acc, plan) => {
                  return acc + Object.values(plan).filter(v => v && typeof v === 'string' && v !== plan.id && v !== plan.date).length;
                }, 0)}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-yum-secondary">Completion:</span>
              <Badge variant="success">
                {Math.round((mealPlans.reduce((acc, plan) => {
                  return acc + Object.values(plan).filter(v => v && typeof v === 'string' && v !== plan.id && v !== plan.date).length;
                }, 0) / (weekDates.length * mealTypes.length)) * 100)}%
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default MealPlannerPage;
