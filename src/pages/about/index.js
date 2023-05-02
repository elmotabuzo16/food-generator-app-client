import React from 'react';
import { Container, Row } from 'react-bootstrap';

const About = () => {
  return (
    <article className='mt-3'>
      <Container>
        <Row>
          <h1>About Us</h1>
          <p>
            At Keto Food Generator, our mission is to help people reach their
            health goals through the keto diet. We believe that everyone
            deserves to live a healthy and happy life, and we are committed to
            providing our users with the tools and resources they need to
            succeed.
          </p>

          <p>
            Our keto food generator is easy to use and provides users with
            personalized meal plans that meet their individual needs and
            preferences. We offer a wide variety of keto recipes that are both
            delicious and nutritious, and we make keto meal planning easy and
            convenient.
          </p>

          <p>
            We are committed to providing our users with the best possible
            experience, and we are always working to improve our keto meal
            generator. If you have any questions or suggestions, please feel
            free to contact us at: <strong>ketofoodgenerator@gmail.com</strong>
          </p>

          <p>Thank you for choosing Keto Food Generator!</p>
        </Row>
      </Container>
    </article>
  );
};

export default About;
