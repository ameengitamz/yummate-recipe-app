# 🍽️ YumMate App - Wireframes

## 1. Home Page (/)
```
┌─────────────────────────────────────────────────────────────┐
│                    🍽️ YumMate                               │
│                     [Navigation]                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│               🎯 Welcome to YumMate!                        │
│                                                             │
│         Your personal recipe discovery and meal             │
│              planning companion                             │
│                                                             │
│    ┌─────────────────┐    ┌─────────────────┐              │
│    │  🔍 Find Recipes │    │  📅 Plan Meals  │              │
│    │                 │    │                 │              │
│    │  Discover new   │    │  Schedule your  │              │
│    │  recipes from   │    │  weekly meals   │              │
│    │  thousands of   │    │  and organize   │              │
│    │  options        │    │  your cooking   │              │
│    │                 │    │                 │              │
│    │   [Get Started] │    │   [Start Plan]  │              │
│    └─────────────────┘    └─────────────────┘              │
│                                                             │
│              ✨ Features at a glance ✨                     │
│                                                             │
│    • Search by ingredients or cuisine                      │
│    • Save recipes to your meal plan                        │
│    • Auto-generate grocery lists                           │
│    • Track your weekly meals                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 2. Recipe Finder (/recipes)
```
┌─────────────────────────────────────────────────────────────┐
│  🍽️ YumMate  │  Home  │  Recipes  │  Planner  │  Grocery   │
├─────────────────────────────────────────────────────────────┤
│                    🔍 Find Your Perfect Recipe              │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  🔍  Search recipes...                         [Search] │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  📋 Filters:                                               │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│  │ Cuisine ▼│ │MealType▼│ │  Diet  ▼│ │ Time   ▼│           │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
│                                                             │
│  📄 Results (24 recipes found):                            │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │[Recipe 1]│  │[Recipe 2]│  │[Recipe 3]│                 │
│  │   🖼️     │  │   🖼️     │  │   🖼️     │                 │
│  │          │  │          │  │          │                 │
│  │Pasta     │  │Chicken   │  │Salad     │                 │
│  │Carbonara │  │Curry     │  │Bowl      │                 │
│  │          │  │          │  │          │                 │
│  │⏱️ 30 min │  │⏱️ 45 min │  │⏱️ 15 min │                 │
│  │👥 4 serv │  │👥 6 serv │  │👥 2 serv │                 │
│  │          │  │          │  │          │                 │
│  │[Details] │  │[Details] │  │[Details] │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │[Recipe 4]│  │[Recipe 5]│  │[Recipe 6]│                 │
│  │   ...    │  │   ...    │  │   ...    │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
│                                                             │
│              [Load More] [Page 1 2 3 ... 8]               │
└─────────────────────────────────────────────────────────────┘
```

## 3. Recipe Detail (/recipes/:id)
```
┌─────────────────────────────────────────────────────────────┐
│  🍽️ YumMate  │  Home  │  Recipes  │  Planner  │  Grocery   │
├─────────────────────────────────────────────────────────────┤
│  ← Back to Recipes                                          │
│                                                             │
│  ┌─────────────────┐  📝 Creamy Pasta Carbonara            │
│  │                 │                                        │
│  │     🖼️ Large    │  ⏱️ Prep: 15 min  🍳 Cook: 20 min      │
│  │    Recipe       │  👥 Serves: 4     🔥 Difficulty: Easy  │
│  │     Image       │                                        │
│  │                 │  📄 A classic Italian pasta dish       │
│  │                 │  with eggs, cheese, and pancetta.      │
│  │                 │  Creamy and delicious!                 │
│  └─────────────────┘                                        │
│                                                             │
│                     ┌─────────────────────────────────────┐ │
│                     │    ✅ Add to Meal Plan              │ │
│                     └─────────────────────────────────────┘ │
│                                                             │
│  🛒 Ingredients (4 servings):          🔧 Instructions:     │
│  ┌─────────────────────────────────┐   ┌─────────────────┐  │
│  │ • 400g spaghetti                │   │ 1. Boil water   │  │
│  │ • 200g pancetta, diced          │   │    for pasta    │  │
│  │ • 4 large eggs                  │   │                 │  │
│  │ • 100g Parmesan cheese, grated  │   │ 2. Cook         │  │
│  │ • 2 cloves garlic, minced       │   │    pancetta     │  │
│  │ • Black pepper to taste         │   │                 │  │
│  │ • Salt to taste                 │   │ 3. Mix eggs     │  │
│  │ • 2 tbsp olive oil              │   │    and cheese   │  │
│  │                                 │   │                 │  │
│  │ [📋 Copy to Grocery List]       │   │ 4. Combine      │  │
│  └─────────────────────────────────┘   │    everything   │  │
│                                         │                 │  │
│                                         │ 5. Serve hot!   │  │
│                                         └─────────────────┘  │
│                                                             │
│  💡 Tips: Don't let eggs scramble! Remove from heat.       │
└─────────────────────────────────────────────────────────────┘
```

## 4. Meal Planner (/planner)
```
┌─────────────────────────────────────────────────────────────┐
│  🍽️ YumMate  │  Home  │  Recipes  │  Planner  │  Grocery   │
├─────────────────────────────────────────────────────────────┤
│                   📅 Weekly Meal Planner                    │
│                                                             │
│  Week of Jan 15-21, 2025        [← Previous] [Next Week →] │
│                                                             │
│     │  Monday  │ Tuesday │Wednesday│Thursday │ Friday │     │
│     │   15     │   16    │   17    │   18    │   19   │     │
│ ────┼──────────┼─────────┼─────────┼─────────┼────────┤     │
│ 🌅  │          │ Oatmeal │         │ Pancakes│        │     │
│Breakfast│      │  w/      │         │         │        │     │
│     │          │ Berries │         │         │        │     │
│     │ [+ Add]  │         │ [+ Add] │         │[+ Add] │     │
│ ────┼──────────┼─────────┼─────────┼─────────┼────────┤     │
│ 🍽️  │ Caesar   │         │ Pasta   │         │ Stir   │     │
│Lunch│ Salad    │         │Carbonara│         │ Fry    │     │
│     │          │ [+ Add] │         │ [+ Add] │        │     │
│     │   [×]    │         │   [×]   │         │  [×]   │     │
│ ────┼──────────┼─────────┼─────────┼─────────┼────────┤     │
│ 🌙  │          │ Chicken │         │ Pizza   │        │     │
│Dinner│ [+ Add] │ Curry   │ [+ Add] │ Night   │[+ Add] │     │
│     │          │         │         │         │        │     │
│     │          │   [×]   │         │   [×]   │        │     │
│ ────┴──────────┴─────────┴─────────┴─────────┴────────┘     │
│                                                             │
│  💡 Tip: Click [+ Add] to search and add recipes           │
│  🗑️ Click [×] to remove meals                              │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │          📋 Generate Grocery List                       │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 5. Grocery List (/groceries)
```
┌─────────────────────────────────────────────────────────────┐
│  🍽️ YumMate  │  Home  │  Recipes  │  Planner  │  Grocery   │
├─────────────────────────────────────────────────────────────┤
│                    🛒 Grocery List                          │
│                                                             │
│  📅 Week of Jan 15-21, 2025                               │
│  Generated from your meal plan                             │
│                                                             │
│  🥬 Produce:                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ ☐ 2 cups mixed berries                                 │ │
│  │ ☐ 1 head romaine lettuce                               │ │
│  │ ☐ 2 cloves garlic                                      │ │
│  │ ☐ 1 onion                                              │ │
│  │ ☐ 2 bell peppers                                       │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  🥩 Meat & Proteins:                                       │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ ☐ 500g chicken breast                                  │ │
│  │ ☐ 200g pancetta                                        │ │
│  │ ☐ 4 large eggs                                         │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  🧀 Dairy:                                                 │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ ☐ 100g Parmesan cheese                                 │ │
│  │ ☐ 1 cup milk                                           │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  🍝 Pantry:                                                │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ ☐ 400g spaghetti                                       │ │
│  │ ☐ 1 cup oats                                           │ │
│  │ ☐ Olive oil                                            │ │
│  │ ☐ Salt & pepper                                        │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐ │
│  │ 📧 Email    │ │ 🖨️ Print    │ │ 🔄 Regenerate from Plan │ │
│  │    List     │ │    List     │ │                         │ │
│  └─────────────┘ └─────────────┘ └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 6. 404 Page (/404)
```
┌─────────────────────────────────────────────────────────────┐
│  🍽️ YumMate  │  Home  │  Recipes  │  Planner  │  Grocery   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                         🤔 Oops!                           │
│                                                             │
│                    Page Not Found                          │
│                                                             │
│           Looks like this recipe got burned! 🔥            │
│                                                             │
│         The page you're looking for doesn't exist.         │
│                                                             │
│               ┌─────────────────────────────┐               │
│               │      🏠 Back to Home        │               │
│               └─────────────────────────────┘               │
│                                                             │
│               ┌─────────────────────────────┐               │
│               │    🔍 Find Recipes          │               │
│               └─────────────────────────────┘               │
│                                                             │
│                                                             │
│                     Error 404                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📱 Mobile Responsive Notes:
- Navigation collapses to hamburger menu
- Recipe cards stack vertically
- Meal planner becomes scrollable table
- Grocery list maintains category sections
- Touch-friendly button sizes (44px minimum)

## 🎨 Design Tokens:
- **Colors**: Primary (Green/Orange food theme), Secondary (Gray), Accent (Blue)
- **Typography**: Modern sans-serif, clear hierarchy
- **Spacing**: 8px grid system
- **Components**: Cards, buttons, forms follow consistent patterns
- **Icons**: Food-themed emoji + clean SVG icons

These wireframes provide a clear foundation for building YumMate! Ready to start implementing? 🚀
