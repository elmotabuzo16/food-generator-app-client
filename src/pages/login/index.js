import FormContainer from '@/components/FormContainer';
import { Button, Form } from 'react-bootstrap';

import React, { useEffect, useState } from 'react';
import { authenticate, isAuth, signin } from '@/actions/authActions';
import Router from 'next/router';

const LoginScreen = () => {
  const [values, setValues] = useState({
    email: 'admin@example.com',
    password: '8#762YyJ1Ww9',
    error: '',
    loading: false,
    message: '',
    showForm: true,
  });

  const { email, password, error, loading, message, showForm } = values;

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

    const user = { email, password };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          if (isAuth()) {
            console.log('authenticated');
            if (localStorage.getItem('current_recipe')) {
              // get localStorage slug
              const arr = localStorage.getItem('current_recipe');
              console.log('hehe');
              // push to the slug
              Router.push(`/`);
            } else {
              Router.push(`/`);
            }
          }
        });
      }
    });
  };

  const showLoading = () =>
    loading ? <div className='alert alert-info'>Loading...</div> : '';

  const showError = () =>
    error ? <div className='alert alert-danger'>{error}</div> : '';

  const showMessage = () =>
    message ? <div className='alert alert-info'>{message}</div> : '';

  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && (
        <FormContainer>
          <h1>Login</h1>
          {/* {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />} */}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
              <Form.Label className='pt-3'>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={handleChange('email')}
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
        </FormContainer>
      )}
    </>
  );
};

export default LoginScreen;
