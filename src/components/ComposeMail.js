import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap';
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { mailActions } from '../store/mail-slice';
import JoditEditor, { Jodit } from 'jodit-react';

const ComposeMail = () => {
    const [usermail,setUserMail] = useState('');
    const [subject, setSubject] = useState('');
    const [mailBody, setMailBody] = useState('');
    const loggedMail= useSelector(state=> state.auth.email);
    const history = useHistory();
    const dispatch = useDispatch();
    // const editor = useRef(null);

    const sendHandler=async(e)=>{
       
e.preventDefault();
const plaintext = Jodit.modules.Helpers.stripTags(mailBody);

    
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
        {id:subject,from:loggedMail,subject:subject,message:plaintext,read:false});

        

        console.log('email sent');
        axios.post(`https://mail-box-client-39877-default-rtdb.firebaseio.com/emails/${loggedMail}/sent.json`,
        {id:subject,to:usermail,subject:subject,message:plaintext,read:false});
        // dispatch(mailActions.addMailToSent({id:subject,to:usermail,subject:subject,message:plaintext,read:false}));
        }catch(err)
        {
            alert(err);
        }
        
        setUserMail('');
        setSubject('');
        setMailBody('');
        history.replace('/home');
    }

    const changeHandler =(value)=>{
        setMailBody(value);
        
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
        {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" onChange={(e)=>setMailBody(e.target.value)}>
       
        <Form.Control as="textarea" rows={3} value={mailBody}  />
      </Form.Group> */}
      <JoditEditor id="my-editor" value={mailBody} onChange={changeHandler}/>
    </Form>
   </Card.Body>
<Card.Footer className='d-flex align-items-center justify-content-center m-0'>
    <Button onClick={sendHandler}>Send</Button>

</Card.Footer>
</Card>
   </Container>
  )
}

export default ComposeMail
