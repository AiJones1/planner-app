"use client";

import React, { useState, useEffect } from 'react';
import { Grid, Box, Paper, Typography } from '@mui/material';
import { DayMeal, MealPlan, Recipe, RecipeList, ShoppingListItem } from '../../db/types/database_types';

import { 
  createWeeklyMealPlan, 
  getRandomRecipe,
  filterRecipesByMealType,  // filter may be utilised in future
  generateShoppingList  // Import your function
} from '@/utils/utilsFunctions';

// Mock data - replace with your actual data source
import { mockRecipeList, mockRecipes } from '../../db/temp/dummyData';
import { MealCard } from '@/components/layout/mealCard';
import { MealPlanGrid } from '@/components/ui/weeklyMeals';
import { GroceryList } from '@/components/ui/groceryList'; 
import { RecipeModal } from '@/components/ui/recipeModal';
// recipe selector to be added

const Calendar: React.FC = () => {
  const [weeklyPlan, setWeeklyPlan] = useState<DayMeal[]>([]);
  const [groceryList, setGroceryList] = useState<ShoppingListItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRecipes, setModalRecipes ] = useState<Recipe[]>([]);
  const [selectedMealSlot, setSelectedMealSlot ] = useState<{
    dayIndex: number;
    mealType: 'breakfast'| 'lunch' | 'dinner';
  } | null>(null);
  
  useEffect(() => {
    const loadData = () => {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - weekStart.getDay()); 
      const myRecipeList = mockRecipeList.recipes;
      const plan = createWeeklyMealPlan(myRecipeList, weekStart);
      
      setWeeklyPlan(plan.days);
      console.log(plan.days);
      
      // Generate grocery list
      const shoppingList = generateShoppingList(plan.days);
      setGroceryList(shoppingList);
      setLoading(false);
    };
    
    loadData();
  }, []);

  // 
  const updateGroceryList = (plan: DayMeal[]) => {
    const shoppingList = generateShoppingList(plan);
    setGroceryList(shoppingList);
  }

  const handleDeleteMeal = (dayIndex: number, mealType: 'breakfast'|'lunch'|'dinner')=>{ 
    const updatedPlan =[...weeklyPlan];
    updatedPlan[dayIndex] = {
      ...updatedPlan[dayIndex],
      [mealType]:null
    };
    console.log('Function call: delete meal $\n');
    console.log('weekly plan currently: ', weeklyPlan.toString)
    console.log('updated plan: ', updatedPlan.toString)
    setWeeklyPlan(updatedPlan);
    updateGroceryList(updatedPlan);
    console.log('weekly plan after update: ', weeklyPlan.toString)
  }

// Modal Handling Functions

  // Recipe Selection -> pop up version list recipes to have for mealslot
  const handleOpenRecipeModal = (dayIndex: number, mealType: 'breakfast'|'lunch'|'dinner') => {
    // Can filter for mealType, will allow for all meals at current;
      // const recipes = mockRecipes.filter(
      //  recipe => recipe.mealType.toLowerCase() == mealType.toLowerCase();
      // );
    const recipes: Recipe[] = mockRecipes;

    setSelectedMealSlot({dayIndex, mealType});
    setModalRecipes(recipes);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMealSlot(null);
    setModalRecipes([]);
  }

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isModalOpen]);

  // Selected Recipe from Modal
  const handleSelectRecipe = (recipe: Recipe) => {
    if (selectedMealSlot) {
      const { dayIndex, mealType } = selectedMealSlot;
      const updatedPlan = [...weeklyPlan];
      updatedPlan[dayIndex] = {
        ...updatedPlan[dayIndex],
        [mealType]: recipe
      };
      setWeeklyPlan(updatedPlan);
      updateGroceryList(updatedPlan);
      closeModal();
    }
  }

  if (loading) {
    return <div>Loading meal plan...</div>;
  }

  return (  
    <div className="calendar-container">
      <h1 className="calendar-title">Weekly Meal Planner</h1>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <div className='meal-plan' style={{ flex: 3 }}>
          <MealPlanGrid weeklyPlan={weeklyPlan} onDeleteMeal={handleDeleteMeal} onEditMeal={handleOpenRecipeModal}/>
        </div>
        
        <div className='grocery-list' style={{ flex: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Grocery List
            </Typography>
            <GroceryList shoppingList={groceryList}/>
          </Paper>
        </div>
      </div>
      <RecipeModal
        recipes={modalRecipes}
        isOpen={isModalOpen}
        onClose={closeModal}
        onSelectRecipe={handleSelectRecipe}
      />
    </div>
  );
};

export default Calendar;