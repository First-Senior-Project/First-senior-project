import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignUpClient from './SignUpClient';

function SignInClient(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/api/authenticateClient', {email,password}
      )
      .then(({data}) => {
        if (data ) {

          props.getClient(data)
          navigate('/ClientInterface',{state: {id:data.data.idclients}});

        } else {
          console.error('Authentication failed');
        }
      })
      .catch((error) => {
        console.error(error);
        setEmailErrorMessage('Double Check Your Email');
        setPasswordErrorMessage('Double Check Your Password');
      });
  };

  const handleSignUpClickK = () => {
    setShowSignUp(true);
  }

  return (
    <>
       {showSignUp ? (
        <SignUpClient />
      ) : (
        <form className='formclient' onSubmit={handleSubmit}>

          <h2>Sign In For Clients</h2>
          <label>
             &nbsp;&nbsp;&nbsp; Email&nbsp;&nbsp;&nbsp;
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {emailErrorMessage && <span>{emailErrorMessage}</span>}
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {passwordErrorMessage && <span>{passwordErrorMessage}</span>}
          </label>
          <button type="submit">Submit</button>
          <div>
            <label>  Create Account &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button type="button" onClick={handleSignUpClickK}>Sign Up</button>
          </label>
          </div>      
        </form>
      )}
    </>
  );
}

export default SignInClient;





