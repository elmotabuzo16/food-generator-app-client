import '@/styles/Home.module.css';
import { Container, Row } from 'react-bootstrap';
import Upscaling from '@/components/Upscaling';
import Generator from '@/components/Generator';

export default function Home() {
  return (
    <div id='homescreen'>
      <Container>
        <section id='homepage'>
          <Row className='col-md-8 offset-md-2'>
            <h1>Get ready on your Keto Journey</h1>
          </Row>
          <Row className='col-md-8 offset-md-2 mb-4 mt-3'>
            <p>
              Keto Food Generator is a comprehensive platform that provides
              users with a meal planner and nutritional information to help them
              follow the ketogenic diet with ease and success.
            </p>
            <p>
              You can generate your meal plan quickly and easily within seconds.
              <strong>&nbsp;Lets get cooking! </strong>
            </p>
          </Row>
        </section>
        <section id='generator'>
          <Generator />
        </section>
        <section id='upscalling'>
          <Upscaling />
        </section>
      </Container>
    </div>
  );
}
