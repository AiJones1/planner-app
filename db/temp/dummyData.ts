// utils/dummyData.ts

import { Recipe, Ingredient, RecipeIngredient, User, RecipeList } from '../types/database_types';

// Dummy Ingredients
export const dummyIngredients: Ingredient[] = [
  { ingredientId: '1', name: 'Flour', unit: 'cups' },
  { ingredientId: '2', name: 'Sugar', unit: 'cups' },
  { ingredientId: '3', name: 'Eggs', unit: 'pieces' },
  { ingredientId: '4', name: 'Milk', unit: 'ml' },
  { ingredientId: '5', name: 'Butter', unit: 'tablespoons' },
  { ingredientId: '6', name: 'Salt', unit: 'teaspoons' },
  { ingredientId: '7', name: 'Black Pepper', unit: 'teaspoons' },
  { ingredientId: '8', name: 'Chicken Breast', unit: 'grams' },
  { ingredientId: '9', name: 'Rice', unit: 'cups' },
  { ingredientId: '10', name: 'Tomatoes', unit: 'pieces' },
  { ingredientId: '11', name: 'Onions', unit: 'pieces' },
  { ingredientId: '12', name: 'Garlic', unit: 'cloves' },
  { ingredientId: '13', name: 'Olive Oil', unit: 'tablespoons' },
  { ingredientId: '14', name: 'Pasta', unit: 'grams' },
  { ingredientId: '15', name: 'Cheese', unit: 'grams' },
  { ingredientId: '16', name: 'Baking Powder', unit: 'teaspoons' },
  { ingredientId: '17', name: 'Vanilla Extract', unit: 'teaspoons' },
  { ingredientId: '18', name: 'Lettuce', unit: 'cups' },
  { ingredientId: '19', name: 'Cucumber', unit: 'pieces' },
  { ingredientId: '20', name: 'Lemon Juice', unit: 'tablespoons' },
];

// Dummy Recipe Ingredients
export const dummyRecipeIngredients: RecipeIngredient[] = [
  // Pancakes ingredients
  { recipeId: '1', ingredientId: '1', quantity: 2 },
  { recipeId: '1', ingredientId: '2', quantity: 2 },
  { recipeId: '1', ingredientId: '3', quantity: 2 },
  { recipeId: '1', ingredientId: '4', quantity: 240 },
  { recipeId: '1', ingredientId: '5', quantity: 2 },
  { recipeId: '1', ingredientId: '16', quantity: 1 },
  
  // Grilled Chicken ingredients
  { recipeId: '2', ingredientId: '8', quantity: 500 },
  { recipeId: '2', ingredientId: '6', quantity: 1 },
  { recipeId: '2', ingredientId: '7', quantity: 0.5 },
  { recipeId: '2', ingredientId: '13', quantity: 2 },
  
  // Spaghetti Carbonara ingredients
  { recipeId: '3', ingredientId: '14', quantity: 400 },
  { recipeId: '3', ingredientId: '3', quantity: 3 },
  { recipeId: '3', ingredientId: '15', quantity: 200 },
  { recipeId: '3', ingredientId: '7', quantity: 1 },
  
  // Garden Salad ingredients
  { recipeId: '4', ingredientId: '18', quantity: 4 },
  { recipeId: '4', ingredientId: '19', quantity: 1 },
  { recipeId: '4', ingredientId: '10', quantity: 2 },
  { recipeId: '4', ingredientId: '20', quantity: 2 },
  { recipeId: '4', ingredientId: '13', quantity: 3 },
];

// Dummy Recipes (with complete structure)
export const mockRecipes: Recipe[] = [
  {
    recipeId: '1',
    name: 'Classic Pancakes',
    description: 'Fluffy and delicious breakfast pancakes',
    mealType: 'Breakfast',
    servingSize: 4,
    cookingTime: 20,
    mealCategory: 'Vegetarian',
    ingredients: dummyRecipeIngredients.filter(ri => ri.recipeId === '1'),
    instructions: [
      'Mix dry ingredients in a bowl',
      'In another bowl, whisk eggs, milk, and melted butter',
      'Combine wet and dry ingredients',
      'Cook on a hot griddle until golden brown',
      'Serve with maple syrup'
    ]
  },
  {
    recipeId: '2',
    name: 'Grilled Chicken',
    description: 'Juicy grilled chicken with herbs',
    mealType: 'Lunch',
    servingSize: 2,
    cookingTime: 30,
    mealCategory: 'Protein',
    ingredients: dummyRecipeIngredients.filter(ri => ri.recipeId === '2'),
    instructions: [
      'Season chicken with salt and pepper',
      'Marinate with olive oil for 15 minutes',
      'Preheat grill to medium-high',
      'Grill chicken for 6-7 minutes per side',
      'Let rest for 5 minutes before serving'
    ]
  },
  {
    recipeId: '3',
    name: 'Spaghetti Carbonara',
    description: 'Creamy Italian pasta dish',
    mealType: 'Dinner',
    servingSize: 3,
    cookingTime: 25,
    mealCategory: 'Italian',
    ingredients: dummyRecipeIngredients.filter(ri => ri.recipeId === '3'),
    instructions: [
      'Cook pasta according to package directions',
      'Whisk eggs and grated cheese in a bowl',
      'Reserve 1 cup pasta water before draining',
      'Combine hot pasta with egg mixture',
      'Add pasta water as needed for creaminess'
    ]
  },
  {
    recipeId: '4',
    name: 'Fresh Garden Salad',
    description: 'Healthy and refreshing salad',
    mealType: 'Lunch',
    servingSize: 2,
    cookingTime: 10,
    mealCategory: 'Vegetarian',
    ingredients: dummyRecipeIngredients.filter(ri => ri.recipeId === '4'),
    instructions: [
      'Chop all vegetables',
      'Mix lettuce, cucumber, and tomatoes',
      'Whisk lemon juice and olive oil for dressing',
      'Toss salad with dressing',
      'Season with salt and pepper to taste'
    ]
  }
];

// Dummy User
export const dummyUser: User = {
  userId: 'user-123',
  name: 'John Doe',
  email: 'john@example.com',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-15')
};



export const mockRecipeList: RecipeList = {
  recipeListId: 'list-123',
  listName: 'My Favorite Recipes',
  userId: 'user-123',
  recipes: mockRecipes
};

