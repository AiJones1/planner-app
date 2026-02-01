import { Grid, Card, Typography, Box, Stack } from '@mui/material';
import { DayMeal, Recipe } from '../../db/types/database_types';
import { MealCard } from '../layout/mealCard';

interface MealPlanProps {
  weeklyPlan: DayMeal[];
  onDeleteMeal: (dayIndex: number, mealType: 'breakfast' | 'lunch' | 'dinner') => void;
  onEditMeal: (dayIndex: number, mealType: 'breakfast'|'lunch'|'dinner') => void; 
}

export const MealPlanGrid: React.FC<MealPlanProps> = ({ weeklyPlan, onDeleteMeal, onEditMeal }) => {
  const mealTypes: ('breakfast' | 'lunch' | 'dinner')[] = ['breakfast', 'lunch', 'dinner'];
  

  return (
    <Box sx={{width:'100%'}}>
        <Grid container spacing={1}>
            {weeklyPlan.map((day, dayIndex) => (
              <Grid key={dayIndex} size={{xs:2, md: 12/7}}>
                <Typography>{day.dayOfWeek}</Typography>
                {mealTypes.map((mealType) => {
                  const recipe = day[mealType];

                  return(
                    <Box key={mealType}>
                    {recipe ? (
                        <MealCard 
                          recipe={recipe} 
                          onDelete={() => onDeleteMeal(dayIndex, mealType)}
                          onEdit={() => onEditMeal(dayIndex, mealType)}
                        />
                      ) : (
                        <Card sx={{ p: 2, textAlign: 'center' }}>
                          <p>Nothing planned</p>

                        </Card>
                      )}
                    </Box>
                  );
                })}


              </Grid>
            ))}       
        </Grid>
    </Box>
  );
};

              //  {day.breakfast ? (
              //     <MealCard 
              //       recipe={day.breakfast} 
              //       onDelete={()=> onDeleteMeal(dayIndex, 'breakfast')}
              //     />
              //   ) : (
              //     <Card>Nothing planned</Card>
              //   )}
              //                  {day.lunch ? (
              //     <MealCard 
              //       recipe={day.lunch} 
              //       onDelete={()=> onDeleteMeal(dayIndex, 'lunch')}
              //     />
              //   ) : (
              //     <Card>Nothing planned</Card>
              //   )}
              //   {day.dinner ? (
              //     <MealCard 
              //       recipe={day.dinner} 
              //       onDelete={()=> onDeleteMeal(dayIndex, 'dinner')}
              //     />
              //   ) : (
              //     <Card>Nothing planned</Card>
              //   )}