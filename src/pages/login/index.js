import FormContainer from '@/components/FormContainer';
import { Button, Form, Row, Spinner } from 'react-bootstrap';

import React, { useEffect, useState } from 'react';
import {
  authenticate,
  getRecipeSlug,
  isAuth,
  signin,
} from '@/actions/authActions';
import Router from 'next/router';
import Loader from '@/components/Loader';
import Message from '@/components/Message';
import Link from 'next/link';

const LoginScreen = () => {
  const [values, setValues] = useState({
    emailOrUsername: 'admin@example.com',
    password: '8#762YyJ1Ww9',
    error: '',
    loading: false,
    message: '',
    showForm: true,
  });

  const { emailOrUsername, password, error, loading, message, showForm } =
    values;

  useEffect(() => {
    if (isAuth()) {
      Router.push(`/`);
    }
  }, []);

  const handleChange = (allValues) => (e) => {
    setValues({ ...values, error: false, [allValues]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });

    const user = { emailOrUsername, password };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          if (isAuth()) {
            if (localStorage.getItem('current_recipe')) {
              const savedSlug = getRecipeSlug().recipeSlug;
              Router.push(`/recipe/${savedSlug}`);
            } else {
              Router.push(`/`);
            }
          }
        });
      }
    });
  };

  return (
    <>
      {showForm && (
        <FormContainer>
          <h1 className='text-center'>Login</h1>
          {error && <Message variant='danger'>{error}</Message>}
          {loading && (
            <Message variant='info'>
              <span>Logging in...</span>
              <span style={{ paddingLeft: '10px' }}>
                <Spinner animation='border' size='sm'></Spinner>
              </span>
            </Message>
          )}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='emailOrUsername'>
              <Form.Label className='pt-3'>Username / Email Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Username or Email'
                value={emailOrUsername}
                onChange={handleChange('emailOrUsername')}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label className='pt-3'>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={handleChange('password')}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-3'>
              Login
            </Button>
          </Form>

          <Row className='mt-4'>
            <Link href='/login/password/forgot'>Forgot your password?</Link>
          </Row>
        </FormContainer>
      )}
    </>
  );
};

export default LoginScreen;
