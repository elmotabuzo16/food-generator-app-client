import { getFavorites } from '@/actions/recipeActions';
import TableRecipeApproved from '@/components/TableRecipeApproved';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';

const Recipes = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadRecipe = () => {
    setLoading(true);
    getFavorites().then((data) => {
      if (data.error) {
        console.log(data.error);
        setLoading(false);
      } else {
        setLoading(false);
        setAllRecipes(data);
      }
    });
  };

  useEffect(() => {
    loadRecipe();
  }, []);

  const createProductHandler = (e) => {
    e.preventDefault();

    Router.replace(`/recipe/create/new`);
  };

  return (
    <>
      <Container className='font-profile'>
        <Row>
          <h3 className='mt-3'>My Favorite Recipes</h3>
          <hr />
          <TableRecipeApproved allRecipes={allRecipes} loading={loading} />
        </Row>
      </Container>
    </>
  );
};

export default Recipes;
