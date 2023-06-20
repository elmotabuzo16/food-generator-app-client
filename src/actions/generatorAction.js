import _fetch from 'isomorphic-fetch';
import { API } from '../../config';
let previousRecipe = null;

export const generateFood = async (mealType) => {
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
      // if (recipeName === previousRecipe) {
      //   console.log(recipeName, previousRecipe);
      //   return generateFood();
      // }

      // previousRecipe = recipeName;

      return randomRecipe;
    })
    .catch((err) => console.log(err));
};

export const generateNewFood = async (type, tag) => {
  return fetch(`${API}/recipe/filter?type=${type}&tag=${tag}`, {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-cache',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data !== undefined) {
        const dataArray = Array.isArray(data) ? data : [data];
        const recipe = dataArray.filter((recipe) => recipe.type === type);

        const randomRecipe = recipe[Math.floor(Math.random() * recipe.length)];

        console.log(randomRecipe);

        return randomRecipe;
      } else {
        return {};
      }
    })
    .catch((err) => console.log(err));
};

export const generateClick = () => {
  return fetch(`${API}/generator`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {});
};
