import fetch from 'isomorphic-fetch';
import { API } from '../../config';

export const signin = (user) => {
  return fetch(`${API}/api/user/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
  localStorage.setItem('user', JSON.stringify(data));
  next();
};

export const logout = (next) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('user');
  }
};

export const isAuth = () => {
  if (typeof localStorage !== 'undefined') {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'));
    } else {
      return false;
    }
  }
};
