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

export const createFood = (foodRecipe) => {
  const token = isAuth().token;
  return fetch(`${API}/recipe`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(foodRecipe),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const loadAllApprovedRecipes = () => {
  return fetch(`${API}/recipe`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {});
};

export const loadAllNonApprovedRecipes = (username) => {
  let listBlogsEndpoint;

  if (username) {
    listBlogsEndpoint = `${API}/recipe/user/${username}`;
  } else {
    listBlogsEndpoint = `${API}/recipe/admin`;
  }

  const token = isAuth().token;
  return fetch(`${listBlogsEndpoint}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const loadSingleRecipe = (slug) => {
  return fetch(`${API}/recipe/${slug}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const approveRecipe = (token, slug) => {
  return fetch(`${API}/recipe/admin/${slug}/approved`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// export const favoriteRecipe = (token, foodId) => {
//   return fetch(`${API}/recipe/favorite`, {
//     method: 'PUT',
//     headers: {
//       Authorization: `Bearer ${token}`,
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(foodId),
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

export const favoriteRecipe = (foodId) => {
  const token = isAuth().token;
  return fetch(`${API}/recipe/favorite`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(foodId),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getFavorites = () => {
  const token = isAuth().token;

  return fetch(`${API}/recipe/userfavorites`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listRelated = (recipe) => {
  return fetch(`${API}/recipe/relatedCategory`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipe),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listFeatured = (type) => {
  return fetch(`${API}/recipe/getFeatured`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(type),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// export const createRecipe = (token, recipe) => {
//   return fetch(`${API}/recipe/create`, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(recipe),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`Failed to post recipe: ${response.status}`);
//       }

//       return response.json();
//     })
//     .then((data) => {
//       console.log('Recipe posted:', data);
//     })
//     .catch((error) => {
//       console.error('Error posting recipe:', error);
//     });
// };
