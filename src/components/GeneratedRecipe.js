import Link from 'next/link';
import React from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import Rating from './Rating';

const GeneratedRecipe = ({ recipe }) => {
  return (
    <section id='generated__recipe'>
      <Card className='mx-auto' style={{ maxWidth: '25rem' }}>
        <Link
          href={`/recipe/${recipe.slug}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <div className='img-hover-zoom '>
            <Card.Img variant='top' src={recipe.main_image} alt={recipe.name} />
          </div>
          <Card.Body>
            <Card.Title className='text-start'>{recipe.name}</Card.Title>
            <p
              style={{
                border: 'none',
                borderBottom: '1px solid rgba(0,0,0,0.125)',
              }}
            />

            <Rating
              value={recipe.rating}
              text={`${'  '}${recipe.numReviews} reviews`}
            />

            <div className='generator_card__body text-start pt-3'>
              <span>
                <i className='fa-regular fa-clock'></i>
              </span>
              <span> {recipe.totalTime} &nbsp;&nbsp;</span>

              <span>
                <i className='fa-solid fa-fire'></i>{' '}
              </span>
              <span> {recipe.calories} Calories</span>
            </div>

            <div className='generator_card__body text-start pt-3'>
              <span>
                <i
                  className='fa-solid fa-circle'
                  style={{ color: '#F94642' }}
                ></i>{' '}
              </span>
              <span> {recipe.carbs} Carbs &nbsp;</span>

              <span>
                <i
                  className='fa-solid fa-circle'
                  style={{ color: '#3177BB' }}
                ></i>{' '}
              </span>
              <span> {recipe.protein} Protein &nbsp;</span>

              <span>
                <i
                  className='fa-solid fa-circle'
                  style={{ color: '#FDA120' }}
                ></i>{' '}
              </span>
              <span> {recipe.fat} Fat</span>
            </div>
          </Card.Body>
        </Link>
      </Card>
    </section>
  );
};

export default GeneratedRecipe;
