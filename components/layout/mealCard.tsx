import { Recipe } from "@/db/types/database_types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";



interface MealCardProps {
  recipe: Recipe | null;
  mealType: string;
  time?: string; // e.g., "Breakfast", "Lunch", "Dinner"

}

export const MealCard: React.FC<MealCardProps> = ({ recipe, mealType, time }) => {
  return (
    <Card variant="outlined" sx={{ minWidth: 200, marginBottom: 2 }}>
      <CardContent>
        <h3>{mealType}</h3>
        {recipe ? (
          <>          
            <h4>{recipe.name}</h4>
            <p>{recipe.description}</p>
            <p>Cooking Time: {time} mins</p>
          </>
        ) : (
          <p>No recipe assigned</p>
        )}
      </CardContent>
    </Card>
  );
}