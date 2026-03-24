import {useCallback, useEffect, useState} from 'react';
import type{IDish, IDishList} from '../../types.ts';
import {axiosApi} from '../../axiosApi.ts';
import { DishCard } from '../../components/dish-card/DishCard.tsx';
import styles from './styles.module.css'
import { Typography } from '@mui/material';


export const Home = () => {
  const [dishes, setDishes] = useState<IDish[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDishes = useCallback(async () => {

    try {
      setLoading(true); 
      const dishesResponse = await axiosApi.get<IDishList | null>('/dishes.json');
      const dishesData = dishesResponse.data;

      if (!dishesData) {
        setDishes([]);
        return;
      }

      const newDishes: IDish[] = Object.keys(dishesData).map(key => ({
        ...dishesData[key],
        id: key,
      }));

      setDishes(newDishes);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchDishes();
  }, [fetchDishes]);
  
  return (
    <div>
      <Typography variant='h3' align='center'>
        Dishes List
      </Typography>
        <div className={styles.wrapper}>
          {dishes.map((dishItem) => (
            <DishCard dish={dishItem} key={dishItem.id} />
          ))}
        </div>
    </div>

  );
};

