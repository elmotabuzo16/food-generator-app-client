import { forgotPassword } from '@/actions/userActions';
import FormContainer from '@/components/FormContainer';
import Message from '@/components/Message';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: '',
    error: '',
    loading: '',
    success: '',
  });

  const { email, success, loading, error } = values;

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      error: '',
      success: '',
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setValues({ ...values, error: '', loading: true, success: '' });

    const emailData = { email };

    forgotPassword(emailData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          success: `Email has been sent to ${email}. Follow the instructions to reset your password. Link expires in 10min.`,
          loading: false,
        });
      }
    });
  };
  return (
    <FormContainer>
      <Link href='/login' className='btn btn-outline-primary my-3'>
        Go Back
      </Link>

      <h3 className='text-center mb-4'>Forgot Password</h3>

      {success && <Message variant='success'>{success}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && (
        <Message variant='info' className='my-4'>
          <span>Checking your email address...</span>
          <span style={{ paddingLeft: '10px' }}>
            <Spinner animation='border' size='sm'></Spinner>
          </span>
        </Message>
      )}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className='mt-3'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            name='email'
            onChange={handleChange}
            required
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Send password reset link
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ForgotPassword;
