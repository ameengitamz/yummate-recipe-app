# 🍽️ YumMate App - Wireframes

**IMPORTANT: This document reflects the actual specifications from wireframes.html**

## Design System Overview
- **Primary Colors**: Teal (#55cfc7), Dark Teal (#02a08a), Steel Blue (#7388c6)
- **Secondary Colors**: Light Mint (#f9fce3), Light Steel Blue (#a8b8e6), Light Purple (#dda0dd)
- **Background**: Light Gray (#f4f4f4), Light Mint (#f9fce3), Pure White (#fdfefe)
- **Text Colors**: Primary with opacity (#46afadec), Secondary variant (#02ecd4ec)
- **Fonts**: Inter - Clean, modern sans-serif
- **Spacing**: Consistent padding and margins using Tailwind classes

## 1. Home Page (/)
```
┌─────────────────────────────────────────────────────────────┐
│  🍽️ YumMate  │  Home  │  Recipes  │  Planner  │  Grocery   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│               Welcome to YumMate!                           │
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
│    │   [Get Started] │    │ [Start Planning]│              │
│    └─────────────────┘    └─────────────────┘              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Visual Details:
- **Header**: Teal gradient background (#f4f4f4 to #f9fce3), teal text (#46afadec)
- **Hero Section**: Same gradient background, 540px height
- **Hero Title**: 5xl text, bold, teal color (#46afadec)
- **Hero Subtitle**: xl text, dark teal (#02a08a), normal weight
- **Cards**: Only 2 cards (Find Recipes, Plan Meals), white background, rounded corners
- **Card Titles**: 2xl text, teal secondary (#02ecd4ec), semibold
- **Card Text**: Base text, dark teal (#02a08a), relaxed leading
- **Buttons**: Blue gradient background (#7388c6 to #a8b8e6), white text

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
│  📄 Results:                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │[Recipe 1]│  │[Recipe 2]│  │[Recipe 3]│                 │
│  │   🍝     │  │   🍛     │  │   🥗     │                 │
│  │Pasta     │  │Chicken   │  │Fresh     │                 │
│  │Carbonara │  │Curry     │  │Salad Bowl│                 │
│  │⏱️ 30 min │  │⏱️ 45 min │  │⏱️ 15 min │                 │
│  │👥 4 serv │  │👥 6 serv │  │👥 2 serv │                 │
│  │[Details] │  │[Details] │  │[Details] │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │[Recipe 4]│  │[Recipe 5]│  │[Recipe 6]│                 │
│  │   🧁     │  │   🐟     │  │   🍕     │                 │
│  │Berry     │  │Grilled   │  │Homemade  │                 │
│  │Smoothie  │  │Salmon    │  │Pizza     │                 │
│  │⏱️ 10 min │  │⏱️ 25 min │  │⏱️ 60 min │                 │
│  │👥 2 serv │  │👥 3 serv │  │👥 8 serv │                 │
│  │[Details] │  │[Details] │  │[Details] │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
└─────────────────────────────────────────────────────────────┘
```

### Visual Details:
- **Search Bar**: Full width, 56px height, rounded corners, teal border on focus
- **Filter Buttons**: White background with teal border, hover effects
- **Recipe Cards**: Grid layout, white background, colorful recipe images
- **Card Content**: Teal titles, dark teal metadata, blue gradient buttons

## 3. Recipe Detail (/recipes/:id)
```
┌─────────────────────────────────────────────────────────────┐
│  🍽️ YumMate  │  Home  │  Recipes  │  Planner  │  Grocery   │
├─────────────────────────────────────────────────────────────┤
│  ← Back to Recipes                                          │
│                                                             │
│  ┌─────────────────┐  📝 Creamy Pasta Carbonara            │
│  │                 │                                        │
│  │     🍝 Large    │  ⏱️ Prep: 15 min  🍳 Cook: 20 min      │
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
│                                         │ 5. Mix hot      │  │
│                                         │    pasta off    │  │
│                                         │    heat         │  │
│                                         │                 │  │
│                                         │ 6. Serve with   │  │
│                                         │    Parmesan!    │  │
│                                         └─────────────────┘  │
│                                                             │
│  💡 Chef's Tips:                       📊 Nutrition Info:  │
│  • Remove from heat before adding eggs • Calories: 520     │
│  • Save pasta water for consistency    • Protein: 22g      │
│  • Use fresh Parmesan for best flavor  • Carbs: 45g       │
│  • Serve immediately while hot         • Fat: 28g         │
└─────────────────────────────────────────────────────────────┘
```

### Visual Details:
- **Recipe Image**: Large colorful placeholder, rounded corners
- **Stats Grid**: 2x2 or 4x1 grid with icons and values
- **Ingredients**: White background cards with bullet points, teal accents
- **Instructions**: Numbered steps with colored circles, teal background accents
- **Tips & Nutrition**: Colored background cards (yellow for tips, green for nutrition)

## 4. Meal Planner (/planner)
```
┌─────────────────────────────────────────────────────────────┐
│  🍽️ YumMate  │  Home  │  Recipes  │  Planner  │  Grocery   │
├─────────────────────────────────────────────────────────────┤
│                   📅 Weekly Meal Planner                    │
│                                                             │
│  Week of Jan 15-21, 2025        [← Previous] [Next Week →] │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │    📋 Quick Actions                                     │ │
│  │  [🔍 Browse] [🗑️ Clear Week] [📧 Share Plan]          │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│     │MealType │ Monday │ Tuesday │Wednesday│Thursday │Weekend│
│     │         │   15   │   16    │   17    │   18    │ 20-21 │
│ ────┼─────────┼────────┼─────────┼─────────┼─────────┼───────┤
│ 🌅  │Breakfast│Oatmeal │ [+ Add] │Pancakes │ [+ Add] │Brunch │
│     │         │Bowl 🥣 │         │Stack 🥞 │         │Spcl 🍳│
│     │         │ [Edit] │         │ [Edit]  │         │[Edit] │
│ ────┼─────────┼────────┼─────────┼─────────┼─────────┼───────┤
│ 🍽️  │ Lunch   │Caesar  │Chicken  │ [+ Add] │Stir Fry │BBQ    │
│     │         │Salad🥗 │Wrap 🌯  │         │Noodles🍜│Lunch🍖│
│     │         │ [Edit] │ [Edit]  │         │ [Edit]  │[Edit] │
│ ────┼─────────┼────────┼─────────┼─────────┼─────────┼───────┤
│ 🌙  │ Dinner  │Pasta   │ [+ Add] │Chicken  │ [+ Add] │Date   │
│     │         │Carb.🍝 │         │Curry 🍛 │         │Night🥂│
│     │         │ [Edit] │         │ [Edit]  │         │[Edit] │
│ ────┴─────────┴────────┴─────────┴─────────┴─────────┴───────┘
│                                                             │
│  📊 Weekly Summary:                                         │
│  • 15 meals planned • 6 meals needed • 12 unique recipes   │
│  • Completion: 71%                                         │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │       📋 Generate Grocery List (15 meals)               │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  💡 Pro Tips:                                               │
│  • Click "+ Add Meal" to search and add new recipes        │
│  • Click "Edit" to modify or remove existing meals         │
│  • Plan variety - mix different cuisines and ingredients   │
└─────────────────────────────────────────────────────────────┘
```

### Visual Details:
- **Week Navigation**: Previous/Next buttons with current week display
- **Quick Actions**: Blue gradient buttons for browse, red for clear, blue for share
- **Planning Grid**: 7 columns (meal types + 6 days), colored headers per meal type
- **Meal Cards**: Colorful backgrounds with emoji icons, small edit buttons
- **Add Buttons**: Dashed border, teal text, hover effects
- **Summary Cards**: White background with progress indicators

## 5. Grocery List (/groceries)
```
┌─────────────────────────────────────────────────────────────┐
│  🍽️ YumMate  │  Home  │  Recipes  │  Planner  │  Grocery   │
├─────────────────────────────────────────────────────────────┤
│                    � Smart Grocery List                    │
│                                                             │
│  📅 Jan 15-21, 2025  │  📊 15 meals planned                │
│  Generated from your meal plan automatically               │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ 📱 Actions: [📧 Email] [🖨️ Print] [🔄 Refresh] [📱 Send]│ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  🥬 Produce Section:                          Progress: 2/6 │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ ✅ 2 cups mixed berries            (Smoothie Bowl)      │ │
│  │ ✅ 1 head romaine lettuce          (Caesar Salad)       │ │
│  │ ☐ 3 cloves garlic                  (Multiple recipes)   │ │
│  │ ☐ 2 large onions                   (Stir Fry, Curry)   │ │
│  │ ☐ 2 bell peppers (red, yellow)     (Stir Fry)          │ │
│  │ ☐ 1 bunch fresh basil              (Pasta Carbonara)    │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  🥩 Meat & Proteins:                          Progress: 1/4 │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ ✅ 500g chicken breast              (Curry, Wrap)       │ │
│  │ ☐ 200g pancetta                    (Pasta Carbonara)    │ │
│  │ ☐ 6 large eggs                     (Pancakes, Pasta)    │ │
│  │ ☐ 400g ground beef                 (Pizza, BBQ)         │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  🧀 Dairy & Refrigerated:                     Progress: 0/4 │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ ☐ 100g Parmesan cheese, grated     (Pasta, Salad)      │ │
│  │ ☐ 2 cups whole milk                (Pancakes, Smoothie) │ │
│  │ ☐ 200g mozzarella cheese           (Pizza Night)        │ │
│  │ ☐ 1 container Greek yogurt          (Smoothie Bowl)     │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  🍝 Pantry & Staples:                         Progress: 0/6 │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ ☐ 400g spaghetti pasta             (Pasta Carbonara)    │ │
│  │ ☐ 2 cups rolled oats               (Oatmeal Bowl)       │ │
│  │ ☐ 500ml olive oil                  (Multiple recipes)   │ │
│  │ ☐ 1kg all-purpose flour            (Pancakes, Pizza)    │ │
│  │ ☐ Sea salt & black pepper          (Essential)          │ │
│  │ ☐ 200g rice noodles                (Stir Fry)          │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  � Shopping Summary:                                       │
│  • Total: 20 items  • Checked: 3  • Remaining: 17         │
│  • Estimated cost: $85-95  • Shopping time: ~45 min       │
│  • Completion: 15%                                         │
│                                                             │
│  💡 Smart Shopping Tips:                                    │
│  • Check items off as you shop to track progress           │
│  • Items show which recipes they're needed for             │
│  • List auto-updates when you modify meal plan             │
└─────────────────────────────────────────────────────────────┘
```

### Visual Details:
- **Category Headers**: Colored by category (green for produce, red for meat, etc.)
- **Progress Indicators**: Colored badges showing completion ratios
- **Checkboxes**: Styled checkboxes with colored borders
- **Item Details**: Shows quantities and which recipes need them
- **Summary Section**: Grid layout with large numbers and colored progress indicators
- **Action Buttons**: Colored by function (blue, purple, green, orange)

## 6. 404 Page (/404)
```
┌─────────────────────────────────────────────────────────────┐
│  🍽️ YumMate  │  Home  │  Recipes  │  Planner  │  Grocery   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                         🤔                                  │
│                        404                                  │
│                                                             │
│                 Oops! Page Not Found                       │
│                                                             │
│           Looks like this recipe got burned! 🔥            │
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
│               ┌─────────────────────────────┐               │
│               │    📅 Meal Planner          │               │
│               └─────────────────────────────┘               │
│                                                             │
│   🍳 Popular Suggestions:                                   │
│   • Try "pasta" - Classic comfort food recipes             │
│   • Search "chicken" - Versatile protein dishes            │
│   • Healthy "salads" - Fresh and nutritious options        │
│                                                             │
│   🔥 Trending This Week:                                    │
│   • 🍕 Homemade Pizza - Perfect weekend project            │
│   • 🥘 One-Pot Meals - Easy cleanup dinners               │
│                                                             │
│                     [📧 Contact Support]                    │
└─────────────────────────────────────────────────────────────┘
```

### Visual Details:
- **404 Illustration**: Large thinking emoji and bold 404 number
- **Error Message**: Friendly cooking-themed language
- **Navigation Cards**: Three main action cards with hover effects
- **Popular Suggestions**: Orange-themed section with food emojis
- **Trending Section**: Purple-themed with popular recipes
- **Support Button**: Teal accent button at bottom

## 📱 Mobile Responsive Notes:
- Navigation collapses to hamburger menu
- Recipe cards stack vertically in single column
- Meal planner becomes horizontally scrollable
- Grocery list maintains category grouping
- Touch-friendly button sizes (minimum 44px)
- Cards and text scale appropriately

## 🎨 Design System Details:

### Color Palette (from wireframes.html):
```css
Primary: #55cfc7 (teal)
Primary Light: #f9fce3 (light mint)
Secondary: #02a08a (dark teal)
Accent: #7388c6 (steel blue)
Accent Light: #a8b8e6 (light steel blue)
Purple: #dda0dd (light purple)
Green: #90ee90 (light green)
Background Start: #f4f4f4 (light gray)
Background End: #f9fce3 (light mint)
Card: #fdfefe (pure white)
Card Hover: #f8fcfb (subtle tint)
Primary EC: #46afadec (primary with opacity)
Secondary EC: #02ecd4ec (secondary variant)
```

### Typography:
- **Font Family**: Inter (clean, modern sans-serif)
- **Title Sizes**: text-5xl (hero), text-4xl (page titles), text-3xl (section titles)
- **Body Text**: text-xl (subtitles), text-lg (descriptions), text-base (content)
- **Weights**: font-bold (titles), font-semibold (headings), font-medium (buttons), font-normal (body)

### Component Patterns:
- **Cards**: White background, rounded-3xl corners, subtle shadows
- **Buttons**: Gradient backgrounds, rounded-xl corners, hover effects
- **Inputs**: White background, rounded borders, focus states
- **Navigation**: Gradient background, consistent spacing
- **Grids**: Responsive layouts using CSS Grid and Flexbox

### Animation & Interactions:
- **Hover Effects**: Transform translate, scale, and color transitions
- **Button States**: Background gradients, shadow changes, lift effects
- **Card Animations**: Bounce effects, scale transforms
- **Transitions**: Smooth 300-400ms cubic-bezier easing

This wireframe specification matches exactly what is implemented in wireframes.html and should be used as the single source of truth for all development.
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
│                                                             │
│  📊 Nutrition Info (optional):                             │
│  Calories: 520 | Protein: 22g | Carbs: 45g | Fat: 28g     │
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
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                📋 Quick Actions                         │ │
│  │  [🔍 Browse Recipes] [🗑️ Clear Week] [📧 Share Plan]   │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│     │  Monday  │ Tuesday │Wednesday│Thursday │ Friday │ Weekend│
│     │   15     │   16    │   17    │   18    │   19   │ 20-21  │
│ ────┼──────────┼─────────┼─────────┼─────────┼────────┼────────┤
│ 🌅  │ Oatmeal  │         │ Pancakes│         │ Smoothie│ Brunch │
│Breakfast │ Bowl    │ [+ Add] │ Stack   │ [+ Add] │ Bowl   │ Special│
│     │ 🥣       │         │ 🥞      │         │ 🥤     │ 🍳     │
│     │ [Edit]   │         │ [Edit]  │         │ [Edit] │ [Edit] │
│ ────┼──────────┼─────────┼─────────┼─────────┼────────┼────────┤
│ 🍽️  │ Caesar   │ Chicken │         │ Stir Fry│        │ BBQ    │
│Lunch│ Salad    │ Wrap    │ [+ Add] │ Noodles │[+ Add] │ Lunch  │
│     │ 🥗       │ 🌯      │         │ 🍜      │        │ 🍖     │
│     │ [Edit]   │ [Edit]  │         │ [Edit]  │        │ [Edit] │
│ ────┼──────────┼─────────┼─────────┼─────────┼────────┼────────┤
│ 🌙  │ Pasta    │         │ Chicken │         │ Pizza  │ Date   │
│Dinner│ Carbonara│ [+ Add] │ Curry   │ [+ Add] │ Night  │ Night  │
│     │ 🍝       │         │ 🍛      │         │ 🍕     │ 🥂     │
│     │ [Edit]   │         │ [Edit]  │         │ [Edit] │ [Edit] │
│ ────┴──────────┴─────────┴─────────┴─────────┴────────┴────────┘
│                                                             │
│  � Weekly Summary:                                         │
│  • 15 meals planned • 3 meals needed • 12 unique recipes   │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │       📋 Generate Grocery List (15 meals)               │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  💡 Tips:                                                   │
│  • Click [+ Add] to search and add new recipes             │
│  • Click [Edit] to modify or remove existing meals         │
│  • Drag recipes between time slots (future feature)        │
└─────────────────────────────────────────────────────────────┘
```

## 5. Grocery List (/groceries)
```
┌─────────────────────────────────────────────────────────────┐
│  🍽️ YumMate  │  Home  │  Recipes  │  Planner  │  Grocery   │
├─────────────────────────────────────────────────────────────┤
│                    🛒 Smart Grocery List                    │
│                                                             │
│  📅 Week of Jan 15-21, 2025  │  📊 15 meals planned        │
│  Generated from your meal plan automatically               │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ 📱 Actions: [📧 Email] [🖨️ Print] [🔄 Refresh from Plan]│ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  🥬 Produce Section:                          Progress: 2/5 │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ ✅ 2 cups mixed berries            (Smoothie Bowl)      │ │
│  │ ✅ 1 head romaine lettuce          (Caesar Salad)       │ │
│  │ ☐ 3 cloves garlic                  (Multiple recipes)   │ │
│  │ ☐ 2 large onions                   (Stir Fry, Curry)   │ │
│  │ ☐ 2 bell peppers (red, yellow)     (Stir Fry)          │ │
│  │ ☐ 1 bunch fresh basil              (Pasta Carbonara)    │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  🥩 Meat & Proteins:                          Progress: 1/4 │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ ✅ 500g chicken breast              (Chicken Curry)     │ │
│  │ ☐ 200g pancetta                    (Pasta Carbonara)    │ │
│  │ ☐ 6 large eggs                     (Pancakes, Pasta)    │ │
│  │ ☐ 400g ground beef                 (Pizza topping)      │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  🧀 Dairy & Refrigerated:                     Progress: 0/4 │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ ☐ 100g Parmesan cheese, grated     (Pasta, Salad)      │ │
│  │ ☐ 2 cups whole milk                (Pancakes, Smoothie) │ │
│  │ ☐ 200g mozzarella cheese           (Pizza Night)        │ │
│  │ ☐ 1 container Greek yogurt          (Smoothie Bowl)     │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  🍝 Pantry & Staples:                         Progress: 0/6 │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ ☐ 400g spaghetti pasta             (Pasta Carbonara)    │ │
│  │ ☐ 2 cups rolled oats               (Oatmeal Bowl)       │ │
│  │ ☐ 500ml extra virgin olive oil     (Multiple recipes)   │ │
│  │ ☐ 1kg all-purpose flour            (Pancakes, Pizza)    │ │
│  │ ☐ Sea salt & black pepper          (Essential)          │ │
│  │ ☐ 200g rice noodles                (Stir Fry)          │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  📊 Shopping Summary:                                       │
│  • Total items: 19  • Checked off: 3  • Remaining: 16     │
│  • Estimated cost: $85-95  • Estimated shop time: 45 min   │
│                                                             │
│  💡 Pro Tips:                                               │
│  • Check items off as you shop                             │
│  • Items show which recipes they're needed for             │
│  • List auto-updates when you modify meal plan             │
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
│               ┌─────────────────────────────┐               │
│               │    📅 Meal Planner          │               │
│               └─────────────────────────────┘               │
│                                                             │
│                                                             │
│                     Error 404                              │
│                                                             │
│   🍳 Popular suggestions:                                   │
│   • Try searching for "pasta" or "chicken"                 │
│   • Check out our trending recipes                         │
│   • Plan your weekly meals                                 │
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
