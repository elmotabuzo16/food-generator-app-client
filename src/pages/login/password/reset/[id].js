import { resetPassword } from '@/actions/userActions';
import FormContainer from '@/components/FormContainer';
import Message from '@/components/Message';
import Link from 'next/link';
import { withRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';

const ResetPassword = ({ router }) => {
  const [values, setValues] = useState({
    name: '',
    newPassword: '',
    newConfirmPassword: '',
    error: '',
    success: '',
    loading: false,
  });

  const { newPassword, newConfirmPassword, error, success, loading } = values;

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      error: '',
      success: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, loading: true, error: '' });

    const resetPasswordData = {
      newPassword,
      resetPasswordLink: router.query.id,
    };

    if (newPassword !== newConfirmPassword) {
      setValues({
        ...values,
        loading: false,
        error: 'Password does not match. Please try again',
      });
    } else {
      resetPassword(resetPasswordData).then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            loading: false,
            newPassword: '',
            newConfirmPassword: '',
          });
        } else {
          setValues({
            ...values,
            success: `Great! Now you can login with your new password`,
            showForm: false,
            loading: false,
            error: false,
          });
        }
      });
    }
  };

  return (
    <>
      <FormContainer>
        <h3 className='text-center mb-4'>Reset Password</h3>
        {success && <Message variant='success'>{success}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && (
          <Message variant='info' className='my-4'>
            <span>Resetting your password...</span>
            <span style={{ paddingLeft: '10px' }}>
              <Spinner animation='border' size='sm'></Spinner>
            </span>
          </Message>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='email' className='mt-3'>
            <Form.Label>New password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter new password'
              value={newPassword}
              name='newPassword'
              onChange={handleChange}
              minLength={8}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email' className='mt-3'>
            <Form.Label>Confirm new password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter confirm new password'
              value={newConfirmPassword}
              name='newConfirmPassword'
              onChange={handleChange}
              minLength={8}
              required
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='mt-3'>
            Reset password
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default withRouter(ResetPassword);
