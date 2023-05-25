import FormContainer from '@/components/FormContainer';
import { Button, Form, Row, Spinner } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import {
  authenticate,
  getRecipeSlug,
  isAuth,
  signin,
} from '@/actions/authActions';
import Router, { withRouter } from 'next/router';
import Message from '@/components/Message';
import Link from 'next/link';
import Head from 'next/head';
import { APP_NAME, DOMAIN } from '../../../config';

const LoginScreen = ({ router }) => {
  const [values, setValues] = useState({
    emailOrUsername: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true,
  });

  const head = () => (
    <Head>
      <title> Login | Keto Food Generator</title>
      <meta
        name='description'
        content={`${APP_NAME} - Generate delicious and healthy Filipino Keto Meals in seconds. Our keto meal planner creates personalized meal plans based on your dietary preferences and nutritional goals. Say goodbye to boring and repetitive keto meals and hello to a healthier lifestyle with our easy-to-use keto meal generator.`}
      />
      <link rel='canonical' href={`${DOMAIN}${router.pathname}`} />
      <meta property='og:title' content={`Login | Keto Food Generator`} />
      <meta
        property='og:description'
        content={`${APP_NAME} - Generate delicious and healthy Filipino Keto Meals in seconds. Our keto meal planner creates personalized meal plans based on your dietary preferences and nutritional goals. Say goodbye to boring and repetitive keto meals and hello to a healthier lifestyle with our easy-to-use keto meal generator.`}
      />
      <meta property='og:type' content='webiste' />
      <meta property='og:url' content={`${DOMAIN}${router.pathname}`} />
      <meta property='og:site_name' content={`${APP_NAME}`} />

      <meta
        property='og:image'
        content={`${DOMAIN}/static/images/seoblog.jpg`}
      />
      <meta
        property='og:image:secure_url'
        content={`${DOMAIN}/static/images/seoblog.jpg`}
      />
      <meta property='og:image:type' content='image/jpg' />
    </Head>
  );

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
      {head()}

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
            <Link
              href='/login/password/forgot'
              className='text-decoration-none'
            >
              Forgot your password?
            </Link>
          </Row>
          <Row className='mt-3'>
            <Link href='/register' className='text-decoration-none'>
              Create a new account
            </Link>
          </Row>
        </FormContainer>
      )}
    </>
  );
};

export default withRouter(LoginScreen);
