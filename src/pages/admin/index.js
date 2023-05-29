import { isAuth } from '@/actions/authActions';
import {
  loadAllApprovedRecipes,
  loadAllNonApprovedRecipes,
} from '@/actions/recipeActions';
import Admin from '@/components/Admin';
import Loader from '@/components/Loader';
import TableRecipeApproved from '@/components/TableRecipeApproved';
import TableRecipeNonApproved from '@/components/TableRecipeNonApproved';
import Tags from '@/components/Tags';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';

const AdminPage = () => {
  const [allApprovedRecipes, setAllApprovedRecipes] = useState([]);

  const [values, setValues] = useState({
    loading: false,
  });

  const { loading } = values;
  const initApprovedRecipes = () => {
    setValues({ ...values, loading: true });

    loadAllApprovedRecipes().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setAllApprovedRecipes(data);
        setValues({ ...values, loading: false });
      }
    });
  };

  useEffect(() => {
    initApprovedRecipes();
  }, []);

  const refreshHandler = (e) => {
    e.preventDefault();

    initApprovedRecipes();
  };

  return (
    <Admin>
      <Container className='py-4'>
        <Row className='justify-content-center'>
          <Col>
            <Tabs
              justify
              variant='pills'
              defaultActiveKey='tab-1'
              className='mb-1 p-0'
            >
              <Tab eventKey='tab-1' title='Non Approved Recipes'>
                <TableRecipeNonApproved />
              </Tab>
              <Tab eventKey='tab-2' title='Approved Recipes'>
                <button
                  className='btn btn-primary mt-3'
                  onClick={refreshHandler}
                  style={{ width: '20em' }}
                >
                  Refresh Recipe's
                </button>

                {loading && <Loader />}
                {!loading && (
                  <TableRecipeApproved allRecipes={allApprovedRecipes} />
                )}
              </Tab>
              <Tab eventKey='tab-3' title='Tags'>
                <Tags />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </Admin>
  );
};

export default AdminPage;
