import axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { mailActions } from '../store/mail-slice';

const ComposeMail = () => {
    const [usermail,setUserMail] = useState('');
    const [subject, setSubject] = useState('');
    const [mailBody, setMailBody] = useState('');
    const loggedMail= useSelector(state=> state.auth.email);
    const history = useHistory();
    const dispatch = useDispatch();
    const unreadIn= useSelector(state=>state.mail.unreadInbox);
    const unreadOut= useSelector(state=>state.mail.unreadSent);

    const sendHandler=async(e)=>{
       
e.preventDefault();
    
        let sendingMail ='';
        for(let i=0;i<usermail.length;i++)
        {
            if(usermail[i]!== '@' && usermail[i]!=='.')
            {
                sendingMail+= usermail[i];
            }
        }
        try{
           const res = await axios.post(`https://mail-box-client-39877-default-rtdb.firebaseio.com/emails/${sendingMail}/incoming.json`,
        {id:subject,from:loggedMail,subject:subject,message:mailBody,read:false});

        dispatch(mailActions.addMailToInbox({id:subject,from:loggedMail,subject:subject,message:mailBody,read:false}));

        console.log('email sent');
        axios.post(`https://mail-box-client-39877-default-rtdb.firebaseio.com/emails/${loggedMail}/sent.json`,
        {id:subject,to:usermail,subject:subject,message:mailBody,read:false});
        dispatch(mailActions.addMailToSent({id:subject,to:usermail,subject:subject,message:mailBody,read:false}));
        }catch(err)
        {
            alert(err);
        }
        
        setUserMail('');
        setSubject('');
        setMailBody('');
        history.replace('/home');
    }

  return (
   <Container className='d-flex flex-column'>
    <Card lg={8}>
        <Card.Body>
    <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="To" onChange={(e)=>setUserMail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Subject" onChange={(e)=>setSubject(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" onChange={(e)=>setMailBody(e.target.value)}>
        {/* <Form.Label>Mail Body</Form.Label> */}
        <Form.Control as="textarea" rows={3}  />
      </Form.Group>
    </Form>
   </Card.Body>
<Card.Footer className='d-flex align-items-center justify-content-center m-0'>
    <Button onClick={sendHandler}>Send</Button>
<Editor
//   editorState={editorState}
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
//   onEditorStateChange={this.onEditorStateChange}
/>
</Card.Footer>
</Card>
   </Container>
  )
}

export default ComposeMail
