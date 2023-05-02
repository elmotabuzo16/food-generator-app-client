import React from 'react';
import { Container, Image, Row } from 'react-bootstrap';

const Upscaling = () => {
  return (
    <>
      <Container>
        <Row className='col-12 text-center col-md-12 my-5'>
          <h1>
            Eating healthy is now more accessible and convenient than ever
            before.
          </h1>
        </Row>
        <Row className='text-center my-5'>
          <div className='col-12 col-sm-6 col-md-5 offset-md-1 mb-4'>
            <div className='landing-icon'>
              <Image className='landing-icon' src='../../success.png' />
            </div>
            <div className='text-orange'>Convenience</div>
            <div>
              It can save you a lot of time and hassle when it comes to planning
              and preparing your meals. They can take into account your dietary
              restrictions and preferences, and they can generate a variety of
              recipes that are both delicious and nutritious.
            </div>
          </div>

          <div className='col-12 col-sm-6 col-md-5'>
            <div className='landing-icon'>
              <Image className='landing-icon' src='../../differentiation.png' />
            </div>
            <div className='text-orange'>Variety</div>
            <div>
              We offer a wide variety of recipes to choose from, so you're never
              stuck eating the same thing day after day. This can help you stay
              motivated and on track with your diet.
            </div>
          </div>
        </Row>

        <Row className='text-center my-5'>
          <div className='col-12 col-sm-6 col-md-5 offset-md-1 mb-4'>
            <div className='landing-icon'>
              <Image className='landing-icon' src='../../easy-use.png' />
            </div>
            <div className='text-orange'>Ease of use</div>
            <div>
              The application is very easy to use. Simply enter what type of
              food you want to eat, and the generator will do the rest. You can
              then print out your meal plan or save it to your device for easy
              reference.
            </div>
          </div>

          <div className='col-12 col-sm-6 col-md-5'>
            <div className='landing-icon'>
              <Image className='landing-icon' src='../../money.png' />
            </div>
            <div className='text-orange'>Affordability</div>
            <div>
              Recipe's are typically very affordable, especially when compared
              to the cost of eating out or hiring a personal chef.
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Upscaling;
