import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignUpOwner from './SignUpOwner';

function SignInOwner(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/api/authenticateOwner',  { email, password }
    )
      .then(({data}) => {
        
        if (data) {
           props.getOwner (data)
          
          navigate('/OwnerInterface',{state: {id:data.data.id_owner}});
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
  const handleSignUpClick = () => {
    setShowSignUp(true);
  }
  return (
    <>
      {showSignUp ? (
        <SignUpOwner />
      ) : (
        <form className='formowner' onSubmit={handleSubmit}>
          <h2>Sign In For Owners</h2>
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
             <label>Create Account &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button type="button" onClick={handleSignUpClick}>Sign Up</button></label>
             </div>

        </form>
      )}
    </>
  );
}
export default SignInOwner;


// *when the owner sign in from the component SignInOwner it automatically open the component OwnerInterface
// *in the component OwnerInterface  show the client list of that owner using useEffect and make sure to filter it that the owner can only see the first_name , last_name and balance of that client
// *2 inputs for everysingle client for updating the  balance one for adding(+) and one for destructing(-)
// *a delete buttom for every single client that its clickable only if the client have 0 balance and when you click on it the client will be completly deleted from the list
// *another buttom for every single client to send him a message in the email of that client saying 'hello'


// *when the client sign in from the component SignInClient it automatically open the component ClientInterface
// *in the component ClientInterface show that client first_name , last_name , balance and email,