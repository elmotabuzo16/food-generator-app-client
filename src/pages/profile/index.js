import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { isAuth } from '@/actions/authActions';
import TableRecipeNonApproved from '@/components/TableRecipeNonApproved';
import Profile from '@/components/Profile';
import Router from 'next/router';

const Account = () => {
  const accountDetails = () => {
    Router.replace(`/profile/account/details`);
  };

  const accountPasswordDetails = () => {
    Router.replace(`/profile/account/changepassword`);
  };
  return (
    <>
      <Container className='font-profile'>
        <Row className='text-center mt-4'></Row>
        <Row>
          <Col md={3}>
            <h3>User Profile</h3>
            <p
              style={{
                border: 'none',
                borderBottom: '1px solid rgba(0,0,0,0.125)',
              }}
            ></p>
            <button className='btn btn-light' onClick={accountDetails}>
              Update Account Details
            </button>
            <button
              className='btn btn-light mt-4'
              onClick={accountPasswordDetails}
            >
              Update Account Password
            </button>
          </Col>
          <Col md={9}>
            <h3>Recipes</h3>
            <p
              style={{
                border: 'none',
                borderBottom: '1px solid rgba(0,0,0,0.125)',
              }}
            ></p>
            <TableRecipeNonApproved username={isAuth()?.username} />
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </>
  );
};

export default Account;
