import React, { Fragment,useState } from 'react';
import {Link,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
 
const Register = ({setAlert,register,isAuthenticated})=> {
  const [fromData, setFromData] = useState({
      name:'',
      email:'',
      password:'',
      password2:''
  });
  const {name,email,password,password2}=fromData;
  const onChange=e=>setFromData({...fromData,[e.target.name]:e.target.value});
  const onSubmit=e=>{
      e.preventDefault();
      if(password!==password2){
        setAlert('Password do not match', 'danger');
      }
      else{
         register({name,email,password});
      }
  }
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  
    return (
        <Fragment>
        <h1 class="large text-primary">
        Sign Up
      </h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form onSubmit={e=>onSubmit(e)} className="form">
        <div className="form-group">
          <input type="text" placeholder="Name" name='name' value={name} onChange={e=>onChange(e)}  />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" value={email} onChange={e=>onChange(e)} name='email' />
          <small className="form-text">
            This site uses Gravatar, so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" value={password} onChange={e=>onChange(e)} name='password' />
        </div>
        <div className="form-group">
          <input type="password" name='password2' value={password2} onChange={e=>onChange(e)} placeholder="Confirm Password"  />
        </div>
        <input type="submit" value="Register"  className="btn btn-primary" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
        </Fragment>
    );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool

};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});



export default connect(mapStateToProps, {  setAlert ,register})(Register);
