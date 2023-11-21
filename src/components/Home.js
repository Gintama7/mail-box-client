import React, { useEffect } from 'react'
import { Badge, Button, Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import Inbox from './Inbox';
import SentMail from './SentMail';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { mailActions } from '../store/mail-slice';

const Home = () => {

const unreadIn = useSelector(state=> state.mail.unreadInbox);
const unreadOut = useSelector(state=> state.mail.unreadSent);
const email = useSelector(state=>state.auth.email);
const dispatch = useDispatch();

useEffect(()=>{
  axios.get(`https://mail-box-client-39877-default-rtdb.firebaseio.com/emails/${email}/incoming.json`)
  .then((res)=>{
      const data =res.data;
      for(const key in data){
          
           dispatch(mailActions.addMailToInbox(data[key]));
            
        
        }
        axios.get(`https://mail-box-client-39877-default-rtdb.firebaseio.com/emails/${email}/sent.json`)
    .then((res)=>{
        const data =res.data;
        for(const key in data){
           
             dispatch(mailActions.addMailToSent(data[key]));
              
            
          }
    })
  })
},[])

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
              <Nav.Link eventKey="first">Inbox <Badge bg='info'>{unreadIn}</Badge></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Sent <Badge bg='info'>{unreadOut}</Badge></Nav.Link>
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
