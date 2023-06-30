import React, { useEffect, useState } from 'react';
import { API, DOMAIN, FB_APP_ID } from '../../../config';
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
import { createRecipeReview, listRelated } from '@/actions/recipeActions';
import Loader from '@/components/Loader';
import Message from '@/components/Message';
import Head from 'next/head';
import moment from 'moment';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import FeaturedMeals from '@/components/FeaturedMeals';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import SkeletonCardThree from '@/components/Skeleton/SkeletonCardThree';
import Link from 'next/link';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import { Tag } from 'primereact/tag';
import DoughnutChart from '@/components/DoughnutChart';
import HorizontalAds from '@/components/Ads/HorizontalAds';
import MultiplexAds from '@/components/Ads/MultiplexAds';
import VerticalAds from '@/components/Ads/VerticalAds';

const RecipeDetailScreen = ({ recipe, router }) => {
  const head = () => (
    <Head>
      <title>{`${recipe.name} | Keto Food Generator`}</title>
      <meta name='description' content={recipe.description} />
      <link rel='canonical' href={`${DOMAIN}/recipe/${recipe.slug}`} />
      <meta
        property='og:title'
        content={`${recipe.name} | Keto Food Generator`}
      />
      <meta property='og:description' content={recipe.description} />
      <meta property='og:type' content='webiste' />
      <meta property='og:url' content={`${DOMAIN}/recipe/${recipe.slug}`} />
      <meta property='og:site_name' content={`Keto Food Generator`} />

      <meta property='og:image' content={`${recipe.main_image}`} />
      <meta property='og:image:secure_url' content={`${recipe.main_image}`} />
      <meta property='og:image:type' content='image/png' />
      <meta property='fb:app_id' content={`${FB_APP_ID}`} />
    </Head>
  );

  const [loadingRelated, setLoadingRelated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      loadRelated();
    }

    localStorage.setItem(
      'current_recipe',
      JSON.stringify({
        recipeSlug: recipe.slug,
      })
    );
  }, [recipe._id]);

  const [reviewValue, setReviewValue] = useState({
    name: '',
    rating: 0,
    comment: '',
    error: '',
    loading: false,
    message: '',
  });

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
    setLoadingRelated(true);
    const recipeData = { _id: recipe._id, type: recipe.type };
    listRelated(recipeData).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelatedData(data);
        setLoadingRelated(false);
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

  let cholesterolValue = 0;
  let sugarValue = 0;

  const cholesterol = recipe.servings.filter(
    (item) => item.name == 'Cholesterol'
  );

  if (cholesterol.length !== 0) {
    cholesterolValue = cholesterol[0].size.trim().split(' ').shift();
  }

  const sugar = recipe.servings.filter((item) => item.name == 'Sugar');

  if (sugar.length !== 0) {
    sugarValue = sugar[0].size.trim().split(' ').shift();
  }

  return (
    <div itemScope itemType='http://schema.org/Recipe'>
      {head()}

      <article className='mt-3'>
        <Container>
          <Row>
            <Col md={8}>
              <div>
                <h1 itemProp='name' className='recipe-header__name'>
                  {recipe.name}
                </h1>
              </div>
              <div>
                <i class='far fa-eye'></i> {recipe.viewCount} viewed on this
                recipe.
              </div>

              <div className='my-3' style={{ fontSize: '15px' }}>
                <FacebookShareButton url={`${DOMAIN}/recipe/${recipe.slug}`}>
                  <FacebookIcon size={32} round /> &nbsp;
                </FacebookShareButton>
                <TwitterShareButton url={`${DOMAIN}/recipe/${recipe.slug}`}>
                  <TwitterIcon size={32} round /> &nbsp;
                </TwitterShareButton>
              </div>
              <div className='mb-3' style={{ fontSize: '15px' }}></div>

              <div className='mb-4'></div>
              <div>
                <p itemProp='cookTime'>
                  <strong>Total Time:</strong> {recipe.totalTime}
                  <strong>&nbsp;&nbsp;Serving Size:</strong>{' '}
                  {recipe.servingCount}
                  {recipe.servingCount.length > 1 ? ' servings' : ' serving'}
                </p>
              </div>

              <div className='mt-3'>
                <button
                  className='pill2'
                  style={{ textDecoration: 'none' }}
                  disabled
                >
                  {recipe.type}
                </button>
                {recipe.tags.map((t, i) => (
                  <Link
                    href={`/categories/recipes/${t.slug}`}
                    className='text-decoration-none'
                    key={i}
                    itemProp='recipeCategory'
                  >
                    <Button className='pill'>{t.name}</Button>
                  </Link>
                ))}
              </div>

              <hr />
              {recipe.rating !== 0 && (
                <Rating
                  itemProp='aggregateRating'
                  value={recipe.rating}
                  text={` ${recipe.numReviews} ratings`}
                />
              )}
              <div>
                <HorizontalAds />
              </div>

              <p itemProp='description' className='recipe__description'>
                {recipe.description}
              </p>

              <Image
                itemProp='image'
                src={recipe.main_image}
                alt={recipe.name}
                className='article-main-image mt-4'
                fluid
                style={{ width: '100%', maxWidth: 'auto' }}
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
                    <p className='ingredient-name'> {ingredient.name}</p>
                    <p className='ingredient-size-unit ms-auto'>
                      {ingredient.size} {ingredient.unit}
                    </p>
                  </li>
                ))}
              </ul>
              <div>
                <HorizontalAds />
              </div>
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

              <div>
                <HorizontalAds />
              </div>
              <h4
                className='mt-4 recipe-header__name'
                style={{ fontSize: '35px' }}
              >
                Nutritional Value
              </h4>
              <hr />
              {/* <ul>
                {recipe.servings.map((serving) => (
                  <li key={serving._id} className='mt-3' itemProp='nutrition'>
                    {serving.name} - {serving.size} {serving.unit}
                  </li>
                ))}
              </ul> */}
              <DoughnutChart
                carbs={+recipe.carbs.trim().split(' ').shift()}
                protein={+recipe.protein.split(' ').shift()}
                fat={+recipe.fat.split(' ').shift()}
                calories={+recipe.calories}
                cholesterol={+cholesterolValue}
                sugar={+sugarValue}
              />

              <div>
                <HorizontalAds />
              </div>
            </Col>

            <Col md={4}>
              <aside>
                {isAuth()?.isAdmin && (
                  <>
                    <Link href={`/recipe/update/${recipe.slug}`}>
                      <Button>Edit Recipe</Button>
                    </Link>
                  </>
                )}

                <script
                  async
                  src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7167271672127418'
                  crossorigin='anonymous'
                ></script>
                <ins
                  class='adsbygoogle'
                  style={{ display: 'block' }}
                  data-ad-format='autorelaxed'
                  data-ad-client='ca-pub-7167271672127418'
                  data-ad-slot='8085203419'
                ></ins>
                <script>
                  (adsbygoogle = window.adsbygoogle || []).push({});
                </script>

                <div>
                  <VerticalAds />
                </div>
                {/* <div className='my-3' style={{ fontSize: '15px' }}>
                  <FacebookShareButton url={`${DOMAIN}/recipe/${recipe.slug}`}>
                    <FacebookIcon size={32} round /> &nbsp;Share on Facebook
                  </FacebookShareButton>
                </div>
                <div className='mb-3' style={{ fontSize: '15px' }}>
                  <TwitterShareButton url={`${DOMAIN}/recipe/${recipe.slug}`}>
                    <TwitterIcon size={32} round /> &nbsp;Share on Twitter
                  </TwitterShareButton>
                </div> */}
              </aside>
            </Col>
          </Row>
        </Container>

        <section id='featured-meals' className='mt-4'>
          <Row>
            <h3 className='pt-4 pb-5 text-center'>Related {recipe.type}s</h3>
            {loadingRelated && <SkeletonCardThree />}

            {!loadingRelated && <FeaturedMeals relatedMeals={relatedData} />}
          </Row>
        </section>

        <Container>
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
                    <div>
                      There are no ratings/comments available. Create below.
                    </div>
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
    props: { recipe: data, slug, loadingRelated: false },
  };
}

export default withRouter(RecipeDetailScreen);
