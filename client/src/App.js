import React, { Fragment ,useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import { Landing } from './components/layout/Landing';
import {Provider} from 'react-redux';
import store from './store';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import {loadUser} from './actions/auth';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(()=>{
    store.dispatch(loadUser());

  }, []);
  return (
    <Provider store={store}>
    <Router>
     <Fragment>
      <Navbar/>
      <Route exact path='/' component={Landing}/>
       <section className="container">
         <Alert/>
  
         <Switch>
         <Route exact path='/register' component={Register}/>
         <Route exact path='/login' component={Login}/>
         <PrivateRoute exact path='/dashboard' component={Dashboard}/>
     

         </Switch>

       </section>


    </Fragment>
  </Router> 
  </Provider>
  );
}

export default App;
