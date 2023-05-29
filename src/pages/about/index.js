import ContactForm from '@/components/ContactForm';
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { withRouter } from 'next/router';
import Head from 'next/head';
import { APP_NAME, DOMAIN } from '../../../config';

const AboutScreen = ({ router }) => {
  const head = () => (
    <Head>
      <title> About Us | Keto Food Generator</title>
      <meta
        name='description'
        content={`${APP_NAME} - Generate delicious and healthy Filipino Keto Meals in seconds. Our keto meal planner creates personalized meal plans based on your dietary preferences and nutritional goals. Say goodbye to boring and repetitive keto meals and hello to a healthier lifestyle with our easy-to-use keto meal generator.`}
      />
      <link rel='canonical' href={`${DOMAIN}/${router.pathname}`} />
      <meta property='og:title' content={`About Us | Keto Food Generator`} />
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

  return (
    <>
      {head()}
      <article className='mt-3'>
        <Container>
          <Row>
            <h1>About Us</h1>
            <p className='mt-3'>
              At Keto Food Generator, our mission is to help people reach their
              health goals through the keto diet. We believe that everyone
              deserves to live a healthy and happy life, and we are committed to
              providing our users with the tools and resources they need to
              succeed.
            </p>

            <p>
              Our application is easy to use and provides users with
              personalized meal plans that meet their individual needs and
              preferences. We offer a wide variety of keto recipes that are both
              delicious and nutritious, we focus on Filipino dishes and we make
              keto meal planning easy and convenient.
            </p>

            <p>
              We are committed to providing our users with the best possible
              experience, and we are always working to improve our keto meal
              generator. If you have any questions or suggestions, please feel
              free to submit a message below.
            </p>

            <p>Thank you for using Keto Food Generator!</p>
          </Row>
          <Row className='mt-3'>
            <ContactForm />
          </Row>
        </Container>
      </article>
    </>
  );
};

export default withRouter(AboutScreen);
