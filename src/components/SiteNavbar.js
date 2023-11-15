import React from 'react'
import {  Container, Nav, Navbar } from 'react-bootstrap'


const SiteNavbar = () => {



  return (
    <Navbar expand="lg" className="bg-body-tertiary" >
    <Container>
      <Navbar.Brand href="/">MyWebLink</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#products">Products</Nav.Link>
          <Nav.Link href="#link">About Us</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>   

    
    
  </Navbar>
  )
}

export default SiteNavbar
