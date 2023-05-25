import '@/styles/Home.module.css';
import { Container, Row } from 'react-bootstrap';
import Upscaling from '@/components/Upscaling';
import Generator from '@/components/Generator';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { API, APP_NAME, DOMAIN } from '../../config';
import Router, { withRouter } from 'next/router';
import FeaturedMeals from '@/components/FeaturedMeals';
import { listFeatured } from '@/actions/recipeActions';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import SkeletonCardThree from '@/components/Skeleton/SkeletonCardThree';

const Home = ({ router, relatedMeals, relatedSnacks }) => {
  const head = () => (
    <Head>
      <title> Keto Food Generator | Low Carb & Keto Meals</title>
      <meta
        name='description'
        content={`${APP_NAME} - Generate delicious and healthy Filipino Keto Meals in seconds. Our keto meal planner creates personalized meal plans based on your dietary preferences and nutritional goals. Say goodbye to boring and repetitive keto meals and hello to a healthier lifestyle with our easy-to-use keto meal generator.`}
      />
      <link rel='canonical' href={`${DOMAIN}${router.pathname}`} />
      <meta
        property='og:title'
        content={`${APP_NAME} | Low Carb & Keto Meals`}
      />
      <meta
        property='og:description'
        content={`${APP_NAME} - Generate delicious and healthy Filipino Keto Meals in seconds. Our keto meal planner creates personalized meal plans based on your dietary preferences and nutritional goals. Say goodbye to boring and repetitive keto meals and hello to a healthier lifestyle with our easy-to-use keto meal generator.`}
      />
      <meta property='og:type' content='webiste' />
      <meta property='og:url' content={`${DOMAIN}${router.pathname}`} />
      <meta property='og:site_name' content={`${APP_NAME}`} />

      <meta
        property='og:image'
        content={`${DOMAIN}/static/images/seoblog.jpg`}
      />
      <meta
        property='og:image:secure_url'
        content={`${DOMAIN}/static/images/seoblog.jpg`}
      />
      <meta property='og:image:type' content='image/jpg' />
    </Head>
  );

  const [featuredMeal, setFeaturedMeal] = useState([]);
  const [featuredMealLoading, setFeaturedMealLoading] = useState(false);
  const [featuredSnack, setFeaturedSnack] = useState([]);
  const [featuredSnackLoading, setFeaturedSnackLoading] = useState(false);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('current_recipe');

      loadFeaturedMeals();
      loadFeaturedSnacks();
    }
  }, []);

  const loadFeaturedMeals = () => {
    setFeaturedMealLoading(true);
    listFeatured('Meal').then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setFeaturedMeal(data);
        setFeaturedMealLoading(false);
      }
    });
  };

  const loadFeaturedSnacks = () => {
    setFeaturedSnackLoading(true);
    listFeatured('Snack').then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setFeaturedSnack(data);
        setFeaturedSnackLoading(false);
      }
    });
  };

  return (
    <>
      {head()}
      <div id='homescreen'>
        <Container>
          <section id='homepage'>
            <Row className='col-md-8 offset-md-2'>
              <h1>Don't know what Keto Food to eat?</h1>
            </Row>
            <Row className='col-md-8 offset-md-2 mb-4 mt-3'>
              <p>
                Keto Food Generator is a comprehensive platform that provides
                users with a meal planner and nutritional information to help
                them follow the ketogenic diet with ease and success.
              </p>
              <p>
                You can generate your meal plan quickly and easily within
                seconds.
                <strong>&nbsp;Lets get cooking! </strong>
              </p>
            </Row>
          </section>
          <section id='generator'>
            <Generator />
          </section>
        </Container>
        <section id='featured-meals' className='mt-4'>
          <h3 className='pt-4 pb-5 text-center'>Featured Meals</h3>
          {featuredMealLoading && <SkeletonCardThree />}
          {!featuredMealLoading && (
            <FeaturedMeals relatedMeals={featuredMeal} />
          )}

          <h3 className='pt-4 pb-5 text-center'>Featured Snacks</h3>
          {featuredSnackLoading && <SkeletonCardThree />}
          {!featuredSnackLoading && (
            <FeaturedMeals relatedMeals={featuredSnack} />
          )}
        </section>
        <section id='upscalling'>
          <Upscaling />
        </section>{' '}
      </div>
    </>
  );
};

export default withRouter(Home);
