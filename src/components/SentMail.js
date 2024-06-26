import axios from 'axios';
import React, { useState } from 'react'
import { Badge, Button, ButtonGroup, Container, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { mailActions } from '../store/mail-slice';
import SentMessage from './SentMessage';
import './Inbox.css';

const SentMail = () => {
    const sentMail = useSelector(state => state.mail.sent);
    const dispatch =useDispatch();
    const email = useSelector(state=> state.auth.email);
    const [showEmail,setShowEmail] = useState(false);
    const [itemId,setItemId] = useState('');

    const delHandler=async(id)=>{
      let dataPoint ='';
      const res = await axios.get(`https://mail-box-client-39877-default-rtdb.firebaseio.com/emails/${email}/sent.json`);
      const data = res.data;
      for(const key in data){
        
          if(data[key].id === id)
          {
            dataPoint=key;
          }        
      }
      axios.delete(`https://mail-box-client-39877-default-rtdb.firebaseio.com/emails/${email}/sent/${dataPoint}.json`)
      .then(res=>{
        console.log('deleted');
        dispatch(mailActions.removeMail({id:id,type:'sent'}));
      })
    }

    const openHandler=async(id)=>{
      dispatch(mailActions.readMail({id:id,type:'sent'}));
      let dataPoint ='';
      let obj='';
      const res = await axios.get(`https://mail-box-client-39877-default-rtdb.firebaseio.com/emails/${email}/sent.json`);
      const data = res.data;
      for(const key in data){
        
          if(data[key].id === id)
          {
            obj = data[key];
            dataPoint=key;
          }        
      }
      axios.put(`https://mail-box-client-39877-default-rtdb.firebaseio.com/emails/${email}/sent/${dataPoint}.json`,
      {...obj,read:true})
      .then((res)=>{
        console.log('read successfull');
      })
      setItemId(id);
      setShowEmail(true);

    }

  return (
    <Container>
       {!showEmail ? <ListGroup>
           { sentMail.map((item)=>(
                <ListGroup.Item key={item.id} className='d-flex align-items-center justify-content-between'>
               <span className='front'>   {!item.read && <Badge style={{marginRight:'5px'}}> </Badge>}
                  {item.to} - {item.subject} <span className='message'>- {item.message}</span> </span>
                  <ButtonGroup>
                <Button variant='danger' onClick={()=>delHandler(item.id)}>Delete</Button>
                <Button  onClick={()=>openHandler(item.id)}>Read Mail</Button></ButtonGroup>
                </ListGroup.Item>
            ))}
        </ListGroup> : <SentMessage id={itemId} hide={setShowEmail}/>}
    </Container>
  )
}

export default SentMail
