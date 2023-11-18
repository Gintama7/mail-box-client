import React from 'react'
import { Button, Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import Inbox from './Inbox';
import SentMail from './SentMail';

const Home = () => {
  return (
    <Container className='d-flex flex-column align-items-center mt-5 justify-content-center'>
      <h2>Welcome to Your Mail Box</h2> 
       
      <Container className='mt-3'>
       <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <div className='d-grid gap-2 mb-2'>
       <Button size='lg' href='/compose' variant='info'>Compose</Button>
          </div>         
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Inbox</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Sent</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first"><Inbox/></Tab.Pane>
            <Tab.Pane eventKey="second"><SentMail/></Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    </Container>
      </Container>
  )
}

export default Home
