import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Link from 'next/link';

const Header = () => {
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
            <Nav className='ms-auto'>
              <Nav.Link as={Link} href='/blogs/how-to-start-keto-diet'>
                How to start Keto Diet?
              </Nav.Link>
              <Nav.Link as={Link} href='/about'>
                About Us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
