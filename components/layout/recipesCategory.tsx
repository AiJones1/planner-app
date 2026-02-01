import { Recipe, RecipeList, Ingredient} from '../../db/types/database_types';
import { Card, Typography } from '@mui/material';
import './recipesCategory.css';
// import './recipeList.css';

interface RecipeCategoryProps{
    recipeList: RecipeList;
}

export const RecipeCategory: React.FC<RecipeCategoryProps> = ({recipeList}) => {
    const title = recipeList.listName;
    const recipes: Recipe[] = recipeList.recipes;
    return(
        <div className='meal-row-container'>
            <Typography>{title}</Typography>
            <div className='meal-list-carousel'>
                {recipes.length==0 ? (
                    <Typography> Nothing to see here</Typography>
                ) : (                    
                    recipes.map((recipe)=>(
                        <Card className='carousel-item'
                            key={recipe.recipeId}>
                                <Typography>{recipe.name}</Typography>

                        </Card>
                    ))
                )}
            </div>
        </div>

    )
}
