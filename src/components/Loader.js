import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: '80px',
        height: '80px',
        margin: 'auto',
        display: 'block',
      }}
      className='my-5'
    >
      <span className='sr-only'></span>
    </Spinner>
  );
};

export default Loader;
