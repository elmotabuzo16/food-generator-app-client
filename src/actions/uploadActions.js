import fetch from 'isomorphic-fetch';
import { API } from '../../config';

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${API}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('File upload failed.');
  }

  const data = await response.json();
  return data.imageUrl;
};
