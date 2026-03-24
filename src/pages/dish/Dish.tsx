import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Box, Button, Typography, Card, CardContent, Container } from '@mui/material';
import { axiosApi } from '../../axiosApi';
import type { IDishShort } from '../../types';

export const Dish = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dish, setDish] = useState<IDishShort | null>(null);

  const fetchOneDish = useCallback(async () => {
    try {
      const response = await axiosApi.get<IDishShort | null>(`/dishes/${id}.json`);
      setDish(response.data);
    } catch {
      alert('Error loading dish');
    }
  }, [id]);

  useEffect(() => {
    void fetchOneDish();
  }, [fetchOneDish]);

  const onDelete = async () => {
    try {
      await axiosApi.delete(`/dishes/${id}.json`);
      navigate('/');
    } catch {
      alert('Error deleting dish');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography 
      variant="h3" align="center">Dish Info
      </Typography>

      <Card sx={{ mt: 2 }}>
        <CardContent>
          {dish ? (
            <Box>
              <Typography 
              variant="h5"> Name: {dish.name}
              </Typography>
              <Typography 
              color="text.secondary">{dish.description}
              </Typography>
              <Typography 
              variant="h6"> Price: {dish.price} $
              </Typography>
            </Box>
          ) : (
            <Typography 
            color="error">Error: Dish not found
            </Typography>
          )}

          <Box 
          sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button 
            variant="outlined" onClick={() => navigate('/')}>Back
            </Button>
            <Button 
            variant="contained" color="error" onClick={onDelete}>Delete
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};