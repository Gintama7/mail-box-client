

import './App.css';
import Layout from './components/Layout';
import SignUp from './components/SignUp';

import Home from './components/Home';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route } from 'react-router-dom/cjs/react-router-dom';
import ComposeMail from './components/ComposeMail';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth-slice';
import axios from 'axios';
import { mailActions } from './store/mail-slice';

function App() {
  const isLoggedIn = useSelector((state)=> state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if(token)
    {  dispatch(authActions.login({token,email}));
    axios.get(`https://mail-box-client-39877-default-rtdb.firebaseio.com/emails/${email}/incoming.json`)
      .then((res)=>{
          const data =res.data;
          for(const key in data){
              if (data.hasOwnProperty(key)) {
               dispatch(mailActions.addMailToInbox(data[key]));
                
              }
            }
      })

      axios.get(`https://mail-box-client-39877-default-rtdb.firebaseio.com/emails/${email}/sent.json`)
        .then((res)=>{
            const data =res.data;
            for(const key in data){
                if (data.hasOwnProperty(key)) {
                 dispatch(mailActions.addMailToSent(data[key]));
                  
                }
              }
        })
    }
  },[])

  return (
    <Layout>
      <Switch>
    <Route path='/' exact>
<SignUp/>
    </Route>
    {isLoggedIn && <Route path='/home'>
    <Home/>
    </Route>}
   {isLoggedIn && <Route path='/compose'>
      <ComposeMail/>
    </Route>}
      </Switch>
    
    </Layout>
    
  );
}

export default App;
