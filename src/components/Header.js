import React from 'react';
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  Button,
  Image,
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
    Router.replace(`/ `);
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
              <Image src='../../logo.png' height={60} />
            </Navbar.Brand>
          </Nav.Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mx-auto'>
              <Nav.Link as={Link} href='/recipes'>
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
                      Register here
                    </Button>
                  </div>
                  <Link href='/login' className='text-decoration-none'>
                    Already a member? Login.
                  </Link>
                </div>
              )}

              {isAuth() && isAuth().isAdmin && (
                <>
                  <Nav.Link as={Link} href='/admin'>
                    Admin Dashboard
                  </Nav.Link>

                  <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                </>
              )}

              {isAuth() && !isAuth().isAdmin && (
                <>
                  <NavDropdown
                    title={`Hello, ${isAuth().name}`}
                    id='basic-nav-dropdown'
                  >
                    <NavDropdown.Item>
                      <Link
                        href='/profile/recipes'
                        className='text-decoration-none'
                        style={{ color: 'gray' }}
                      >
                        Created Recipes
                      </Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link
                        href='/profile/favorites'
                        className='text-decoration-none'
                        style={{ color: 'gray' }}
                      >
                        Favorites
                      </Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link
                        href='/profile/account/details'
                        className='text-decoration-none'
                        style={{ color: 'gray' }}
                      >
                        Update Profile
                      </Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link
                        href='/profile/account/changepassword'
                        className='text-decoration-none'
                        style={{ color: 'gray' }}
                      >
                        Change Password
                      </Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
