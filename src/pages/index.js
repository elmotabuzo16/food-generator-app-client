import '@/styles/Home.module.css';
import { Container, Row } from 'react-bootstrap';
import Upscaling from '@/components/Upscaling';
import Generator from '@/components/Generator';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { API, APP_NAME, DOMAIN } from '../../config';
import { withRouter } from 'next/router';
import FeaturedMeals from '@/components/FeaturedMeals';
import { listFeatured } from '@/actions/recipeActions';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import SkeletonCardFour from '@/components/Skeleton/SkeletonCardFour';
import { pageViews } from '@/actions/generatorAction';

const Home = ({ tags }) => {
  const head = () => (
    <Head>
      <title> Keto Food Generator | Low Carb & Keto Meals</title>
      <meta
        name='description'
        content={`${APP_NAME} - Generate delicious and healthy Filipino Keto Meals in seconds. Our keto meal planner creates personalized meal plans based on your dietary preferences and nutritional goals. Say goodbye to boring and repetitive keto meals and hello to a healthier lifestyle with our easy-to-use keto meal generator.`}
      />
      <meta
        name='keywords'
        content='keto food, ketogenic recipes, low-carb meals, keto diet, keto meal planner, keto recipes, healthy fats, keto-friendly foods, keto filipino meals, keto meal generator, keto food generator'
      />

      <link rel='canonical' href={`${DOMAIN}`} />
      <meta
        property='og:title'
        content={`${APP_NAME} | Low Carb & Keto Meals`}
      />
      <meta
        property='og:description'
        content={`${APP_NAME} - Generate delicious and healthy Filipino Keto Meals in seconds. Our keto meal planner creates personalized meal plans based on your dietary preferences and nutritional goals. Say goodbye to boring and repetitive keto meals and hello to a healthier lifestyle with our easy-to-use keto meal generator.`}
      />
      <meta property='og:type' content='webiste' />
      <meta property='og:url' content={`${DOMAIN}`} />
      <meta property='og:site_name' content={`${APP_NAME}`} />

      <meta property='og:image' content={`${DOMAIN}/logo.png`} />
      <meta property='og:image:secure_url' content={`${DOMAIN}/logo.png`} />
      <meta property='og:image:type' content='image/png' />
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
      pageViews();
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
              <div>
                Keto Food Generator is a comprehensive platform that provides
                users with a meal planner and nutritional information to help
                them follow the ketogenic diet with ease and success.
              </div>
              <div>
                You can generate your meal plan quickly and easily within
                seconds.
                <strong>&nbsp;Lets get cooking! </strong>
              </div>
            </Row>
          </section>
          <section id='generator'>
            <Generator tagOptions={tags} />
          </section>
        </Container>
        <section id='featured-meals' className='mt-4'>
          <h3 className='pt-4 pb-5 text-center'>Featured Meals</h3>
          {featuredMealLoading && <SkeletonCardFour />}
          {!featuredMealLoading && (
            <FeaturedMeals relatedMeals={featuredMeal} />
          )}

          <h3 className='pt-4 pb-5 text-center'>Featured Snacks</h3>
          {featuredSnackLoading && <SkeletonCardFour />}
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

export async function getServerSideProps({ params }) {
  const res = await fetch(`${API}/recipe/foodTags`);
  const data = await res.json();

  return {
    props: { tags: data },
  };
}

export default withRouter(Home);
