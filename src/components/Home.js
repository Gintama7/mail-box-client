import React from 'react'
import { Container } from 'react-bootstrap';
import {Link } from 'react-router-dom/cjs/react-router-dom';

const Home = () => {
  return (
    <Container className='d-flex flex-column align-items-center mt-5 justify-content-center'>
      <h2>Welcome to Your Mail Box</h2> 
      <Link to='/compose'>Send Mail</Link> 
      </Container>
  )
}

export default Home
