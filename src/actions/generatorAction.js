import _fetch from 'isomorphic-fetch';
import { API } from '../../config';

export const generateFood = (mealType) => {
  return fetch(`${API}/recipe`, {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-cache',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const dataArray = Array.isArray(data) ? data : [data];
      const recipe = dataArray.filter((recipe) => recipe.type === mealType);
      const randomRecipe = recipe[Math.floor(Math.random() * recipe.length)];
      return randomRecipe;
    })
    .catch((err) => console.log(err));
};
