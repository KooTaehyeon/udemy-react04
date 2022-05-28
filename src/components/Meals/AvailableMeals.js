import React, { useEffect, useState } from 'react';
import styles from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
//더미

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://udemy-react-f19a8-default-rtdb.firebaseio.com/meals.json'
      );
      const responseData = await response.json();

      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setloading(true);
    };
    fetchMeals(meals);
  }, []);
  if (!loading) {
    return (
      <section className={styles.MealsLoading}>
        <p>로딩중...</p>
      </section>
    );
  }

  const mealsList = meals.map((meals) => {
    return (
      <MealItem
        key={meals.id}
        id={meals.id}
        name={meals.name}
        description={meals.description}
        price={meals.price}
      />
    );
  });
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
