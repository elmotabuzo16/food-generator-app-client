import { getRelatedRecipeTag } from '@/actions/tagActions';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import { Card, Container, Row } from 'react-bootstrap';
import Link from 'next/link';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { Skeleton } from 'primereact/skeleton';
import SkeletonCardThree from '@/components/Skeleton/SkeletonCardThree';

const TagSlug = ({ router }) => {
  const [recipes, setRecipes] = useState([{}]);

  const [values, setValues] = useState({
    loading: false,
    error: '',
    success: '',
  });

  const { loading, error, success } = values;

  useEffect(() => {
    initRecipeTags();
  }, []);

  const initRecipeTags = () => {
    setValues({ ...values, loading: true });
    console.log(router.query.slug);
    getRelatedRecipeTag(router.query.slug).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRecipes(data);
        setValues({ ...values, loading: false });
      }
    });
  };

  return (
    <>
      <Container style={{ fontFamily: '' }}>
        <h3
          className='text-center mt-4'
          style={{ textTransform: 'capitalize' }}
        >
          {router.query.slug}
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

export default withRouter(TagSlug);
