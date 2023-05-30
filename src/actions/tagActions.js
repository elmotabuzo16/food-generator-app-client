import fetch from 'isomorphic-fetch';
import { API } from '../../config';
import { isAuth } from './authActions';

export const getTags = () => {
  return fetch(`${API}/tag`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {});
};

export const createTag = (tag) => {
  let token = isAuth().token;
  return fetch(`${API}/tag`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tag),
  })
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((err) => {});
};

export const getRelatedRecipeTag = (slug) => {
  return fetch(`${API}/tag/${slug}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
