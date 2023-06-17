import React, { useState } from 'react';
import { Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import Loader from './Loader.js';
import Link from 'next/link';
import { generateFood, generateNewFood } from '@/actions/generatorAction.js';
import GeneratedRecipe from './GeneratedRecipe.js';
import slugify from 'slugify';

const Generator = ({ tagOptions }) => {
  const [values, setValues] = useState({
    loading: false,
    recipe: {},
  });
  const [mealType, setMealType] = useState('Meal');
  const [tags, setTags] = useState('');
  const [openMealPlan, setOpenMealPlan] = useState(false);

  const { loading, recipe } = values;

  const submitHandler = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, recipe: {} });

    generateNewFood(mealType, tags).then((data) => {
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
                  Type of Meal:{' '}
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

              <div className='d-flex justify-content-center mb-4 mt-4'>
                <Form.Label className='mt-1' style={{ paddingRight: '10px' }}>
                  Category: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Form.Label>

                <div>
                  <Form.Select
                    as='select'
                    className='text-center mx-auto'
                    style={{ width: '200px', textAlign: 'center' }}
                    value={tags}
                    onChange={(e) => {
                      setTags(e.target.value);
                    }}
                  >
                    <option value=''>All</option>
                    {tagOptions.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
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
        {openMealPlan && !loading && recipe && (
          <Row>
            <GeneratedRecipe recipe={recipe} loading={loading} />
          </Row>
        )}

        {openMealPlan && !loading && !recipe && (
          <Row>
            <div>
              There are no meals available for this category. Please try another
              combination for the type of meal and category. Alternatively, you
              can help us by creating a meal by registering.
            </div>
            <div className='mt-3'>
              You can also click the link below to check the recipes for this
              category. Thank you.
            </div>
            <div className='mt-3'>
              <Link
                href={`/categories/recipes/${slugify(tags).toLowerCase()}`}
                className='text-decoration-none'
                itemProp='recipeCategory'
              >
                <Button className='pill'>{tags}</Button>
              </Link>
            </div>
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
