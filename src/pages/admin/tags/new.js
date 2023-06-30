import { createTag } from '@/actions/tagActions';
import FormContainer from '@/components/FormContainer';
import Message from '@/components/Message';
import { Button } from 'primereact/button';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';

const CreateTag = () => {
  const [name, setName] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    createTag({ name }).then((data) => {
      setSuccess('Tag created successfully');
    });
  };

  const changeHandler = (e) => {
    setName(e.target.value);
    setSuccess('');
  };

  return (
    <>
      <FormContainer>
        <h3 className='text-center'>Create Tags</h3>

        {success && <Message variant='success'>{success}</Message>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='tagName'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter tag name'
              value={name}
              onChange={changeHandler}
            />
          </Form.Group>
          <Button variant='primary' type='submit' className='mt-2'>
            Submit
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default CreateTag;
