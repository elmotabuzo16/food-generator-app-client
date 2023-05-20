import fetch from 'isomorphic-fetch';
import { API } from '../../config';

export const contact = (message) => {
  return fetch(`${API}/form/contact`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
