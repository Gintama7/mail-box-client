
import React, { useState } from 'react'
import { Badge, Container, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { mailActions } from '../store/mail-slice';
import Message from './Message';

const Inbox = () => {
    const incomingMail = useSelector(state => state.mail.inbox);
  //  const readMail = useSelector(state=>state.mail.unread);
   const isRead = useSelector(state=> state.mail.read);
   const dispatch = useDispatch();
   const [showMessage, setShowMessage] = useState(false);
   const [itemId,setItemId] = useState('');

    const inboxHandler=(id)=>{
      dispatch(mailActions.readMail());
      setShowMessage(true);  
      setItemId(id)  ;
    }
  
  return (
    <Container>
        {!showMessage ? <ListGroup>
           { incomingMail.map((item)=>(
                <ListGroup.Item key={item.id} onClick={()=>inboxHandler(item.id)}> {!isRead && <Badge> </Badge>} {item.from} {item.subject} {item.message}</ListGroup.Item>
            ))}
        </ListGroup> : <Message id ={itemId} hide={setShowMessage}/>}
       
    </Container>
  )
}

export default Inbox
