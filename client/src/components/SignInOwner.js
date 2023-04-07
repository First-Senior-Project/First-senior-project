import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignUpOwner from './SignUpOwner';

function SignInOwner(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/api/authenticateOwner',  { email, password }
    )
      .then(({data}) => {
        
        console.log(data);
        if (data) {
           props.getOwner (data)
          
          navigate('/OwnerInterface',{state: {id:data.data.id_owner}});
        } else {
          console.error('Authentication failed');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleSignUpClick = () => {
    setShowSignUp(true);
  }
  return (
    <>
      {showSignUp ? (
        <SignUpOwner />
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
             <p>or instead:<button type="button" onClick={handleSignUpClick}>Sign Up</button></p>
             </div>

        </form>
      )}
    </>
  );
}
export default SignInOwner;
