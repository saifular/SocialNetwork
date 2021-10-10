import React, { Fragment,useState } from 'react'
import {Link,Redirect} from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect} from 'react-redux';
import { login } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
 
 const Login = ({ login,isAuthenticated }) => {
  const [fromData, setFromData] = useState({
      email:'',
      password:''
  });
  const {email,password}=fromData;
  const onChange=e=>setFromData({...fromData,[e.target.name]:e.target.value});
  const onSubmit=e=>{
      e.preventDefault();
      login(email,password);
      
  
  }
  if(isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  
  
    return (
        <Fragment>
        <h1 class="large text-primary">
        Sign In
      </h1>
      <p className="lead"><i className="fas fa-user"></i> Login Into Your Account</p>
      <form onSubmit={e=>onSubmit(e)} className="form">
        <div className="form-group">
          <input type="email" placeholder="Email Address" value={email} onChange={e=>onChange(e)} name='email' />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" value={password} onChange={e=>onChange(e)} name='password' minlength="6" />
        </div>
        <input type="submit" value="Login"  className="btn btn-primary" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sing Up</Link>
      </p>
        </Fragment>
    );
};
Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login })(Login);
