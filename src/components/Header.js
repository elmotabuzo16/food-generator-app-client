import React from 'react';
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  Button,
} from 'react-bootstrap';
import Link from 'next/link';
import { isAuth, logout } from '@/actions/authActions';
import Router from 'next/router';
import nProgress from 'nprogress';

const startProgress = () => {
  nProgress.start();
};

const stopProgress = () => {
  nProgress.done();
};

const Header = () => {
  Router.events.on('routeChangeStart', startProgress);
  Router.events.on('routeChangeComplete', stopProgress);
  Router.events.on('routeChangeError', stopProgress);

  const logoutHandler = () => {
    logout();
    Router.replace(`/login`);
  };

  return (
    <header>
      <Navbar
        bg='primary'
        variant='dark'
        expand='lg'
        className='navbar navbar-expand-md'
        collapseOnSelect
      >
        <Container>
          <Nav.Link as={Link} href='/'>
            <Navbar.Brand className='header__title' style={{ color: 'white' }}>
              Keto Food Generator
            </Navbar.Brand>
          </Nav.Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mx-auto'>
              <Nav.Link as={Link} href='/blogs/how-to-start-keto-diet'>
                How to start Keto Diet?
              </Nav.Link>
              <Nav.Link as={Link} href='/blogs/'>
                Blogs
              </Nav.Link>
              <Nav.Link as={Link} href='/recipes/'>
                Recipes
              </Nav.Link>
              <Nav.Link as={Link} href='/about' style={{ marginRight: '30px' }}>
                About Us
              </Nav.Link>

              {/* {isAuth() && (
                <NavDropdown title={isAuth().name} id='username'>
                  <Nav.Link as={Link} href='/login'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </Nav.Link>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )} */}
            </Nav>
            <Nav>
              {!isAuth() && (
                <div className='text-center'>
                  <div className='col-auto'>
                    <Button
                      variant='success'
                      onClick={() => Router.replace(`/register`)}
                      style={{ width: '100%' }}
                    >
                      Sign up
                    </Button>
                  </div>
                  <Link href='/login' Am>
                    Already a member? Login.
                  </Link>
                </div>
              )}

              {isAuth() && isAuth().isAdmin && (
                <NavDropdown title='Admin' id='username'>
                  <Nav.Link as={Link} href='/login'>
                    <NavDropdown.Item className='text-center'>
                      Recipe
                    </NavDropdown.Item>
                  </Nav.Link>
                  <Nav.Link as={Link} href='/login'>
                    <NavDropdown.Item className='text-center'>
                      Blogs
                    </NavDropdown.Item>
                  </Nav.Link>
                  <NavDropdown.Item
                    className='text-center'
                    onClick={logoutHandler}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}

              {isAuth() && !isAuth().isAdmin && (
                <NavDropdown title={isAuth().name} id='username'>
                  <Nav.Link as={Link} href='/login'>
                    <NavDropdown.Item className='text-center'>
                      Profile
                    </NavDropdown.Item>
                  </Nav.Link>
                  <NavDropdown.Item
                    className='text-center'
                    onClick={logoutHandler}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
