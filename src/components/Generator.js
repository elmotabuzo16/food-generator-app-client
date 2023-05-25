import React, { useState } from 'react';
import { Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import Loader from './Loader.js';
import Link from 'next/link';
import { generateFood } from '@/actions/generatorAction.js';
import GeneratedRecipe from './GeneratedRecipe.js';

const Generator = () => {
  const [values, setValues] = useState({
    loading: false,
    recipe: {},
  });
  const [mealType, setMealType] = useState('Meal');
  const [openMealPlan, setOpenMealPlan] = useState(false);

  const { loading, recipe } = values;

  const submitHandler = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, recipe: {} });

    generateFood(mealType).then((data) => {
      setValues({ ...values, loading: false, recipe: data });
    });

    setOpenMealPlan(true);
  };

  return (
    <>
      <Card className='col-md-7 offset-md-2 text-center mx-auto'>
        <Form className='pt-4' onSubmit={submitHandler}>
          <h4>Don't know what food to eat?</h4>

          <Row>
            <Col>
              <div className='d-flex justify-content-center mb-4 mt-4'>
                <Form.Label className='mt-1' style={{ paddingRight: '10px' }}>
                  Type of Food:{' '}
                </Form.Label>

                <div>
                  <Form.Select
                    as='select'
                    className='text-center mx-auto'
                    style={{ width: '200px', textAlign: 'center' }}
                    value={mealType}
                    onChange={(e) => {
                      setMealType(e.target.value);
                    }}
                  >
                    <option value='Meal'>Meal</option>
                    <option value='Snack'>Snacks or Desserts</option>
                  </Form.Select>
                </div>
              </div>
            </Col>
          </Row>

          {loading ? (
            <Button variant='primary' type='submit' className='mb-4' disabled>
              <span>Generating Food...</span>
              <span style={{ paddingLeft: '10px' }}>
                <Spinner animation='border' size='sm'></Spinner>
              </span>
            </Button>
          ) : (
            <Button
              variant='primary'
              type='submit'
              className='mb-4'
              style={{ width: '200px' }}
            >
              <span>Generate Food</span>
            </Button>
          )}
        </Form>
      </Card>

      <Card
        className='col-md-7 offset-md-2 text-center mt-4 pt-3  mx-auto'
        style={{ paddingBottom: '15px' }}
      >
        {loading && <Loader />}
        {openMealPlan && !loading && (
          <Row>
            <GeneratedRecipe recipe={recipe} loading={loading} />
          </Row>
        )}
        {!openMealPlan && (
          <p className='pt-4'>
            Click Generate Food button above to generate random food.
          </p>
        )}
      </Card>

      {/* {loading && (
        <Card
          className='col-md-7 offset-md-2 text-center mt-4 pt-3  mx-auto'
          style={{ paddingBottom: '15px' }}
        >
          <Loader />
        </Card>
      )}

      {openMealPlan && !loading && (
        <Card
          className='col-md-7 offset-md-2 text-center mt-4 pt-3 mx-auto'
          style={{ paddingBottom: '15px' }}
        >
          <GeneratedRecipe recipe={recipe} loading={loading} />
        </Card>
      )}

      {!openMealPlan && (
        <Card
          className='col-md-7 offset-md-2 text-center mt-3 mx-auto'
          style={{ paddingBottom: '15px' }}
        >
          <p className='pt-4'>
            Click Generate Food button above to generate random food.
          </p>
        </Card>
      )} */}
    </>
  );
};

export default Generator;
