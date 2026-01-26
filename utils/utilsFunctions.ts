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

export function getRandomRecipe(recipes: Recipe[]): Recipe | null {
  if (recipes.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * recipes.length);
  return recipes[randomIndex];
}


// ============== MEAL PLANNING FUNCTIONS ==============
export function createWeeklyMealPlan(recipes: Recipe[], startOfWeek: Date) {
  const weekdays = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
  const weeklyPlan: DayMeal[]=[];

  const breakfastRecipes = recipes.filter(recipe => recipe.mealType.toLowerCase() === "breakfast");
  const lunchRecipes = recipes.filter(recipe => recipe.mealType.toLowerCase() === "lunch");
  const dinnerRecipes = recipes.filter(recipe => recipe.mealType.toLowerCase() === "dinner");

  for(var i=0; i<weekdays.length; i++){
    const dayDate = new Date();
    dayDate.setDate(startOfWeek.getDate()+i);

    const dayMeal: DayMeal = {
      dayId: dayDate,
      dayOfWeek: weekdays[i],
      breakfast: getRandomMeal(breakfastRecipes),
      lunch: getRandomMeal(lunchRecipes),
      dinner: getRandomMeal(dinnerRecipes)
    };
    weeklyPlan.push(dayMeal);
    // add conditionals for filling meal
  }  
  var mealPlan: MealPlan = {
    mealPlanId: startOfWeek,
    // Update user ID later to accept and adjust mealplan for user settings
    userId: '1',
    days: weeklyPlan
  }
  return mealPlan;
}

function getRandomMeal(recipes: Recipe[] ){
  var n = recipes.length;
  var chosen = Math.floor(Math.random()*n);
  var recipe = recipes[chosen];
  return recipe;
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