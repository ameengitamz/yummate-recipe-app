import { useState } from 'react';
import { Container, Card, Button, Badge, Input, EmptyState } from '../components';

interface GroceryItem {
  id: string;
  name: string;
  category: string;
  quantity: string;
  unit: string;
  purchased: boolean;
  addedFrom?: string; // recipe name if auto-generated
}

const GroceryListPage = () => {
  const [newItem, setNewItem] = useState({ name: '', quantity: '', unit: 'piece' });
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample grocery list data
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([
    {
      id: '1',
      name: 'Chicken Breast',
      category: 'Meat & Seafood',
      quantity: '2',
      unit: 'lbs',
      purchased: false,
      addedFrom: 'Chicken Curry'
    },
    {
      id: '2',
      name: 'Basmati Rice',
      category: 'Pantry',
      quantity: '1',
      unit: 'bag',
      purchased: false,
      addedFrom: 'Chicken Curry'
    },
    {
      id: '3',
      name: 'Fresh Spinach',
      category: 'Produce',
      quantity: '1',
      unit: 'bunch',
      purchased: true,
    },
    {
      id: '4',
      name: 'Greek Yogurt',
      category: 'Dairy',
      quantity: '2',
      unit: 'cups',
      purchased: false,
    },
    {
      id: '5',
      name: 'Olive Oil',
      category: 'Pantry',
      quantity: '1',
      unit: 'bottle',
      purchased: false,
    },
    {
      id: '6',
      name: 'Bell Peppers',
      category: 'Produce',
      quantity: '3',
      unit: 'pieces',
      purchased: false,
    },
  ]);

  const categories = [
    'all',
    'Produce',
    'Meat & Seafood',
    'Dairy',
    'Pantry',
    'Frozen',
    'Bakery',
    'Other'
  ];

  const units = ['piece', 'lbs', 'oz', 'cups', 'bag', 'bottle', 'bunch', 'package'];

  // Filter items by category
  const filteredItems = selectedCategory === 'all' 
    ? groceryItems 
    : groceryItems.filter(item => item.category === selectedCategory);

  // Group items by category for better organization
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, GroceryItem[]>);

  const togglePurchased = (id: string) => {
    setGroceryItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    );
  };

  const addItem = () => {
    if (!newItem.name.trim()) return;

    const item: GroceryItem = {
      id: Date.now().toString(),
      name: newItem.name,
      category: 'Other',
      quantity: newItem.quantity || '1',
      unit: newItem.unit,
      purchased: false,
    };

    setGroceryItems(prev => [...prev, item]);
    setNewItem({ name: '', quantity: '', unit: 'piece' });
  };

  const removeItem = (id: string) => {
    setGroceryItems(prev => prev.filter(item => item.id !== id));
  };

  const clearPurchased = () => {
    setGroceryItems(prev => prev.filter(item => !item.purchased));
  };

  const getStats = () => {
    const total = groceryItems.length;
    const purchased = groceryItems.filter(item => item.purchased).length;
    const remaining = total - purchased;
    return { total, purchased, remaining };
  };

  const stats = getStats();

  return (
    <div className="w-full py-8">
      <Container>
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-5 text-yum-primary-ec drop-shadow-lg yum-text-shadow-strong">
            Grocery List 🛒
          </h1>
          <p className="text-xl text-yum-text-primary">
            Keep track of your shopping list and never forget an ingredient
          </p>
        </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card variant="outlined" className="text-center p-6">
          <div className="text-2xl font-bold text-yum-primary-ec mb-1">
            {stats.total}
          </div>
          <p className="text-yum-text-secondary text-sm">Total Items</p>
        </Card>
        <Card variant="outlined" className="text-center p-6">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {stats.purchased}
          </div>
          <p className="text-yum-text-secondary text-sm">Purchased</p>
        </Card>
        <Card variant="outlined" className="text-center p-6">
          <div className="text-2xl font-bold text-yum-accent mb-1">
            {stats.remaining}
          </div>
          <p className="text-yum-text-secondary text-sm">Remaining</p>
        </Card>
      </div>

      {/* Add New Item */}
      <Card variant="elevated" className="mb-8">
        <h2 className="text-xl font-bold text-yum-primary-ec mb-4">
          Add New Item
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Item name (e.g., Tomatoes)"
              value={newItem.name}
              onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div>
            <Input
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={(e) => setNewItem(prev => ({ ...prev, quantity: e.target.value }))}
            />
          </div>
          <div className="flex gap-2">
            <select
              value={newItem.unit}
              onChange={(e) => setNewItem(prev => ({ ...prev, unit: e.target.value }))}
              className="flex-1 px-3 py-2 border border-yum-neutral-light rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-yum-primary/50"
            >
              {units.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
            <Button onClick={addItem} variant="primary">
              Add
            </Button>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Button variant="accent" className="h-12">
          📋 From Meal Plan
        </Button>
        <Button variant="secondary" className="h-12">
          🍳 From Recipe
        </Button>
        <Button variant="outline" className="h-12">
          📤 Share List
        </Button>
        <Button 
          variant="outline" 
          className="h-12 text-red-600 border-red-200 hover:bg-red-50"
          onClick={clearPurchased}
          disabled={stats.purchased === 0}
        >
          🗑️ Clear Purchased
        </Button>
      </div>

      {/* Category Filter */}
      <Card variant="elevated" className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'primary' : 'info'}
              onClick={() => setSelectedCategory(category)}
              className="cursor-pointer"
            >
              {category === 'all' ? 'All Categories' : category}
              {category !== 'all' && (
                <span className="ml-1 text-xs">
                  ({groceryItems.filter(item => item.category === category).length})
                </span>
              )}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Grocery List */}
      {filteredItems.length > 0 ? (
        <div className="space-y-6">
          {Object.entries(groupedItems).map(([category, items]) => (
            <Card key={category} variant="elevated">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-yum-primary-ec">
                  {category}
                </h3>
                <Badge variant="info">
                  {items.length} item{items.length !== 1 ? 's' : ''}
                </Badge>
              </div>
              
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                      item.purchased 
                        ? 'bg-green-50 border-green-200 opacity-60' 
                        : 'bg-white border-yum-neutral-light hover:border-yum-primary/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={item.purchased}
                        onChange={() => togglePurchased(item.id)}
                        className="w-5 h-5 text-yum-primary rounded focus:ring-yum-primary/50"
                      />
                      <div className={item.purchased ? 'line-through' : ''}>
                        <div className="font-medium text-yum-primary-ec">
                          {item.name}
                        </div>
                        <div className="text-sm text-yum-text-secondary">
                          {item.quantity} {item.unit}
                          {item.addedFrom && (
                            <span className="ml-2 text-yum-accent">
                              • from {item.addedFrom}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card variant="elevated">
          <EmptyState
            icon="🛒"
            title="No items in this category"
            description="Add items to your grocery list or select a different category."
            action={{
              label: "Show All Items",
              onClick: () => setSelectedCategory('all')
            }}
          />
        </Card>
      )}

      {/* Progress Bar */}
      {stats.total > 0 && (
        <Card variant="outlined" className="mt-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-yum-primary-ec">
              Shopping Progress
            </span>
            <span className="text-sm text-yum-text-secondary">
              {Math.round((stats.purchased / stats.total) * 100)}%
            </span>
          </div>
          <div className="w-full bg-yum-neutral-light rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(stats.purchased / stats.total) * 100}%` }}
            ></div>
          </div>
        </Card>
      )}
      </Container>
    </div>
  );
};

export default GroceryListPage;
