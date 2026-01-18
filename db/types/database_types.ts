// File for database entitites


export interface User {
  userId: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Recipe{
    recipeId: string;
    name: string;
    description: string;
    mealType: string;
    servingSize: number;
    cookingTime: number; // minutes
    mealCategory: string;
    ingredients: RecipeIngredient[];
    instructions: string[];
}

export interface Ingredient{
    ingredientId: string;
    name: string;
    unit: string;
}

export interface RecipeIngredient{
    recipeId: string;
    ingredientId: string;
    quantity: number;
}

export interface DayMeal{
    dayID: Date;
    breakfast: Recipe | null;
    lunch: Recipe | null;
    dinner: Recipe | null;
}

export interface MealPlan{
    mealPlanId: Date;
    userId: string;
    days: DayMeal[];
}

export interface ShoppingListItem{
    ingredient: Ingredient;
    substituteOptions: Ingredient[];
    totalQuantity: number;
    unit: string;
}

export interface ShoppingList{
    shoppingListId: string;
    userId: string;
    items: ShoppingListItem[];
}

export interface RecipeList{
    recipeListId: string;
    listName: string;
    userId: string;
    recipes: Recipe[];
}
