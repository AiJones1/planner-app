'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Ingredient {
  ingredient_id: string;
  name: string;
  unit: string;
  category: string | null;
}

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadIngredients();
  }, []);

  const loadIngredients = async () => {
    try {
      setLoading(true);
      const data = await api.getIngredients();
      setIngredients(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load ingredients');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8">Loading ingredients...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Ingredients</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ingredients.map((ingredient) => (
          <div key={ingredient.ingredient_id} className="border rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold">{ingredient.name}</h2>
            <p className="text-gray-600">Unit: {ingredient.unit}</p>
            {ingredient.category && (
              <p className="text-sm text-gray-500">Category: {ingredient.category}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}