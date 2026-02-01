// import React, { useState, useEffect } from 'react';
import { Grid, Box, Paper, Typography } from '@mui/material';
import { Recipe, RecipeList, Ingredient} from '../../db/types/database_types';
import {RecipeCategory} from '../../components/layout/recipesCategory';
// Temp dummy data before database setup
import { mockRecipeList, mockRecipes } from '../../db/temp/dummyData';


const Meals: React.FC = () => {
    // Temp recipe list -> plan to have user list and generalised list(s)
    // const categoryRecipes: Recipe[] = mockRecipeList;
    // const recList: RecipeList = {
    //     recipeListId: '123',
    //     listName: 'Dummy Recipe List',
    //     userId: '123',
    //     recipes: categoryRecipes
    // }

    return (
        <Box>
            <div className='meals-list-container'>
                <h2 className='meals-page-title'>Explore Recipes</h2>
                <div className='meals-category-row'>
                    <RecipeCategory recipeList={mockRecipeList}/>
                    {/* This may need to accept a list of recipes with category heading */}
                </div>
            </div>
            
        </Box>
    )
}

export default Meals;