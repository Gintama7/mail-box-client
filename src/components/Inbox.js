
import React, { useState } from 'react'
import { Badge, Button, Container, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { mailActions } from '../store/mail-slice';
import Message from './Message';
import axios from 'axios';

const Inbox = () => {
    const incomingMail = useSelector(state => state.mail.inbox);
  //  const readMail = useSelector(state=>state.mail.unread); 
   const dispatch = useDispatch();
   const [showMessage, setShowMessage] = useState(false);
   const [itemId,setItemId] = useState('');
   const email = useSelector(state=> state.auth.email);

    const inboxHandler=(id)=>{
      dispatch(mailActions.readMail({id:id,type:'inbox'}));
      setShowMessage(true);  
      setItemId(id)  ;
    }

    const delHandler = async(id)=>{
      let dataPoint ='';
      const res = await axios.get(`https://mail-box-client-39877-default-rtdb.firebaseio.com/emails/${email}/incoming.json`);
      const data = res.data;
      for(const key in data){
        
          if(data[key].id === id)
          {
            dataPoint=key;
          }        
      }
      axios.delete(`https://mail-box-client-39877-default-rtdb.firebaseio.com/emails/${email}/incoming/${dataPoint}.json`)
      .then(res=>{
        console.log('deleted');
        dispatch(mailActions.removeMail({id:id,type:'inbox'}));
      })
    }
  
  return (
    <Container>
        {!showMessage ? <ListGroup>
           { incomingMail.map((item)=>(
                <ListGroup.Item key={item.id} >
                   {!item.read && <Badge> </Badge>}
                    {item.from} {item.subject} {item.message}
                 <Button variant='danger' onClick={()=>delHandler(item.id)}>Delete</Button>
                 <Button onClick={()=>inboxHandler(item.id)}>Open Mail</Button></ListGroup.Item>
            ))}
        </ListGroup> : <Message id ={itemId} hide={setShowMessage}/>}
       
    </Container>
  )
}

export default Inbox
