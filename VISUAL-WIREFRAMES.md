# 🍽️ YumMate App - Visual Wireframes

## Design System Overview
- **Primary Colors**: Orange (#FF6B35), Green (#4CAF50), Blue (#2196F3)
- **Background**: White (#FFFFFF), Light Gray (#F5F5F5)
- **Text**: Dark Gray (#333333), Medium Gray (#666666)
- **Accent**: Orange gradient for CTAs
- **Fonts**: Inter/Roboto - Clean, modern sans-serif
- **Spacing**: 8px, 16px, 24px, 32px grid system

---

## 1. 🏠 Home Page (/) - Landing & Welcome

### Layout Structure:
```
[Header Navigation Bar - 64px height]
[Hero Section - Full viewport]
[Features Section - 400px]
[Footer - 200px]
```

### Visual Elements:
- **Header**: Orange gradient background, white YumMate logo + hamburger/nav menu
- **Hero**: Large food image background with overlay, centered white text
- **CTA Cards**: Two large cards side-by-side (Find Recipes + Plan Meals)
- **Features**: 4 feature icons with descriptions in a grid

### Component Details:
- **Logo**: "🍽️ YumMate" - 24px font, white text
- **Hero Title**: "Welcome to YumMate!" - 48px bold, white
- **Hero Subtitle**: 18px, white with opacity
- **CTA Cards**: 300x200px, white background, shadow, orange accent buttons
- **Features**: Icon + title + description, 4-column grid on desktop

---

## 2. 🔍 Recipe Finder (/recipes) - Search & Browse

### Layout Structure:
```
[Header Navigation - 64px]
[Search Bar - 80px]
[Filters Row - 60px]
[Results Grid - Flexible height]
[Pagination - 60px]
```

### Visual Elements:
- **Search Bar**: Full-width input with search icon, orange focus border
- **Filters**: 4 dropdown buttons in a row (Cuisine, Meal Type, Diet, Time)
- **Recipe Cards**: Grid layout, 3-4 columns on desktop, 1-2 on mobile
- **Recipe Card**: Image (200x150), title, time, servings, "View Details" button

### Component Details:
- **Search Input**: 48px height, rounded corners, placeholder text
- **Filter Dropdowns**: 120px width, gray border, chevron icon
- **Recipe Cards**: 280x320px, white background, subtle shadow
- **Recipe Image**: Aspect ratio 4:3, rounded top corners
- **Pagination**: Numbered buttons, orange active state

---

## 3. 📖 Recipe Detail (/recipes/:id) - Full Recipe View

### Layout Structure:
```
[Header Navigation - 64px]
[Back Button - 40px]
[Recipe Header - 200px]
[Main Content - Two columns]
[Tips Section - 100px]
```

### Visual Elements:
- **Recipe Header**: Large image left (400x300), recipe info right
- **Recipe Info**: Title, prep time, cook time, servings, difficulty
- **Add to Plan Button**: Large orange button, prominent placement
- **Two Columns**: Ingredients list (left) + Instructions (right)
- **Ingredients**: Bulleted list with checkboxes
- **Instructions**: Numbered steps, clear typography

### Component Details:
- **Recipe Image**: 400x300px, rounded corners
- **Recipe Title**: 32px bold, dark gray
- **Meta Info**: Icons + text (clock, users, fire for difficulty)
- **Add Button**: 100% width, 48px height, orange gradient
- **Ingredients**: Checkbox + text, hover states
- **Instructions**: Step numbers in orange circles

---

## 4. 📅 Meal Planner (/planner) - Weekly Grid

### Layout Structure:
```
[Header Navigation - 64px]
[Week Navigation - 60px]
[Meal Planning Grid - 600px]
[Generate Button - 80px]
```

### Visual Elements:
- **Week Navigator**: Previous/Next arrows, current week display
- **Planning Grid**: 7 columns (days) × 3 rows (meal types)
- **Empty Slots**: Dotted border, "+ Add" button
- **Filled Slots**: Recipe name, small image, remove "×" button
- **Grid Cells**: 140x100px each, consistent spacing

### Component Details:
- **Day Headers**: Bold text, date below
- **Meal Labels**: Icons (🌅 🍽️ 🌙) + text vertically
- **Add Buttons**: Dotted border, gray text, hover effects
- **Recipe Tiles**: Small image, recipe name, remove icon
- **Generate Button**: Full-width, orange, prominent

---

## 5. 🛒 Grocery List (/groceries) - Shopping List

### Layout Structure:
```
[Header Navigation - 64px]
[List Header - 80px]
[Category Sections - Flexible]
[Action Buttons - 80px]
```

### Visual Elements:
- **List Header**: Week dates, "Generated from meal plan" subtitle
- **Category Sections**: Collapsible sections with icons
- **Ingredient Items**: Checkbox + ingredient text + quantity
- **Category Icons**: 🥬 🥩 🧀 🍝 for different food types
- **Action Buttons**: Email, Print, Regenerate in a row

### Component Details:
- **Category Headers**: 40px height, icon + title, collapsible
- **Checkboxes**: Custom styled, orange when checked
- **Ingredient Text**: 16px, strikethrough when checked
- **Action Buttons**: Icon + text, outlined style
- **Sections**: White background, subtle borders

---

## 6. 🚫 404 Page (/404) - Error State

### Layout Structure:
```
[Header Navigation - 64px]
[Error Content - Centered, 400px]
[Action Buttons - 60px each]
```

### Visual Elements:
- **Error Illustration**: Large "🤔" or food-themed error graphic
- **Error Message**: Friendly, food-themed copy
- **Action Buttons**: Home and Find Recipes buttons
- **Minimal Layout**: Centered content, lots of white space

### Component Details:
- **Illustration**: 200x200px, centered
- **Error Text**: 24px title, 16px description
- **Buttons**: Orange primary, gray secondary
- **Spacing**: Generous margins, clean layout

---

## 📱 Mobile Responsive Breakpoints

### Mobile (320px - 768px):
- **Navigation**: Hamburger menu overlay
- **Recipe Grid**: Single column layout
- **Meal Planner**: Horizontal scroll or accordion
- **Touch Targets**: Minimum 44px for all interactive elements
- **Typography**: Slightly larger for readability

### Tablet (768px - 1024px):
- **Recipe Grid**: 2-3 columns
- **Meal Planner**: Slightly compressed grid
- **Navigation**: Condensed horizontal menu

### Desktop (1024px+):
- **Recipe Grid**: 3-4 columns
- **Meal Planner**: Full 7-day grid
- **Navigation**: Full horizontal menu
- **Sidebar**: Optional filters/navigation panel

---

## 🎨 Component Library

### Buttons:
- **Primary**: Orange gradient, white text, 48px height
- **Secondary**: White background, orange border, orange text
- **Ghost**: Transparent, orange text, hover states

### Cards:
- **Recipe Card**: White, subtle shadow, rounded corners
- **Feature Card**: White, shadow, icon + text layout
- **Meal Slot**: Dotted border (empty), filled (recipe content)

### Form Elements:
- **Input Fields**: 48px height, rounded, orange focus border
- **Dropdowns**: Chevron icon, consistent styling
- **Checkboxes**: Custom orange styling, smooth animations

### Navigation:
- **Header**: Orange gradient, white text/icons
- **Menu Items**: Hover states, active indicators
- **Breadcrumbs**: Arrow separators, clickable links

This visual wireframe specification provides clear guidance for implementing the actual UI components! 🎨
