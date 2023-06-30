import fetch from 'isomorphic-fetch';
import { API } from '../../config';
import { isAuth } from './authActions';

export const getBlogs = () => {
  return fetch(`${API}/blog`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createBlog = (blog) => {
  let token = isAuth().token;

  return fetch(`${API}/blog`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
