import { loadAllApprovedRecipes } from '@/actions/recipeActions';
import TableRecipeApproved from '@/components/TableRecipeApproved';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { withRouter } from 'next/router';
import Head from 'next/head';
import { APP_NAME, DOMAIN } from '../../../config';

const Recipes = ({ router }) => {
  const head = () => (
    <Head>
      <title> Keto Recipes | Keto Food Generator</title>
      <meta
        name='description'
        content={`${APP_NAME} - Generate delicious and healthy Filipino Keto Meals in seconds. Our keto meal planner creates personalized meal plans based on your dietary preferences and nutritional goals. Say goodbye to boring and repetitive keto meals and hello to a healthier lifestyle with our easy-to-use keto meal generator.`}
      />
      <link rel='canonical' href={`${DOMAIN}/${router.pathname}`} />
      <meta
        property='og:title'
        content={`Keto Recipes | Keto Food Generator`}
      />
      <meta
        property='og:description'
        content={`${APP_NAME} - Generate delicious and healthy Filipino Keto Meals in seconds. Our keto meal planner creates personalized meal plans based on your dietary preferences and nutritional goals. Say goodbye to boring and repetitive keto meals and hello to a healthier lifestyle with our easy-to-use keto meal generator.`}
      />
      <meta property='og:type' content='webiste' />
      <meta property='og:url' content={`${DOMAIN}/${router.pathname}`} />
      <meta property='og:site_name' content={`${APP_NAME}`} />

      <meta property='og:image' content={`${DOMAIN}/logo.png`} />
      <meta property='og:image:secure_url' content={`${DOMAIN}/logo.png`} />
      <meta property='og:image:type' content='image/png' />
    </Head>
  );

  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadRecipe = () => {
    setLoading(true);
    loadAllApprovedRecipes().then((data) => {
      if (data.error) {
        console.log(data.error);
        setLoading(false);
      } else {
        setLoading(false);
        setAllRecipes(data);
      }
    });
  };

  useEffect(() => {
    loadRecipe();
  }, []);

  const createProductHandler = (e) => {
    e.preventDefault();

    Router.replace(`/recipe/create/new`);
  };

  return (
    <>
      {head()}

      <Container>
        <Row>
          <TableRecipeApproved allRecipes={allRecipes} loading={loading} />
        </Row>
      </Container>
    </>
  );
};

export default withRouter(Recipes);
