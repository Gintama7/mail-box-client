
import React from 'react'
import { Badge, Container, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { mailActions } from '../store/mail-slice';

const Inbox = () => {
    const incomingMail = useSelector(state => state.mail.inbox);
  //  const readMail = useSelector(state=>state.mail.unread);
   const isRead = useSelector(state=> state.mail.read);
   const dispatch = useDispatch();

    const inboxHandler=()=>{
      dispatch(mailActions.readMail());      
    }
  
  return (
    <Container>
        <ListGroup>
           { incomingMail.map((item)=>(
                <ListGroup.Item key={item.id} onClick={inboxHandler}> {!isRead && <Badge> </Badge>} {item.from} {item.message}</ListGroup.Item>
            ))}
        </ListGroup>
    </Container>
  )
}

export default Inbox
