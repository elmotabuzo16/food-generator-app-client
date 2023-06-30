import Admin from '@/components/Admin';
import TableRecipeNonApproved from '@/components/TableRecipeNonApproved';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const index = () => {
  return (
    <Admin>
      <Container className='py-4'>
        <Row className='justify-content-center'>
          <Col>
            <TableRecipeNonApproved />
          </Col>
        </Row>
      </Container>
    </Admin>
  );
};

export default index;
