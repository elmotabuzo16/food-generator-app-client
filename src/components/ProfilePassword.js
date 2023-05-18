import { loadUserProfile, updateUserProfile } from '@/actions/userActions';
import React, { useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import FormContainer from './FormContainer';
import Link from 'next/link';
import Message from './Message';

const ProfilePassword = () => {
  const [values, setValues] = useState({
    oldPassword: '',
    password: '',
    confirmPassword: '',
    error: '',
    loading: '',
    success: '',
  });

  const { password, oldPassword, confirmPassword, success, loading, error } =
    values;

  const initProfile = () => {
    loadUserProfile().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          username: data.username,
          name: data.name,
          email: data.email,
        });
      }
    });
  };

  useEffect(() => {
    initProfile();
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value, error: '' });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: '', success: '' });

    const userPassword = { password, confirmPassword, oldPassword };

    if (password !== confirmPassword) {
      setValues({
        ...values,
        loading: false,
        error: 'Password does not match. Please try again',
      });
    } else {
      updateUserProfile(userPassword).then((data) => {
        if (data.error) {
          console.log('error');
          setValues({ ...values, error: data.error, loading: false });
        } else {
          console.log('success');
          setValues({
            ...values,
            success: 'Your password has been updated.',
            loading: false,
          });
        }
      });
    }
  };
  return (
    <>
      <FormContainer>
        <Link href='/profile' className='btn btn-outline-primary my-3'>
          Go Back
        </Link>

        <h3 className='text-center mb-4'>Change Password</h3>

        {success && <Message variant='success'>{success}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && (
          <Message variant='info' className='my-4'>
            <span>Updating your password...</span>
            <span style={{ paddingLeft: '10px' }}>
              <Spinner animation='border' size='sm'></Spinner>
            </span>
          </Message>
        )}

        <Form onSubmit={submitHandler}>
          {/* <Form.Group controlId='oldPassword' className='mt-3'>
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter old password'
              name='oldPassword'
              value={oldPassword}
              onChange={handleChange}
              required
            ></Form.Control>
          </Form.Group> */}

          <Form.Group controlId='newPassword' className='mt-3'>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter new password'
              name='password'
              value={password}
              onChange={handleChange}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmNewPassword' className='mt-3'>
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter confirm new password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={handleChange}
              required
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='mt-3'>
            Update Password
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProfilePassword;
