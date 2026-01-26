"use client";

import React, { useState, useEffect } from 'react';
import { Grid, Box, Paper, Typography } from '@mui/material';
import { DayMeal, MealPlan, Recipe, RecipeList } from '../../db/types/database_types';

import { 
  createWeeklyMealPlan, 
  getRandomRecipe,
  filterRecipesByMealType,
} from '@/utils/utilsFunctions';

// Mock data - replace with your actual data source
import { mockRecipeList, mockRecipes } from '../../db/temp/dummyData';
import { MealCard } from '@/components/layout/mealCard';
import { MealPlanGrid } from '@/components/layout/weeklyMeals';




const Calendar: React.FC = () => {

  var weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay()); 

  var myRecipeList = mockRecipeList.recipes;
  // var mealPlan: MealPlan = createWeeklyMealPlan(myRecipeList, weekStart);
  var testWeeklyPlan = createWeeklyMealPlan(myRecipeList, weekStart).days;
  console.log(testWeeklyPlan);

  return (  
    <div className="calendar-container">
        <h1 className="calendar-title">Weekly Meal Planner</h1>
        <div className='recipe-list'>
          <MealPlanGrid weeklyPlan={testWeeklyPlan}/>
        </div>
        <div className='meal-plan'>
        </div>
    </div>
  );
};

export default Calendar;