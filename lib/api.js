// Base URL for your backend API
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Generic fetch wrapper with error handling
async function fetchAPI(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const data = await res.json();
  
  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  
  return data;
}

// API service functions
export const api = {
  // =====================================================
  // INGREDIENTS
  // =====================================================
  getIngredients: () => fetchAPI('/ingredients'),
  
  getIngredient: (id) => fetchAPI(`/ingredients/${id}`),
  
  createIngredient: (ingredient) => fetchAPI('/ingredients', {
    method: 'POST',
    body: JSON.stringify(ingredient),
  }),
  
  updateIngredient: (id, updates) => fetchAPI(`/ingredients/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  }),
  
  deleteIngredient: (id) => fetchAPI(`/ingredients/${id}`, {
    method: 'DELETE',
  }),

  // =====================================================
  // RECIPES
  // =====================================================
  getRecipes: () => fetchAPI('/recipes'),
  
  getRecipe: (id) => fetchAPI(`/recipes/${id}`),
  
  getUserRecipes: (userId) => fetchAPI(`/recipes/user/${userId}`),
  
  createRecipe: (recipe) => fetchAPI('/recipes', {
    method: 'POST',
    body: JSON.stringify(recipe),
  }),
  
  updateRecipe: (id, updates) => fetchAPI(`/recipes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  }),
  
  deleteRecipe: (id) => fetchAPI(`/recipes/${id}`, {
    method: 'DELETE',
  }),

  // =====================================================
  // USERS
  // =====================================================
  getUsers: () => fetchAPI('/users'),
  
  getUser: (id) => fetchAPI(`/users/${id}`),
  
  createUser: (user) => fetchAPI('/users', {
    method: 'POST',
    body: JSON.stringify(user),
  }),

  // =====================================================
  // MEAL PLANS
  // =====================================================
  getMealPlans: (userId) => fetchAPI(`/meal-plans/user/${userId}`),
  
  getMealPlan: (id) => fetchAPI(`/meal-plans/${id}`),
  
  createMealPlan: (data) => fetchAPI('/meal-plans', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  createFullWeekPlan: (userId, weekStartDate) => fetchAPI('/meal-plans/full-week', {
    method: 'POST',
    body: JSON.stringify({ user_id: userId, week_start_date: weekStartDate }),
  }),

  // =====================================================
  // SHOPPING LISTS
  // =====================================================
  getShoppingLists: (userId) => fetchAPI(`/shopping-lists/user/${userId}`),
  
  getLatestShoppingList: (userId) => fetchAPI(`/shopping-lists/user/${userId}/latest`),
  
  generateShoppingList: (mealPlanId, userId) => fetchAPI('/shopping-lists/from-meal-plan', {
    method: 'POST',
    body: JSON.stringify({ meal_plan_id: mealPlanId, user_id: userId }),
  }),

  // =====================================================
  // RECIPE LISTS (Collections)
  // =====================================================
  getRecipeLists: (userId) => fetchAPI(`/recipe-lists/user/${userId}`),
  
  getRecipeList: (id) => fetchAPI(`/recipe-lists/${id}`),
  
  createRecipeList: (data) => fetchAPI('/recipe-lists', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  addRecipeToList: (listId, recipeId) => fetchAPI(`/recipe-lists/${listId}/recipes/${recipeId}`, {
    method: 'POST',
  }),
};