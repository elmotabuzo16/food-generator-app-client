import { loadAllApprovedRecipes } from '@/actions/recipeActions';
import Rating from '@/components/Rating';
import TableRecipeApproved from '@/components/TableRecipeApproved';
import TableApproved from '@/components/TableRecipeApproved';
import Link from 'next/link';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';

const Recipes = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadRecipe = () => {
    setLoading(true);
    loadAllApprovedRecipes().then((data) => {
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
    console.log(allRecipes);
  }, []);

  const createProductHandler = (e) => {
    e.preventDefault();

    Router.replace(`/recipe/create/new`);
  };

  return (
    <>
      <Container>
        <Row>
          <Col className='align-items-center mt-4'>
            <Button className='my-3' onClick={createProductHandler}>
              Create Recipe
            </Button>
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <TableRecipeApproved allRecipes={allRecipes} loading={loading} />
        </Row>
      </Container>
    </>
  );
};

export default Recipes;
