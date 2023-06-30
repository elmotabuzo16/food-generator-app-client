import React from 'react';
import { API } from '../../../config';
import { Col, Container, Image, Row } from 'react-bootstrap';
import moment from 'moment';

const Article = ({ blog }) => {
  const htmlContent = blog.body;
  return (
    <>
      <main>
        <article>
          <Container>
            <Row>
              <Col md={8}>
                <section className='mt-4'>
                  <h2 className='article__header'>{blog.title}</h2>

                  <p
                    className='lead mt-3 blockquote-footer'
                    style={{ fontSize: '17px' }}
                  >
                    Written by &nbsp;
                    {blog.postedBy.name} | Published{' '}
                    {moment(blog.updatedAt).fromNow()}
                  </p>
                </section>

                <section className='mt-4'>
                  <Image
                    src='../creamy-mushroom-soup.png'
                    alt={blog.title}
                    style={{ width: '100%', maxWidth: 'auto' }}
                  />
                </section>

                <section>
                  <div className='mt-4 article-image'>
                    <Container>
                      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    </Container>
                  </div>
                </section>
              </Col>
              <Col md={4}></Col>
            </Row>
          </Container>
        </article>
      </main>
    </>
  );
};

export async function getServerSideProps({ params }) {
  // Fetch data for the page with the given slug
  const { slug } = params;

  const res = await fetch(`${API}/blog/${slug}`);
  const data = await res.json();

  return {
    props: { blog: data, slug, loadingRelated: false },
  };
}

export default Article;
