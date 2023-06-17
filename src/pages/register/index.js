import { signup } from '@/actions/authActions';
import FormContainer from '@/components/FormContainer';
import Loader from '@/components/Loader';
import Message from '@/components/Message';
import Link from 'next/link';
import Router from 'next/router';
import React, { useState } from 'react';
import { Button, Col, Form, Image, Row, Spinner } from 'react-bootstrap';
import { withRouter } from 'next/router';
import Head from 'next/head';
import { APP_NAME, DOMAIN } from '../../../config';

const index = ({ router }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    loading: false,
    message: '',
    error: '',
    success: '',
    showForm: true,
  });

  const head = () => (
    <Head>
      <title> Register for a free account | Keto Food Generator</title>
      <meta
        name='description'
        content={`${APP_NAME} - Generate delicious and healthy Filipino Keto Meals in seconds. Our keto meal planner creates personalized meal plans based on your dietary preferences and nutritional goals. Say goodbye to boring and repetitive keto meals and hello to a healthier lifestyle with our easy-to-use keto meal generator.`}
      />
      <link rel='canonical' href={`${DOMAIN}/${router.pathname}`} />
      <meta
        property='og:title'
        content={`Register for a free account | Keto Food Generator`}
      />
      <meta
        property='og:description'
        content={`${APP_NAME} - Generate delicious and healthy Filipino Keto Meals in seconds. Our keto meal planner creates personalized meal plans based on your dietary preferences and nutritional goals. Say goodbye to boring and repetitive keto meals and hello to a healthier lifestyle with our easy-to-use keto meal generator.`}
      />
      <meta property='og:type' content='webiste' />
      <meta property='og:url' content={`${DOMAIN}/${router.pathname}`} />
      <meta property='og:site_name' content={`${APP_NAME}`} />

      <meta property='og:image' content={`${DOMAIN}/logo.png`} />
      <meta property='og:image:secure_url' content={`${DOMAIN}/logo.png`} />
      <meta property='og:image:type' content='image/png' />
    </Head>
  );

  const [terms, setTerms] = useState(true);

  const {
    name,
    email,
    password,
    confirmPassword,
    loading,
    username,
    message,
    error,
    success,
    showForm,
  } = values;

  const handleChange = (allValues) => (e) => {
    setValues({
      ...values,
      error: false,
      message: '',
      [allValues]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });

    const user = { username, name, email, password };

    if (password !== confirmPassword) {
      setValues({
        ...values,
        error: 'Password does not match. Please try again',
        loading: false,
      });
    } else {
      signup(user).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setValues({
            ...values,
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            loading: false,
            message: '',
            error: '',
            showForm: false,
          });
        }
      });
    }
  };

  const termsLink = (
    <Link href='/terms' rel='noopener noreferrer' target='_blank'>
      Terms and Conditions
    </Link>
  );

  return (
    <>
      {head()}
      <FormContainer>
        <h3 className='text-center'>
          <Image src='../../logo_top.png' height={60} />
          <div>Create your account</div>
        </h3>
        <p className='text-center'>We need some basic information to begin.</p>
        {success && <Message variant='success my-4'>{success}</Message>}
        {message && <Message variant='danger my-4'>{message}</Message>}
        {error && <Message variant='danger my-4'>{error}</Message>}
        {loading && (
          <Message variant='info' className='my-4'>
            <span>Logging in...</span>
            <span style={{ paddingLeft: '10px' }}>
              <Spinner animation='border' size='sm'></Spinner>
            </span>
          </Message>
        )}
        {!showForm && (
          <Message variant='success my-4'>
            Registration Successful. Please go to Login.
          </Message>
        )}
        {showForm && (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='username'>
              <Form.Label className='mt-3'>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter username'
                value={username}
                onChange={handleChange('username')}
                minLength={6}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='name'>
              <Form.Label className='mt-3'>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={handleChange('name')}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label className='mt-3'>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={handleChange('email')}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label className='mt-3'>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={handleChange('password')}
                minLength={8}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label className='mt-3'>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={handleChange('confirmPassword')}
                minLength={8}
                required
              ></Form.Control>
            </Form.Group>

            <div style={{ display: 'flex' }}>
              <Form.Check
                aria-label='option 1'
                className='mt-3'
                label={`I accept the`}
                required
              />
              <div style={{ marginTop: '16px' }}> &nbsp;{termsLink}</div>
            </div>

            <Button type='submit' variant='primary' className='mt-3'>
              Register
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default withRouter(index);
