import fetch from 'isomorphic-fetch';
import { API } from '../../config';
import { isAuth } from './authActions';

export const createRecipeReview = (slug, review) => {
  const token = isAuth().token;
  return fetch(`${API}/recipe/${slug}/reviews`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
