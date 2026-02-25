import { Card, Box, IconButton, Typography, Button } from '@mui/material';
import { Recipe } from '../../db/types/database_types';
import CloseIcon from '@mui/icons-material/Close';
import './recipeModal.css'; 

interface RecipeModalProps {
  recipes: Recipe[];
  isOpen: boolean;
  onClose: () => void;
  onSelectRecipe: (recipe: Recipe) => void; // Add this prop
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ 
  recipes, 
  isOpen, 
  onClose, 
  onSelectRecipe 
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Blurred backdrop */}
      <div 
        className="modal-backdrop" 
        onClick={onClose}
        role="presentation"
        aria-hidden="true"
      />
      
      {/* Modal container */}
      <div className="modal-container">
        {/* Modal content */}
        <Box 
          className="modal-content"
          onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
        >
          {/* Header */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '1.5rem 1.5rem 1rem',
            borderBottom: '1px solid #e0e0e0'
          }}>
            <Typography variant="h6" component="h2">
              Select a Recipe
            </Typography>
            <IconButton 
              onClick={onClose}
              size="small"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
          
          {/* Recipes list */}
          <Box sx={{ padding: '1.5rem', maxHeight: '60vh', overflowY: 'auto' }}>
            {recipes.length === 0 ? (
              <Typography color="text.secondary" align="center">
                No recipes available for this meal type
              </Typography>
            ) : (
              recipes.map((recipe) => (
                <Card 
                  key={recipe.recipeId} 
                  sx={{ 
                    mb: 2, 
                    p: 2, 
                    cursor: 'pointer',
                    '&:hover': { 
                      backgroundColor: '#f5f5f5',
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s'
                    }
                  }}
                  onClick={() => onSelectRecipe(recipe)} // Call onSelectRecipe when clicked
                >
                  <Typography variant="subtitle1" fontWeight="medium">
                    {recipe.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {recipe.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mt: 1.5 }}>
                    <Typography variant="caption">
                      ⏱️ {recipe.cookingTime} min
                    </Typography>
                    <Typography variant="caption">
                      👥 Serves {recipe.servingSize}
                    </Typography>
                    <Typography variant="caption">
                      🍽️ {recipe.mealCategory}
                    </Typography>
                  </Box>
                </Card>
              ))
            )}
          </Box>
          
          {/* Footer */}
          <Box sx={{ 
            padding: '1rem 1.5rem',
            borderTop: '1px solid #e0e0e0',
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <Button 
              onClick={onClose} 
              variant="outlined"
              sx={{ minWidth: '100px' }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </div>
    </>
  );
};