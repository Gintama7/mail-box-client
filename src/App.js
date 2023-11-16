

import './App.css';
import Layout from './components/Layout';
import SignUp from './components/SignUp';

import Home from './components/Home';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route } from 'react-router-dom/cjs/react-router-dom';
import ComposeMail from './components/ComposeMail';

function App() {
  return (
    <Layout>
      <Switch>
    <Route path='/' exact>
<SignUp/>
    </Route>
    <Route path='/home'>
    <Home/>
    </Route>
    <Route path='/compose'>
      <ComposeMail/>
    </Route>
      </Switch>
    
    </Layout>
    
  );
}

export default App;
