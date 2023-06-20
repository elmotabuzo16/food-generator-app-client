import Link from 'next/link';
import React from 'react';
import { Card, Row } from 'react-bootstrap';
import HorizontalAds from './Ads/HorizontalAds';

const FeaturedMeals = ({ relatedMeals }) => {
  return (
    <>
      <div className='card-list'>
        {relatedMeals.map((meal, i) => (
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
                    <Card.Title style={{ color: 'black', fontSize: '20px' }}>
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

        <Row style={{ marginTop: '-10px' }}>
          <div className='col-md-4'>
            <div className='text-decoration-none'>
              <Card style={{ width: '20rem' }}>
                <Card.Body>
                  <Card.Title className='meal-title'></Card.Title>
                  <Card.Title
                    style={{ color: 'black', fontSize: '20px' }}
                  ></Card.Title>
                  <Card.Text>
                    <div
                      className='generator_card__body text-start pt-3'
                      style={{ fontSize: '15px' }}
                    >
                      <HorizontalAds />
                    </div>

                    <div
                      className='generator_card__body text-start pt-3'
                      style={{ fontSize: '12px' }}
                    >
                      <HorizontalAds />
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Row>
      </div>
    </>
  );
};

export default FeaturedMeals;
