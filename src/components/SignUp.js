import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { authActions } from '../store/auth-slice';

const SignUp = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [showLogin,setShowLogin] = useState(true);
    const [forgotPass,setForgotPass] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();


    const submitHandler=async(e)=>{
        e.preventDefault();
        const email=emailRef.current.value;
        const password=passwordRef.current.value;

        localStorage.setItem('mailTwo',email);

        let changedMail = '';
        for(let i=0;i<email.length;i++)
        {
            if(email[i]!== '@' && email[i]!=='.')
            {
                changedMail+= email[i];
            }
        }
        
        if(!showLogin) //Sign Up code
        { const conPassword = confirmPasswordRef.current.value;
            if(password===conPassword)
            {
                try{
                    const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDT2oWEwWPILmEgFzfUeGLV6LTdGItFlGo',
                    { email:email,
                        password:password,
                        returnSecureToken: true});                    
                       dispatch(authActions.login({token:res.data.idToken,email:changedMail}))
                        
                            console.log('successfully signed up');
                        history.replace('/home');
                            
                       
                     
                }
               catch(err){
                    console.log(err);
               }
               
               emailRef.current.value='';
              passwordRef.current.value='';
               confirmPasswordRef.current.value='';
            }else{
                console.log('passwords dont match');
            }
        }else // Login Code
       {
        try{
           const res= await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDT2oWEwWPILmEgFzfUeGLV6LTdGItFlGo',
            {email:email,
                password:password,
                returnSecureToken: true})
                dispatch(authActions.login({token:res.data.idToken,email:changedMail}))
                console.log('loggedin succesfully');
                history.replace('/home');

        } catch(err){
            alert(err);
        }
        emailRef.current.value='';
        passwordRef.current.value='';
        
       }
    }

  return (
    <Container className='mt-5 d-flex flex-column justify-content-center align-items-center m-auto'>
      {!forgotPass ?  <Card>
        <Card.Title className='d-flex mt-2 align-center m-auto'>{!showLogin ? 'Sign Up' : 'Log In'}</Card.Title>
            <Card.Body>
    <Form onSubmit={submitHandler}>
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" required ref={emailRef}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" required ref={passwordRef}/>
      </Form.Group>
     { !showLogin && (<Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" required ref={confirmPasswordRef}/>
      </Form.Group>)}
      <Form.Group className='d-flex flex-column'>
     {showLogin && <p style={{alignSelf:'center',color:'green',cursor:'pointer'}} onClick={()=>{setForgotPass(true)}}>Forgot password?</p>}
       <Button variant="primary" type="submit">
      
       {!showLogin?'Sign Up': 'Login'}
      </Button>
      </Form.Group>
     
    </Form>
    </Card.Body>
    {!showLogin && <Card.Footer>
      Already have an account? <span style={{color:'blue',cursor:'pointer'}} onClick={()=>setShowLogin(!showLogin)} >Login</span>
      </Card.Footer>}
      {showLogin && <Card.Footer>
      Already have an account? <span style={{color:'blue',cursor:'pointer'}} onClick={()=>setShowLogin(!showLogin) }>SignUp</span>
      </Card.Footer>}
    </Card>
   : 
//    <ForgotPassword/>
''
    }
   
     
   
     </Container>
  )
}

export default SignUp
