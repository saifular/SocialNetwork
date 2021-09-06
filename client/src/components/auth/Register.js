import React, { Fragment,useState } from 'react'

export const Register = () => {
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
          console.log('Password do not match');
      }
      else{
          console.log(fromData);
      }
  }
  
    return (
        <Fragment>
        <h1 class="large text-primary">
        Sign Up
      </h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form onSubmit={e=>onSubmit(e)} className="form">
        <div className="form-group">
          <input type="text" placeholder="Name" name='name' value={name} onChange={e=>onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" value={email} onChange={e=>onChange(e)} name='email' />
          <small className="form-text">
            This site uses Gravatar, so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" value={password} onChange={e=>onChange(e)} name='password' minlength="6" />
        </div>
        <div className="form-group">
          <input type="password" name='password2' value={password2} onChange={e=>onChange(e)} placeholder="Confirm Password" minlength="6" />
        </div>
        <input type="submit" value="Register"  className="btn btn-primary" />
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
        </Fragment>
    )
}
