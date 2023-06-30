import React, { useState, useEffect } from 'react';
import { DataView } from 'primereact/dataview';
import { getBlogs } from '@/actions/blogActions';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import Link from 'next/link';
import ArticleCard from './ArticleCard';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs().then((data) => {
      setLoading(true);
      if (data.error) {
        console.log(data.error);
      } else {
        setArticles(data);
        setLoading(false);
      }
    });
  }, []);

  const createArticleHandler = (e) => {
    e.preventDefault();

    Router.replace(`/admin/tags/new`);
  };

  return (
    <>
      <Container className='mt-4'>
        <Row>
          {!loading &&
            articles.map((article) => (
              <ArticleCard key={article.title} article={article} />
            ))}
        </Row>
      </Container>
    </>
  );
};

export default Articles;
