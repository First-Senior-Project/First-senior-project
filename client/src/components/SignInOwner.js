import React, { useState } from 'react';
function SignInOwner() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted!');
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


// *when the owner sign in from the component SignInOwner it automatically open the component OwnerInterface
// *in the component OwnerInterface  show the client list of that owner using useEffect and make sure to filter it that the owner can only see the first_name , last_name and balance of that client
// *2 inputs for everysingle client for updating the  balance one for adding(+) and one for destructing(-)
// *a delete buttom for every single client that its clickable only if the client have 0 balance and when you click on it the client will be completly deleted from the list
// *another buttom for every single client to send him a message in the email of that client saying 'hello'


// *when the client sign in from the component SignInClient it automatically open the component ClientInterface
// *in the component ClientInterface show that client first_name , last_name , balance and email,