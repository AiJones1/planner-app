import { Recipe } from "@/db/types/database_types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";



interface MealCardProps {
  recipe: Recipe;
}

export const MealCard: React.FC<MealCardProps> = ({ recipe}) => {
  return (
    <Card variant="outlined" >
      <CardContent>
        {recipe ? (
          <>          
            <h4>{recipe.name}</h4>
            <p>{recipe.description}</p>
            <p>Cooking Time: {recipe.cookingTime} mins</p>
          </>
        ) : (
          <p>No recipe assigned</p>
        )}
      </CardContent>
    </Card>
  );
}