// utils/recipeUtils.ts

import { 
  Recipe, 
  RecipeList,
  MealPlan,
  DayMeal,
  ShoppingList,
  ShoppingListItem,
  RecipeIngredient,
  Ingredient
  } from '../db/types/database_types';


export function filterRecipesByMealType(
  recipes: Recipe[], 
  mealType: string
): Recipe[] {
  return recipes.filter(recipe => 
    recipe.mealType.toLowerCase() === mealType.toLowerCase()
  );
}

export function filterRecipesByCategory(
  recipes: Recipe[], 
  category: string
): Recipe[] {
  return recipes.filter(recipe => 
    recipe.mealCategory.toLowerCase() === category.toLowerCase()
  );
}

export function filterRecipesByCookingTime(
  recipes: Recipe[], 
  maxTime: number
): Recipe[] {
  return recipes.filter(recipe => recipe.cookingTime <= maxTime);
}

export function filterRecipesByIngredients(
  recipes: Recipe[],
  availableIngredientIds: string[]
): Recipe[] {
  return recipes.filter(recipe =>
    recipe.ingredients.every(ri => 
      availableIngredientIds.includes(ri.ingredientId)
    )
  );
}

// ============== GETTER FUNCTIONS ==============

export function getRecipeById(
  recipes: Recipe[], 
  recipeId: string
): Recipe | undefined {
  return recipes.find(recipe => recipe.recipeId === recipeId);
}

export function getRecipesByMealTypes(
  recipes: Recipe[], 
  mealTypes: string[]
): Map<string, Recipe[]> {
  const result = new Map<string, Recipe[]>();
  
  mealTypes.forEach(mealType => {
    const filtered = filterRecipesByMealType(recipes, mealType);
    result.set(mealType.toLowerCase(), filtered);
  });
  
  return result;
}

export function getRandomRecipe(recipes: Recipe[]): Recipe | null {
  if (recipes.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * recipes.length);
  return recipes[randomIndex];
}

export function getRandomRecipes(
  recipes: Recipe[], 
  count: number
): Recipe[] {
  if (count >= recipes.length) return [...recipes];
  
  const shuffled = [...recipes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// ============== MEAL PLANNING FUNCTIONS ==============

export interface UserPreferences {
  planDays: number; // 7 for days of week
  includeWeekends: boolean;
  mealsPerDay: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
  cookingTimeLimit?: number; 
  avoidDuplicates: boolean; 
}

export const defaultUserPreferences: UserPreferences = {
  planDays: 7,
  includeWeekends: true,
  mealsPerDay: {
    breakfast: true,
    lunch: true,
    dinner: true
  },
  avoidDuplicates: true
};

export function createWeeklyMealPlan(
  recipeList: RecipeList,
  preferences: UserPreferences = defaultUserPreferences
): MealPlan {
  const { planDays, mealsPerDay, avoidDuplicates } = preferences;
  const allRecipes = recipeList.recipes;
  
  // Group by meal type
  const recipesByMealType = getRecipesByMealTypes(allRecipes, [
    'breakfast', 'lunch', 'dinner'
  ]);
  
  const days: DayMeal[] = [];
  const usedRecipeIds = new Set<string>();
  
  for (let i = 0; i < planDays; i++) {
    const day = new Date();
    day.setDate(day.getDate() + i);
    
    const dayOfWeek = day.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    if (isWeekend && !preferences.includeWeekends) {
      continue;
    }
    
    const dayMeal: DayMeal = {
      dayID: new Date(day),
      breakfast: null,
      lunch: null,
      dinner: null
    };
    
    // Assign meals based on preferences
    if (mealsPerDay.breakfast) {
      dayMeal.breakfast = getRandomMeal(
        recipesByMealType.get('breakfast') || [],
        usedRecipeIds,
        avoidDuplicates,
        preferences
      );
    }
    
    if (mealsPerDay.lunch) {
      dayMeal.lunch = getRandomMeal(
        recipesByMealType.get('lunch') || [],
        usedRecipeIds,
        avoidDuplicates,
        preferences
      );
    }
    
    if (mealsPerDay.dinner) {
      dayMeal.dinner = getRandomMeal(
        recipesByMealType.get('dinner') || [],
        usedRecipeIds,
        avoidDuplicates,
        preferences
      );
    }
    
    days.push(dayMeal);
  }
  
  return {
    mealPlanId: new Date(), 
    userId: recipeList.userId,
    days
  };
}

function getRandomMeal(
  recipes: Recipe[],
  usedRecipeIds: Set<string>,
  avoidDuplicates: boolean,
  preferences: UserPreferences
): Recipe | null {
  if (recipes.length === 0) return null;
  
  let availableRecipes = [...recipes];
  if (preferences.cookingTimeLimit) {
    availableRecipes = filterRecipesByCookingTime(
      availableRecipes, 
      preferences.cookingTimeLimit
    );
  }
  
  if (avoidDuplicates && usedRecipeIds.size > 0) {
    availableRecipes = availableRecipes.filter(
      recipe => !usedRecipeIds.has(recipe.recipeId)
    );
  }
  

  if (availableRecipes.length === 0) {
    if (avoidDuplicates) {
      return null; 
    } else {
      const recipe = getRandomRecipe(recipes);
      if (recipe) usedRecipeIds.add(recipe.recipeId);
      return recipe;
    }
  }
  
  const recipe = getRandomRecipe(availableRecipes);
  if (recipe) {
    usedRecipeIds.add(recipe.recipeId);
  }
  
  return recipe;
}

export function generateMealPlanFromPreferences(
  recipeList: RecipeList,
  preferences: Partial<UserPreferences> = {}
): MealPlan {
  const mergedPreferences: UserPreferences = {
    ...defaultUserPreferences,
    ...preferences
  };
  
  return createWeeklyMealPlan(recipeList, mergedPreferences);
}

// ============== SHOPPING LIST FUNCTIONS ==============

export function generateShoppingList(
  mealPlan: MealPlan,
  ingredients: Ingredient[]
): ShoppingList {
  const ingredientMap = new Map<string, ShoppingListItem>();
  
  mealPlan.days.forEach(day => {
    const meals = [day.breakfast, day.lunch, day.dinner].filter(Boolean) as Recipe[];
    
    meals.forEach(recipe => {
      recipe.ingredients.forEach(recipeIngredient => {
        const existing = ingredientMap.get(recipeIngredient.ingredientId);
        const ingredient = ingredients.find(i => i.ingredientId === recipeIngredient.ingredientId);
        
        if (!ingredient) return;
        
        if (existing) {
          existing.totalQuantity += recipeIngredient.quantity;
        } else {
          ingredientMap.set(recipeIngredient.ingredientId, {
            ingredient,
            substituteOptions: [], 
            totalQuantity: recipeIngredient.quantity,
            unit: ingredient.unit
          });
        }
      });
    });
  });
  
  return {
    shoppingListId: `sl-${Date.now()}`,
    userId: mealPlan.userId,
    items: Array.from(ingredientMap.values())
  };
}

// ============== VALIDATION FUNCTIONS ==============

export function validateMealPlan(mealPlan: MealPlan): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (!mealPlan.userId) {
    errors.push('Meal plan must have a userId');
  }
  
  if (!mealPlan.days || mealPlan.days.length === 0) {
    errors.push('Meal plan must have at least one day');
  }
  
  mealPlan.days.forEach((day, index) => {
    if (!day.dayID) {
      errors.push(`Day ${index + 1} must have a valid date`);
    }
    
    const hasMeal = day.breakfast || day.lunch || day.dinner;
    if (!hasMeal) {
      errors.push(`Day ${index + 1} must have at least one meal`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// ============== UTILITY FUNCTIONS ==============

export function getUpcomingDays(startDate: Date, count: number): Date[] {
  const days: Date[] = [];
  
  for (let i = 0; i < count; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    days.push(date);
  }
  
  return days;
}

export function getMealCount(mealPlan: MealPlan): {
  breakfast: number;
  lunch: number;
  dinner: number;
  total: number;
} {
  let breakfast = 0;
  let lunch = 0;
  let dinner = 0;
  
  mealPlan.days.forEach(day => {
    if (day.breakfast) breakfast++;
    if (day.lunch) lunch++;
    if (day.dinner) dinner++;
  });
  
  return {
    breakfast,
    lunch,
    dinner,
    total: breakfast + lunch + dinner
  };
}

export function getIngredientsForMealPlan(mealPlan: MealPlan): RecipeIngredient[] {
  const allIngredients: RecipeIngredient[] = [];
  
  mealPlan.days.forEach(day => {
    const meals = [day.breakfast, day.lunch, day.dinner].filter(Boolean) as Recipe[];
    
    meals.forEach(recipe => {
      allIngredients.push(...recipe.ingredients);
    });
  });
  
  return allIngredients;
}