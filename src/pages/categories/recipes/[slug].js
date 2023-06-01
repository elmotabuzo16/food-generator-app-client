import { getRelatedRecipeTag } from '@/actions/tagActions';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import { Card, Container, Row } from 'react-bootstrap';
import Link from 'next/link';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { Skeleton } from 'primereact/skeleton';
import SkeletonCardThree from '@/components/Skeleton/SkeletonCardThree';
import Head from 'next/head';
import { DOMAIN, FB_APP_ID } from '../../../../config';

const TagSlug = ({ router, slug }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const TitleName = slug.charAt(0).toUpperCase() + slug.slice(1);

  const head = () => (
    <Head>
      <title> {TitleName} Recipes | Keto Food Generator</title>
      <meta name='description' content={recipes.tagDescription} />
      <link rel='canonical' href={`${DOMAIN}/categories/recipes/${slug}`} />
      <meta
        property='og:title'
        content={`${TitleName} Recipes | Keto Food Generator`}
      />
      <meta property='og:description' content={recipes.tagDescription} />
      <meta property='og:type' content='webiste' />
      <meta
        property='og:url'
        content={`${DOMAIN}/categories/recipes/${slug}`}
      />
      <meta property='og:site_name' content={`Keto Food Generator`} />

      <meta property='og:image' content={`/logo.png`} />
      <meta property='og:image:secure_url' content={`/logo.png`} />
      <meta property='og:image:type' content='image/png' />
      <meta property='fb:app_id' content={`${FB_APP_ID}`} />
    </Head>
  );

  const initRecipeTags = () => {
    setLoading(true);
    getRelatedRecipeTag(slug).then((data) => {
      if (data.error) {
        console.log(data.error);
        setLoading(false);
      } else {
        setRecipes(data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    initRecipeTags();
  }, []);

  return (
    <>
      {head()}

      <Container style={{ fontFamily: '' }}>
        <h3
          className='text-center mt-4'
          style={{ textTransform: 'capitalize' }}
        >
          {slug} Recipes
        </h3>
        {loading && (
          <>
            <Skeleton width='100%' className='mb-2'></Skeleton>
            <Skeleton width='85%' className='mb-2 text-center'></Skeleton>
          </>
        )}

        {!loading && (
          <>
            <p className='text-center mb-5'>{recipes.tagDescription}</p>
          </>
        )}
        <section id='featured-meals' className='mt-5'>
          {loading && (
            <>
              <SkeletonCardThree />
            </>
          )}
          {!loading && (
            <>
              <div className='card-list'>
                {recipes.foods?.map((meal, i) => (
                  <Row key={i}>
                    <div className='col-md-4'>
                      <Link
                        href={`/recipe/${meal.slug}`}
                        className='text-decoration-none'
                      >
                        <Card style={{ width: '20rem' }}>
                          <Card.Img
                            src={meal.main_image}
                            height={318}
                            width={310}
                            className='related-meal'
                          />
                          <Card.Body>
                            <Card.Title className='meal-title'>
                              <strong>{meal.type.toUpperCase()}</strong>
                            </Card.Title>
                            <Card.Title
                              style={{ color: 'black', fontSize: '20px' }}
                            >
                              {meal.name}
                            </Card.Title>
                            <Card.Text>
                              <div
                                className='generator_card__body text-start pt-3'
                                style={{ fontSize: '15px' }}
                              >
                                <span>
                                  <i className='fa-regular fa-clock'></i>
                                </span>
                                <span> {meal.totalTime} &nbsp;&nbsp;</span>

                                <span>
                                  <i className='fa-solid fa-fire'></i>{' '}
                                </span>
                                <span> {meal.calories} Calories</span>
                              </div>

                              <div
                                className='generator_card__body text-start pt-3'
                                style={{ fontSize: '12px' }}
                              >
                                <span>
                                  <i
                                    className='fa-solid fa-circle fa-sm'
                                    style={{ color: '#F94642' }}
                                  ></i>{' '}
                                </span>
                                <span> {meal.carbs} Carbs &nbsp;</span>

                                <span>
                                  <i
                                    className='fa-solid fa-circle fa-sm'
                                    style={{ color: '#3177BB' }}
                                  ></i>{' '}
                                </span>
                                <span> {meal.protein} Protein &nbsp;</span>

                                <span>
                                  <i
                                    className='fa-solid fa-circle fa-sm'
                                    style={{ color: '#FDA120' }}
                                  ></i>{' '}
                                </span>
                                <span> {meal.fat} Fat</span>
                              </div>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Link>
                    </div>
                  </Row>
                ))}
              </div>
            </>
          )}
        </section>
      </Container>
    </>
  );
};
export async function getServerSideProps({ params }) {
  // Fetch data for the page with the given slug
  const { slug } = params;

  return {
    props: { slug },
  };
}

export default withRouter(TagSlug);
