import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const ArticleCard = ({ article }) => {
  return (
    <>
      <section id='articles-page'>
        <Link
          href={`/article/${article.slug}`}
          className='text-decoration-none'
        >
          <Card className='mt-2'>
            <Row>
              <Col md={2}>
                <Card.Img src={`https://picsum.photos/200`} />
              </Col>
              <Col md={10} className='mt-1'>
                <Card.Body>
                  <Card.Text>
                    {article.categories.map((c, i) => (
                      <p key={i} style={{ color: '#f0754f', fontSize: '13px' }}>
                        <strong>{c.name.toUpperCase()}</strong>
                      </p>
                    ))}
                  </Card.Text>

                  <Card.Title>
                    <h4>
                      <strong>{article.title}</strong>
                    </h4>
                  </Card.Title>
                  <Card.Text>
                    <div className='mt-3' style={{ color: 'black' }}>
                      {article.excerpt}
                    </div>
                  </Card.Text>
                  <Card.Text>
                    <div className='mt-3'>
                      <span>
                        <i className='blockquote-footer'>
                          {article.postedBy.name} -{' '}
                          {moment(article.updatedAt).fromNow()}
                        </i>
                      </span>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Link>
      </section>
    </>
  );
};

export default ArticleCard;
