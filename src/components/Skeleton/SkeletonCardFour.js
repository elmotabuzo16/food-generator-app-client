import React from 'react';
import { Skeleton } from 'primereact/skeleton';
import { Card, Row } from 'react-bootstrap';

export default function SkeletonCardFour() {
  return (
    <>
      <div className='card-list mt-2'>
        <Row>
          <div className='col-md-4'>
            <Card style={{ width: '20rem' }}>
              <Skeleton height={318} width='100%'></Skeleton>

              <Card.Body>
                <Card.Title className='meal-title'>
                  <Skeleton
                    width='4rem'
                    height='1rem'
                    className='my-2'
                  ></Skeleton>
                </Card.Title>
                <Card.Title style={{ color: 'black', fontSize: '20px' }}>
                  <Skeleton
                    width='12rem'
                    height='2rem'
                    className='mb-2'
                  ></Skeleton>
                </Card.Title>
                <Card.Text>
                  <div
                    className='generator_card__body text-start pt-3'
                    style={{ fontSize: '15px' }}
                  >
                    <Skeleton width='8rem' className='mb-2'></Skeleton>
                  </div>

                  <div
                    className='generator_card__body text-start pt-3'
                    style={{ fontSize: '12px' }}
                  >
                    <Skeleton width='12rem' className='mb-2'></Skeleton>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Row>

        <Row>
          <div className='col-md-4'>
            <Card style={{ width: '20rem' }}>
              <Skeleton height={318} width='100%'></Skeleton>

              <Card.Body>
                <Card.Title className='meal-title'>
                  <Skeleton
                    width='4rem'
                    height='1rem'
                    className='my-2'
                  ></Skeleton>
                </Card.Title>
                <Card.Title style={{ color: 'black', fontSize: '20px' }}>
                  <Skeleton
                    width='12rem'
                    height='2rem'
                    className='mb-2'
                  ></Skeleton>
                </Card.Title>
                <Card.Text>
                  <div
                    className='generator_card__body text-start pt-3'
                    style={{ fontSize: '15px' }}
                  >
                    <Skeleton width='8rem' className='mb-2'></Skeleton>
                  </div>

                  <div
                    className='generator_card__body text-start pt-3'
                    style={{ fontSize: '12px' }}
                  >
                    <Skeleton width='12rem' className='mb-2'></Skeleton>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Row>

        <Row>
          <div className='col-md-4'>
            <Card style={{ width: '20rem' }}>
              <Skeleton height={318} width='100%'></Skeleton>

              <Card.Body>
                <Card.Title className='meal-title'>
                  <Skeleton
                    width='4rem'
                    height='1rem'
                    className='my-2'
                  ></Skeleton>
                </Card.Title>
                <Card.Title style={{ color: 'black', fontSize: '20px' }}>
                  <Skeleton
                    width='12rem'
                    height='2rem'
                    className='mb-2'
                  ></Skeleton>
                </Card.Title>
                <Card.Text>
                  <div
                    className='generator_card__body text-start pt-3'
                    style={{ fontSize: '15px' }}
                  >
                    <Skeleton width='8rem' className='mb-2'></Skeleton>
                  </div>

                  <div
                    className='generator_card__body text-start pt-3'
                    style={{ fontSize: '12px' }}
                  >
                    <Skeleton width='12rem' className='mb-2'></Skeleton>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Row>

        <Row>
          <div className='col-md-4'>
            <Card style={{ width: '20rem' }}>
              <Skeleton height={318} width='100%'></Skeleton>

              <Card.Body>
                <Card.Title className='meal-title'>
                  <Skeleton
                    width='4rem'
                    height='1rem'
                    className='my-2'
                  ></Skeleton>
                </Card.Title>
                <Card.Title style={{ color: 'black', fontSize: '20px' }}>
                  <Skeleton
                    width='12rem'
                    height='2rem'
                    className='mb-2'
                  ></Skeleton>
                </Card.Title>
                <Card.Text>
                  <div
                    className='generator_card__body text-start pt-3'
                    style={{ fontSize: '15px' }}
                  >
                    <Skeleton width='8rem' className='mb-2'></Skeleton>
                  </div>

                  <div
                    className='generator_card__body text-start pt-3'
                    style={{ fontSize: '12px' }}
                  >
                    <Skeleton width='12rem' className='mb-2'></Skeleton>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Row>
      </div>
    </>
  );
}
