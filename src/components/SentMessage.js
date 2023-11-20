import React from 'react'
import { Button, Col, Container, Navbar, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';

const Message = (props) => {
    const outgoingMail = useSelector(state => state.mail.sent);
    
    let item = outgoingMail.find(mail=> mail.id === props.id);

    const goBackHandler=()=>{
        props.hide(false);
    }


  return (
   <Container>
    <Navbar>
        <Button onClick={goBackHandler}>Back</Button>
    </Navbar>
    <Container>
        <Row className='d-flex flex-column'>
            <Col className='mb-3'>
            <h2>{item.subject}</h2>
            </Col>
            <Col className='mb-3'>
            {item.from}
            </Col>
            <Col className='mb-3'>
            {item.message}
            </Col>
        </Row>
    </Container>
   </Container>
  )
}

export default Message
