import { createBlog } from '@/actions/blogActions';
import { getCategories } from '@/actions/categoryActions';
import Admin from '@/components/Admin';
import Message from '@/components/Message';
import { QuillFormats, QuillModules } from '@/helpers/quill';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CreateArticle = () => {
  const blogFromLocalStorage = () => {
    if (typeof window === 'undefined') {
      return false;
    }

    if (localStorage.getItem('blog')) {
      return JSON.parse(localStorage.getItem('blog'));
    } else {
      return false;
    }
  };

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [body, setBody] = useState(blogFromLocalStorage);
  const [values, setValues] = useState({
    error: '',
    success: '',
    formData: new FormData(),
    title: '',
    hidePublishButton: false,
  });

  const { error, success, formData, title, hidePublishButton } = values;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
  }, []);

  const publishBlog = (e) => {
    e.preventDefault();
    createBlog(formData).then((data) => {
      console.log(data.error);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: '',
          error: '',
          success: `A new blog title "${data.title}" is created`,
        });
        setBody('');
      }
    });
  };

  const handleChange = (name) => (e) => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: '', success: '' });
  };

  const handleBody = (e) => {
    setBody(e);
    setValues({ ...values, error: '', success: '' });
    formData.set('body', e);
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog', JSON.stringify(e));
    }
  };

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const handleCategoryChange = (category) => {
    console.log(category);
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }

    formData.set('tags', selectedCategories);
  };

  useEffect(() => {
    console.log(selectedCategories);
  }, [selectedCategories]);

  return (
    <Admin>
      <Container>
        <div className='my-3'>
          {error && <Message variant='danger'>{error}</Message>}
        </div>
        <Row className='mt-4'>
          <Col md={10}>
            <Form onSubmit={publishBlog}>
              <Form.Group className='mb-3'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type='text'
                  value={title}
                  onChange={handleChange('title')}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <ReactQuill
                  modules={QuillModules}
                  formats={QuillFormats}
                  value={body}
                  placeholder='Write something amazing'
                  onChange={handleBody}
                  style={{ background: 'white' }}
                />
              </Form.Group>

              <Form.Group>
                <Button type='submit' className='btn btn-primary'>
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col md={2}>
            <Form.Group controlId='tags'>
              <Form.Label>Categories</Form.Label>
              {categories.map((category) => (
                <Form.Check
                  key={category.id}
                  type='checkbox'
                  label={category.name}
                  value={category._id}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
              ))}
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </Admin>
  );
};

export default CreateArticle;
