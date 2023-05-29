import { resetPassword } from '@/actions/userActions';
import FormContainer from '@/components/FormContainer';
import Message from '@/components/Message';
import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { APP_NAME, DOMAIN } from '../../../../../config';

const ResetPassword = ({ router }) => {
  const [values, setValues] = useState({
    name: '',
    newPassword: '',
    newConfirmPassword: '',
    error: '',
    success: '',
    loading: false,
  });

  const head = () => (
    <Head>
      <title> Reset Password | Keto Food Generator</title>
      <meta
        name='description'
        content={`${APP_NAME} - Generate delicious and healthy Filipino Keto Meals in seconds. Our keto meal planner creates personalized meal plans based on your dietary preferences and nutritional goals. Say goodbye to boring and repetitive keto meals and hello to a healthier lifestyle with our easy-to-use keto meal generator.`}
      />
      <link rel='canonical' href={`${DOMAIN}/${router.pathname}`} />
      <meta
        property='og:title'
        content={`Reset Password | Keto Food Generator`}
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
      {head()}
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
