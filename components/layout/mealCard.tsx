import { Recipe } from "@/db/types/database_types";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";



interface MealCardProps {
  recipe: Recipe;
  onDelete?: () => void;
  onEdit?: () => void;
}

export const MealCard: React.FC<MealCardProps> = ({ recipe, onDelete, onEdit}) => {
  return (
    <Card variant="outlined" >
      <CardContent>
        {recipe ? (
          <div>          
            <h4>{recipe.name}</h4>
            <p>{recipe.description}</p>
            <p>Cooking Time: {recipe.cookingTime} mins</p>
            <div className="mealcard-buttons">
              <IconButton onClick ={onDelete}>
                <DeleteIcon/>
              </IconButton>
              <IconButton onClick ={onEdit}>
                <AddIcon/>
              </IconButton>
            </div>

          </div>
        ) : (
          <p>No recipe assigned</p>
        )}
      </CardContent>
    </Card>
  );
}