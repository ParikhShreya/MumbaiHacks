import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useFamily } from '@/contexts/FamilyContext';
import { useState } from 'react';
import { ChefHat, ShoppingCart, RefreshCw, Leaf } from 'lucide-react';

const cuisineOptions = ['North Indian', 'South Indian', 'Gujarati', 'Maharashtrian', 'Bengali', 'Punjabi'];

const sampleMeals = {
  vata: {
    breakfast: 'Warm oatmeal with ghee, dates, and almonds',
    lunch: 'Dal khichdi with mixed vegetables and buttermilk',
    dinner: 'Paneer tikka with warm rotis and sautéed greens',
    snacks: ['Warm milk with turmeric', 'Soaked almonds', 'Banana'],
  },
  pitta: {
    breakfast: 'Coconut rice flakes with fresh fruits',
    lunch: 'Cooling cucumber raita with mint rice and dal',
    dinner: 'Light vegetable stir-fry with coconut chutney',
    snacks: ['Coconut water', 'Sweet fruits', 'Fennel seeds'],
  },
  kapha: {
    breakfast: 'Light poha with vegetables and ginger tea',
    lunch: 'Spiced lentil soup with millet roti',
    dinner: 'Grilled vegetables with quinoa and herbs',
    snacks: ['Apple slices', 'Green tea', 'Light dry fruits'],
  },
};

export default function MealPlanner() {
  const { selectedMember } = useFamily();
  const [selectedCuisine, setSelectedCuisine] = useState('North Indian');
  const [showGroceryList, setShowGroceryList] = useState(false);

  const prakriti = selectedMember?.prakriti?.split('-')[0] as keyof typeof sampleMeals || 'vata';
  const meals = sampleMeals[prakriti];

  const groceryList = [
    'Oats / Rice flakes - 500g',
    'Ghee - 200ml',
    'Mixed dal - 1kg',
    'Fresh vegetables (assorted)',
    'Paneer - 200g',
    'Milk - 1L',
    'Almonds - 100g',
    'Dates - 200g',
    'Turmeric powder',
    'Cumin seeds',
    'Fresh coriander',
    'Ginger - 100g',
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-display font-bold">Smart Meal Planner</h1>
            <p className="text-muted-foreground">
              AI-generated meal plans matched to your Prakriti and local cuisines
            </p>
          </div>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4" />
            Generate New Plan
          </Button>
        </div>

        {/* Cuisine Selection */}
        <div>
          <h2 className="text-sm font-medium mb-3">Select Cuisine Preference</h2>
          <div className="flex flex-wrap gap-2">
            {cuisineOptions.map(cuisine => (
              <button
                key={cuisine}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCuisine === cuisine
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                }`}
                onClick={() => setSelectedCuisine(cuisine)}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>

        {/* Prakriti Info */}
        {selectedMember?.prakriti && (
          <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center gap-3">
            <Leaf className="w-5 h-5 text-secondary" />
            <span className="text-sm">
              Meal plan optimized for <strong className="capitalize">{selectedMember.prakriti.replace('-', '/')}</strong> constitution
            </span>
          </div>
        )}

        {/* Meal Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Breakfast */}
          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-xl">🌅</span>
              </div>
              <div>
                <h3 className="font-semibold">Breakfast</h3>
                <p className="text-xs text-muted-foreground">7:00 - 8:00 AM</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">{meals.breakfast}</p>
          </div>

          {/* Lunch */}
          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <span className="text-xl">☀️</span>
              </div>
              <div>
                <h3 className="font-semibold">Lunch</h3>
                <p className="text-xs text-muted-foreground">12:00 - 1:00 PM</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">{meals.lunch}</p>
          </div>

          {/* Dinner */}
          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <span className="text-xl">🌙</span>
              </div>
              <div>
                <h3 className="font-semibold">Dinner</h3>
                <p className="text-xs text-muted-foreground">7:00 - 8:00 PM</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">{meals.dinner}</p>
          </div>
        </div>

        {/* Snacks */}
        <div className="p-6 rounded-2xl bg-card border border-border">
          <h3 className="font-semibold mb-4">Recommended Snacks</h3>
          <div className="flex flex-wrap gap-2">
            {meals.snacks.map(snack => (
              <span key={snack} className="px-3 py-1.5 rounded-full bg-muted text-sm">
                {snack}
              </span>
            ))}
          </div>
        </div>

        {/* Grocery List */}
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Weekly Grocery List</h3>
                <p className="text-xs text-muted-foreground">{groceryList.length} items</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowGroceryList(!showGroceryList)}
            >
              {showGroceryList ? 'Hide' : 'View'} List
            </Button>
          </div>
          
          {showGroceryList && (
            <div className="grid sm:grid-cols-2 gap-2 mt-4">
              {groceryList.map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                  <div className="w-4 h-4 rounded border border-muted-foreground/30" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
