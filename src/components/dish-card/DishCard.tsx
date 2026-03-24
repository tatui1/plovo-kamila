import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import type { IDish } from '../../types';

interface Props {
  dish: IDish;
}

export const DishCard = ({ dish }: Props) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ minWidth: 100}}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {dish.name}
        </Typography>
        <Typography color="text.secondary">
          Price: {dish.price} $
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(`/dish/${dish.id}`)}>
          Show more
        </Button>
      </CardActions>
    </Card>
  );
};