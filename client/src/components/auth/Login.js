import React, { Fragment,useState } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {login} from '../../actions/auth';
 
 const Login = ({login}) => {
  const [fromData, setFromData] = useState({
      email:'',
      password:''
  });
  const {email,password}=fromData;
  const onChange=e=>setFromData({...fromData,[e.target.name]:e.target.value});
  const onSubmit=e=>{
      e.preventDefault();
     console.log('success');
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
  login: PropTypes.func.isRequired

};
export default connect(null, { login})(Login);
