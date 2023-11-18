
import React from 'react'
import { Container, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Inbox = () => {
    const incomingMail = useSelector(state => state.mail.inbox);
    
  
  return (
    <Container>
        <ListGroup>
           { incomingMail.map((item)=>(
                <ListGroup.Item key={item.id}>{item.from} {item.message}</ListGroup.Item>
            ))}
        </ListGroup>
    </Container>
  )
}

export default Inbox
