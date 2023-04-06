import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
function SignInOwner(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3001/api/authenticateOwner', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.ok) {
           props.getOwner (response.ok)
          navigate('/OwnerInterface');
        } else {
          console.error('Authentication failed');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
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
    </form>
  );
}

export default SignInOwner;
