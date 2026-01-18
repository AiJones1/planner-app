"use client";

import React, { useState, useEffect } from 'react';
import { DayMeal, MealPlan, Recipe, RecipeList } from '../../db/types/database_types';

import { 
  createWeeklyMealPlan, 
  getRandomRecipe,
  filterRecipesByMealType,
  getRecipesByMealTypes,
  UserPreferences,
  defaultUserPreferences 
} from '@/utils/utilsFunctions';

// Mock data - replace with your actual data source
import { mockRecipeList, mockRecipes } from '../../db/temp/dummyData';
import { MealCard } from '@/components/layout/mealCard';

const Calendar: React.FC = () => {

  var weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Set to Sunday

  var myRecipeList = mockRecipeList.recipes;


  return (  
    <div className="calendar-container">
        <h1 className="calendar-title">Weekly Meal Planner</h1>
        {myRecipeList.map((Recipe) => (
          <MealCard key={Recipe.recipeId} recipe={Recipe} mealType={Recipe.mealType} time={Recipe.cookingTime.toString()} />
        ))}
        
    </div>
  );
};

export default Calendar;