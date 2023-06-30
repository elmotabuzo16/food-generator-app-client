import fetch from 'isomorphic-fetch';
import { API } from '../../config';
import { isAuth } from './authActions';

export const getCategories = () => {
  return fetch(`${API}/category`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {});
};

export const createCategory = (tag) => {
  let token = isAuth().token;
  return fetch(`${API}/category`, {
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

export const getRelatedCategory = (slug) => {
  return fetch(`${API}/category/${slug}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
