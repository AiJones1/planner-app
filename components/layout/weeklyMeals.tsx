import { Grid, Card, Typography, Box, Stack } from '@mui/material';
import { DayMeal } from '../../db/types/database_types';
import { MealCard } from './mealCard';

interface MealPlanProps {
  weeklyPlan: DayMeal[];
}

export const MealPlanGrid: React.FC<MealPlanProps> = ({ weeklyPlan }) => {
  const mealTypes = ["Breakfast", "Lunch", "Dinner"];
  

  return (
    <Box sx={{width:'100%'}}>
        <Grid container spacing={1}>
            {weeklyPlan.map((day, dayIndex) => (
              <Grid key={dayIndex} size={{xs:2, md: 12/7}}>
                <Typography>{day.dayOfWeek}</Typography>
               {day.breakfast ? (
                  <MealCard recipe={day.breakfast} />
                ) : (
                  <Card>No breakfast planned</Card>
                )}
                               {day.lunch ? (
                  <MealCard recipe={day.lunch} />
                ) : (
                  <Card>No breakfast planned</Card>
                )}
                               {day.dinner ? (
                  <MealCard recipe={day.dinner} />
                ) : (
                  <Card>No breakfast planned</Card>
                )}
              </Grid>
            ))}       
        </Grid>
    </Box>
  );
};