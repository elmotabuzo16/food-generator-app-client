import { isAuth } from '@/actions/authActions';
import { contact } from '@/actions/formActions';
import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import Message from './Message';

const ContactForm = () => {
  const [values, setValues] = useState({
    message: '',
    loading: false,
    error: '',
    success: '',
  });

  const { message, loading, error, success } = values;

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
    setValues({
      ...values,
      error: '',
      success: '',
      loading: true,
    });

    const messageData = {
      name: isAuth()?.name,
      email: isAuth()?.email,
      message,
    };

    contact(messageData).then((data) => {
      if (data.error) {
        console.log(data.error);
        setValues({
          ...values,
          error: data.error,
          success: '',
          loading: false,
        });
      } else {
        setValues({
          ...values,
          error: '',
          success: data.message,
          loading: false,
        });
      }
    });
  };

  return (
    <>
      {success && <Message variant='success'>{success}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && (
        <Message variant='info' className='my-4'>
          <span>Sending your message...</span>
          <span style={{ paddingLeft: '10px' }}>
            <Spinner animation='border' size='sm'></Spinner>
          </span>
        </Message>
      )}

      <Form onSubmit={submitHandler}>
        <textarea
          className='form-control'
          type='textarea'
          placeholder='Enter a message to contact us...'
          value={message}
          name='message'
          onChange={handleChange}
          required
          rows={10}
        ></textarea>

        {isAuth() && (
          <>
            <Button type='submit' className='mt-4'>
              Submit message
            </Button>
          </>
        )}

        {!isAuth() && (
          <>
            <Button type='submit' className='mt-4' disabled>
              Sign in to send a message
            </Button>
          </>
        )}
      </Form>
    </>
  );
};

export default ContactForm;
