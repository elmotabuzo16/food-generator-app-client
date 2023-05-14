import React, { useEffect, useState } from 'react';
import { API, APP_NAME, DOMAIN, FB_APP_ID } from '../../../config';
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import Rating from '@/components/Rating';
import { isAuth } from '@/actions/authActions';
import Router from 'next/router';
import { createRecipeReview } from '@/actions/recipeActions';
import Loader from '@/components/Loader';
import Message from '@/components/Message';
import Head from 'next/head';

const RecipeDetailScreen = ({ recipe }) => {
  const head = () => (
    <Head>
      <title>
        {recipe.recipe.name} | {APP_NAME}
      </title>
      <meta name='description' content={recipe.recipe.description} />
      <link
        rel='canonical'
        href={`${DOMAIN}/recipe.recipe/${recipe.recipe.slug}`}
      />
      <meta
        property='og:title'
        content={`${recipe.recipe.name}| ${APP_NAME}`}
      />
      <meta property='og:description' content={recipe.recipe.description} />
      <meta property='og:type' content='webiste' />
      <meta
        property='og:url'
        content={`${DOMAIN}/recipe/${recipe.recipe.slug}`}
      />
      <meta property='og:site_name' content={`${APP_NAME}`} />

      <meta property='og:image' content='' />
      <meta property='og:image:secure_url' ccontent='' />
      <meta property='og:image:type' content='image/jpg' />
      <meta property='fb:app_id' content={`${FB_APP_ID}`} />
    </Head>
  );

  const [reviewValue, setReviewValue] = useState({
    name: '',
    rating: 0,
    comment: '',
    error: '',
    loading: false,
    message: '',
  });

  const { name, rating, comment, error, loading, message } = reviewValue;

  const handleChange = (allValues) => (e) => {
    setReviewValue({
      ...reviewValue,
      error: false,
      [allValues]: e.target.value,
    });
  };

  useEffect(() => {
    localStorage.setItem(
      'current_recipe',
      JSON.stringify({
        recipeSlug: recipe.recipe.slug,
      })
    );
  }, []);

  const submitReviewHandler = (e) => {
    e.preventDefault();
    setReviewValue({
      ...reviewValue,
      error: false,
      loading: true,
    });

    const review = { name: isAuth().name, rating, comment };

    createRecipeReview(recipe.recipe.slug, review).then((data) => {
      if (data.error) {
        setReviewValue({
          ...reviewValue,
          error: data.error,
          loading: false,
          message: data.message,
        });
      } else {
        setReviewValue({
          name: '',
          rating: 0,
          comment: '',
          error: '',
          loading: false,
          message: data.message,
        });

        if (message === 'Review added')
          Router.replace(`/recipe/${recipe.recipe.slug}`);
      }
    });
  };

  return (
    <>
      {head()}
      <article id='article-screen' className='mt-3'>
        <Container>
          <Row>
            <Col md={9}>
              <h1>{recipe.recipe.name}</h1>
              <p
                style={{
                  border: 'none',
                  borderBottom: '1px solid rgba(0,0,0,0.125)',
                }}
              >
                <strong>Total Time:</strong> {recipe.recipe.totalTime}
                &nbsp;&nbsp;&nbsp;
                <strong>Serving Size:</strong> {recipe.recipe.servingCount}
              </p>
              {/* <Rating
              value={recipe.recipe.rating}
              text={`${recipe.recipe.numReviews} reviews`}
            /> */}
              <p className='description'>{recipe.recipe.description}</p>
              <Image
                src={recipe.recipe.main_image}
                className='article-main-image'
                fluid
                style={{ height: '500px', maxWidth: 'auto' }}
              />
              <h4
                className='pt-4 py-2'
                style={{
                  border: 'none',
                  borderBottom: '1px solid rgba(0,0,0,0.125)',
                }}
              >
                Ingredients
              </h4>
              <ul className='ingredient-ul'>
                {recipe.recipe.ingredients.map((ingredient) => (
                  <li key={ingredient._id} className='ingredient-list rounded'>
                    <Image
                      src={ingredient.image}
                      className='ingredient-image'
                    />
                    <p className='ingredient-name'>{ingredient.name}</p>
                    <p className='ingredient-size-unit ms-auto'>
                      {ingredient.size} {ingredient.unit}
                    </p>
                  </li>
                ))}
              </ul>
              <h4
                className='pt-4'
                style={{
                  border: 'none',
                  borderBottom: '1px solid rgba(0,0,0,0.125)',
                }}
              >
                Instructions
              </h4>
              <ol>
                {recipe.recipe.directions.map((direction) => (
                  <li key={direction._id} className='mt-3'>
                    {direction.description}
                  </li>
                ))}
              </ol>
              <h4
                className='pt-4'
                style={{
                  border: 'none',
                  borderBottom: '1px solid rgba(0,0,0,0.125)',
                }}
              >
                Nutritional Value
              </h4>
              <ul>
                {recipe.recipe.servings.map((serving) => (
                  <li key={serving._id} className='mt-3'>
                    {serving.name} - {serving.size} {serving.unit}
                  </li>
                ))}
              </ul>
            </Col>
            <Col md={3}>
              <aside>
                <p></p>
              </aside>
            </Col>
          </Row>
          <Row>
            <Col md={12} className='container-sm'>
              <div className='comments__header'>
                <div className='comments__title'>
                  <p
                    style={{
                      border: 'none',
                      borderBottom: '1px solid rgba(0,0,0,0.125)',
                    }}
                  ></p>
                  <h4>Comments - {recipe.recipe.reviews.length}</h4>
                  {recipe.recipe.reviews.length === 0 && (
                    <p>
                      There are no comments available. Create a comment below.
                    </p>
                  )}
                </div>
              </div>

              <ListGroup variant='flush'>
                {recipe.recipe.reviews.map((review) => (
                  <ListGroup.Item key={review.name}>
                    <strong>{review.name}</strong>
                    <div>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                    </div>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}

                {!isAuth() && (
                  <Button
                    type='submit'
                    variant='btn btn-outline-dark'
                    style={{ width: '300px' }}
                    onClick={() => Router.push(`/login`)}
                    className='mt-4'
                  >
                    Sign In to Comment
                  </Button>
                )}

                {loading && <Loader />}
                {error && <Message variant='danger'>{error}</Message>}
                {message === 'Review added' && (
                  <Message variant='success'>Review added</Message>
                )}
                {message !== 'Review added' && message && !loading && (
                  <Message variant='danger'>{message}</Message>
                )}

                {isAuth() && (
                  <ListGroup.Item className='mt-3'>
                    <h4>Add a Comment</h4>
                    <Form onSubmit={submitReviewHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={handleChange('rating')}
                          className='mb-3'
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={handleChange('comment')}
                          className='mb-3'
                          required
                        ></Form.Control>
                      </Form.Group>

                      <Button type='submit' variant='primary'>
                        Submit Review
                      </Button>
                    </Form>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </article>
    </>
  );
};

export async function getServerSideProps({ params }) {
  // Fetch data for the page with the given slug
  const { slug } = params;

  const res = await fetch(`${API}/recipe/${slug}`);
  const data = await res.json();
  return {
    props: {
      recipe: { recipe: data },
    },
  };
}

export default RecipeDetailScreen;
