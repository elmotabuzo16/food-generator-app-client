import { forgotPassword } from '@/actions/userActions';
import FormContainer from '@/components/FormContainer';
import Message from '@/components/Message';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { APP_NAME, DOMAIN } from '../../../../config';
import { withRouter } from 'next/router';
import Head from 'next/head';

const ForgotPassword = ({ router }) => {
  const [values, setValues] = useState({
    email: '',
    error: '',
    loading: '',
    success: '',
  });

  const head = () => (
    <Head>
      <title> Forgot Password | Keto Food Generator</title>
      <meta
        name='description'
        content={`${APP_NAME} - Generate delicious and healthy Filipino Keto Meals in seconds. Our keto meal planner creates personalized meal plans based on your dietary preferences and nutritional goals. Say goodbye to boring and repetitive keto meals and hello to a healthier lifestyle with our easy-to-use keto meal generator.`}
      />
      <link rel='canonical' href={`${DOMAIN}/${router.pathname}`} />
      <meta
        property='og:title'
        content={`Forgot Password | Keto Food Generator`}
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
    <>
      {head()}
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
    </>
  );
};

export default withRouter(ForgotPassword);
