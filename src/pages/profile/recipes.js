import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { isAuth } from '@/actions/authActions';
import TableRecipeNonApproved from '@/components/TableRecipeNonApproved';

const ProfileRecipes = () => {
  return (
    <>
      <Container className='font-profile'>
        <Row>
          <h3 className='mt-3'>My Created Recipes</h3>
          <hr />
          <TableRecipeNonApproved username={isAuth()?.username} />
        </Row>
      </Container>
    </>
  );
};

export default ProfileRecipes;
