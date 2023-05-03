import React from 'react';
import { API } from '../../../config';
import { Col, Container, Image, Row } from 'react-bootstrap';
import Rating from '@/components/Rating';

const RecipeDetailScreen = ({ recipe }) => {
  return (
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
                  <Image src={ingredient.image} className='ingredient-image' />
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
              Steps
            </h4>
            <ul>
              {recipe.recipe.directions.map((direction) => (
                <li key={direction._id}>{direction.description}</li>
              ))}
            </ul>
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
                <li key={serving._id}>
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
      </Container>
    </article>
  );
};

export async function getServerSideProps({ params }) {
  // Fetch data for the page with the given slug
  const { slug } = params;

  const res = await fetch(`${API}/api/recipe/${slug}`);
  const data = await res.json();
  return {
    props: {
      recipe: { recipe: data },
    },
  };
}

export default RecipeDetailScreen;
