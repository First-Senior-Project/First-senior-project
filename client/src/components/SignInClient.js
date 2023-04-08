import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignUpClient from './SignUpClient';

function SignInClient(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/api/authenticateClient', {email,password}
      )
      .then(({data}) => {
        console.log(data);
        if (data ) {

          props.getClient(data)
          navigate('/ClientInterface',{state: {id:data.data.idclients}});

        } else {
          console.error('Authentication failed');
        }
      })
      .catch((error) => {
        console.error(error);
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
        <form onSubmit={handleSubmit}>
          <h2>Sign In</h2>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit">Submit</button>
          <div>
            <p> Create Account:
          <button type="button" onClick={handleSignUpClickK}>Sign Up</button>
          </p>
          </div>      
        </form>
      )}
    </>
  );
}

export default SignInClient;