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
import Router, { withRouter } from 'next/router';
import {
  createRecipeReview,
  listRelated,
  loadSingleRecipe,
} from '@/actions/recipeActions';
import Loader from '@/components/Loader';
import Message from '@/components/Message';
import Head from 'next/head';
import moment from 'moment';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import NutritionalDoughnutChart from '@/components/NutritionalDoughnutChart';
import GeneratedRecipe from '@/components/GeneratedRecipe';

ChartJS.register(ArcElement, Tooltip, Legend);

const RecipeDetailScreen = ({ recipe, router }) => {
  const head = () => (
    <Head>
      <title>
        {recipe.name} | {APP_NAME}
      </title>
      <meta name='description' content={recipe.description} />
      <link rel='canonical' href={`${DOMAIN}/recipe/${recipe.slug}`} />
      <meta property='og:title' content={`${recipe.name}| ${APP_NAME}`} />
      <meta property='og:description' content={recipe.description} />
      <meta property='og:type' content='webiste' />
      <meta property='og:url' content={`${DOMAIN}/recipe/${recipe.slug}`} />
      <meta property='og:site_name' content={`${APP_NAME}`} />

      <meta property='og:image' content={`${DOMAIN}/${recipe.main_image}`} />
      <meta
        property='og:image:secure_url'
        content={`${DOMAIN}/${recipe.main_image}`}
      />
      <meta property='og:image:type' content='image/jpg' />
      <meta property='fb:app_id' content={`${FB_APP_ID}`} />
    </Head>
  );

  useEffect(() => {
    localStorage.setItem(
      'current_recipe',
      JSON.stringify({
        recipeSlug: recipe.slug,
      })
    );

    loadRelated();
  }, []);

  const [reviewValue, setReviewValue] = useState({
    name: '',
    rating: 0,
    comment: '',
    error: '',
    loading: false,
    message: '',
  });

  const [singleRecipe, setSingleRecipe] = useState([]);
  const { name, rating, comment, error, loading, message } = reviewValue;
  const [relatedData, setRelatedData] = useState([]);

  const handleChange = (allValues) => (e) => {
    setReviewValue({
      ...reviewValue,
      error: false,
      [allValues]: e.target.value,
    });
  };

  const loadRelated = () => {
    const recipeData = { _id: recipe._id, type: recipe.type };
    listRelated(recipeData).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelatedData(data);
        console.log(relatedData);
      }
    });
  };

  const initSingleRecipe = () => {
    loadSingleRecipe(router.query.slug).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setSingleRecipe(data);
      }
    });
  };

  const submitReviewHandler = (e) => {
    e.preventDefault();
    setReviewValue({
      ...reviewValue,
      error: false,
      loading: true,
    });

    const review = { name: isAuth().name, rating, comment };

    createRecipeReview(recipe.slug, review).then((data) => {
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
          Router.replace(`/recipe/${recipe.slug}`);
      }
    });
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%', // Adjust the cutout percentage to control the size of the center hole
    plugins: {
      doughnutlabel: {
        labels: [
          {
            text: 'Calories',
            font: {
              size: '20',
              weight: 'bold',
            },
          },
          {
            text: '500', // Replace with the actual total calorie value
            font: {
              size: '24',
              weight: 'bold',
            },
          },
        ],
      },
    },
  };

  return (
    <div itemScope itemType='http://schema.org/Recipe'>
      {head()}

      <article className='mt-3'>
        <Container>
          <Row>
            <Col md={9}>
              <h1 itemProp='name' className='recipe-header__name'>
                {recipe.name}
              </h1>
              <div>
                <p>
                  <strong>Total Time:</strong> {recipe.totalTime}
                </p>
                <strong>Serving Size:</strong> {recipe.servingCount}
                {recipe.servingCount.length > 1 ? ' servings' : ' serving'}
              </div>
              <hr />
              <Rating
                value={recipe.rating}
                text={` ${recipe.numReviews} ratings`}
              />
              <p itemProp='description' className='recipe__description'>
                {recipe.description}
              </p>
              <Image
                itemProp='image'
                src={recipe.main_image}
                className='article-main-image'
                fluid
                style={{ height: '500px', maxWidth: 'auto' }}
              />
              <h4
                className='mt-4 recipe-header__name'
                style={{ fontSize: '35px' }}
              >
                Ingredients
              </h4>
              <hr />
              <ul className='ingredient-ul'>
                {recipe.ingredients.map((ingredient) => (
                  <li
                    itemProp='recipeIngredient'
                    key={ingredient._id}
                    className='ingredient-list rounded'
                  >
                    {ingredient.image && (
                      <Image
                        height={56}
                        width={56}
                        src={ingredient.image}
                        className='ingredient-image'
                      />
                    )}
                    <p className='ingredient-name'>{ingredient.name}</p>
                    <p className='ingredient-size-unit ms-auto'>
                      {ingredient.size} {ingredient.unit}
                    </p>
                  </li>
                ))}
              </ul>
              <h4
                className='mt-4 recipe-header__name'
                style={{ fontSize: '35px' }}
              >
                Steps
              </h4>
              <hr />
              <ol className='recipe__steps'>
                {recipe.directions.map((direction) => (
                  <li
                    itemProp='recipeInstructions'
                    key={direction._id}
                    className='mt-3 recipe__steps__list'
                  >
                    {direction.description}
                  </li>
                ))}
              </ol>
              <h4
                className='mt-4 recipe-header__name'
                style={{ fontSize: '35px' }}
              >
                Nutritional Value
              </h4>
              <hr />
              <ul>
                {recipe.servings.map((serving) => (
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
            {relatedData.map((r, i) => (
              <div className='col-md-4' key={i}>
                <article>
                  {/* {JSON.stringify(relatedData)} */}
                  {/* <GeneratedRecipe recipe={r} />
                  <GeneratedRecipe recipe={r} /> */}
                </article>
              </div>
            ))}
          </Row>

          <Row>
            <Col md={12} className='container-sm'>
              <div className='comments__header'>
                <div className='comments__title'>
                  <hr />
                  <h4
                    className='mt-4 recipe-header__name'
                    style={{ fontSize: '35px' }}
                  >
                    Ratings and Comments
                  </h4>
                  {recipe.reviews.length === 0 && (
                    <p>
                      There are no ratings/comments available. Create below.
                    </p>
                  )}
                </div>
              </div>

              <ListGroup variant='flush'>
                {recipe.reviews.map((review, i) => (
                  <ListGroup.Item key={i}>
                    <strong>{review.name} </strong> -{' '}
                    {moment(review.updatedAt).fromNow()}
                    <div>
                      <Rating value={review.rating} />
                    </div>
                    <p className='mt-3'>{review.comment}</p>
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
                    Sign In to Add Ratings or Comment
                  </Button>
                )}

                {loading && <Loader />}
                {error && (
                  <Message variant='danger' className='my-4'>
                    {error}
                  </Message>
                )}
                {message === 'Review added' && (
                  <Message variant='success' className='my-4'>
                    Review added. Please refresh the page to view your review.
                  </Message>
                )}
                {message !== 'Review added' && message && !loading && (
                  <Message variant='danger' className='my-4'>
                    {message}
                  </Message>
                )}

                {isAuth() && (
                  <ListGroup.Item className='mt-3'>
                    <h4>Add a Rating</h4>
                    <Form onSubmit={submitReviewHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={handleChange('rating')}
                          className='mb-3'
                          required
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
    </div>
  );
};

export async function getServerSideProps({ params }) {
  // Fetch data for the page with the given slug
  const { slug } = params;

  const res = await fetch(`${API}/recipe/${slug}`);
  const data = await res.json();

  return {
    props: { recipe: data, slug },
  };
}

export default withRouter(RecipeDetailScreen);
