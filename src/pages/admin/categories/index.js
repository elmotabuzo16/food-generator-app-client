import Admin from '@/components/Admin';
import Categories from '@/components/Categories';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const AdminTags = () => {
  return (
    <Admin>
      <Container className='py-4'>
        <Row className='justify-content-center'>
          <Col>
            <Categories />
          </Col>
        </Row>
      </Container>
    </Admin>
  );
};

export default AdminTags;
