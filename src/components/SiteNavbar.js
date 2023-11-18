import React from 'react'
import {  Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


const SiteNavbar = () => {
  const isLoggedIn = useSelector((state)=> state.auth.isAuthenticated);
  const history = useHistory();
  const logOutHandler=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    history.replace('/');
  }


  return (
    <Navbar expand="lg" className="bg-body-tertiary" >
    <Container>
      <Navbar.Brand href="/">MyWebLink</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="#products">Products</Nav.Link>
          <Nav.Link href="#link">About Us</Nav.Link>
        </Nav>
       {isLoggedIn && <Nav>
          <Button variant='danger' onClick={logOutHandler}>Log Out</Button>
        </Nav>}
      </Navbar.Collapse>
    </Container>   

    
    
  </Navbar>
  )
}

export default SiteNavbar
