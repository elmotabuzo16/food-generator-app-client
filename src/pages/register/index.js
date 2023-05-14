import { signup } from '@/actions/authActions';
import FormContainer from '@/components/FormContainer';
import Loader from '@/components/Loader';
import Message from '@/components/Message';
import Link from 'next/link';
import Router from 'next/router';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

const index = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    loading: false,
    message: '',
    error: '',
    success: '',
    showForm: true,
  });

  const [terms, setTerms] = useState(true);

  const {
    name,
    email,
    password,
    confirmPassword,
    loading,
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

    const user = { name, email, password };

    if (password !== confirmPassword) {
      setValues({
        ...values,
        error: 'Password does not match. Please try again',
        loading: false,
      });
    } else {
      signup(user).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: true });
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

  const termsLink = <Link href='/terms'>Terms of Service</Link>;

  return (
    <FormContainer>
      <h1 className='text-center'>Create your account</h1>
      {success && <Message variant='success'>{success}</Message>}
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      {!showForm && (
        <Message variant='success'>
          Registration Successful. Please go to Login.
        </Message>
      )}
      {showForm && (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label className='mt-3'>Name</Form.Label>
            <Form.Control
              type='name'
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
              required
            ></Form.Control>
          </Form.Group>

          {/* <div style={{ display: 'flex' }}>
            <Form.Check
              aria-label='option 1'
              className='mt-3'
              label={`I accept the`}
              required
            />
            <div style={{ marginTop: '16px' }}> &nbsp;&nbsp;{termsLink}</div>
          </div> */}

          <Button type='submit' variant='primary' className='mt-3'>
            Register
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default index;
