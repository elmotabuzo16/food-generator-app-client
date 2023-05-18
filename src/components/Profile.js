import { loadUserProfile, updateUserProfile } from '@/actions/userActions';
import React, { useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import FormContainer from './FormContainer';
import Link from 'next/link';
import Message from './Message';

const Profile = () => {
  const [values, setValues] = useState({
    username: '',
    name: '',
    email: '',
    error: '',
    loading: '',
    success: '',
  });

  const { username, name, email, success, loading, error } = values;

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

    const userData = { username, name, email };

    updateUserProfile(userData).then((data) => {
      if (data.error) {
        setValues({ ...values, errror: data.error, loading: false });
      } else {
        setValues({
          ...values,
          success: 'Your user details has been updated.',
          loading: false,
        });
      }
    });
  };
  return (
    <>
      <FormContainer>
        <Link href='/profile' className='btn btn-outline-primary my-3'>
          Go Back
        </Link>

        <h3 className='text-center mb-4'>Update account details</h3>

        {success && <Message variant='success'>{success}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && (
          <Message variant='info' className='my-4'>
            <span>Updating user detials...</span>
            <span style={{ paddingLeft: '10px' }}>
              <Spinner animation='border' size='sm'></Spinner>
            </span>
          </Message>
        )}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='username' className='mt-3'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter username'
              name='username'
              value={username}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='name' className='mt-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              name='name'
              value={name}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email' className='mt-3'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              name='email'
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='mt-3'>
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default Profile;
