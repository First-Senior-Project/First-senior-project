import React, { useState } from 'react';

function SignUpOwner() {
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted!');

    // make HTTP POST request to server
    fetch("http://localhost:3001/api/insertOwner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ first_name: name, last_name: lastname, email, password })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Last Name:
        <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} />
      </label>
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

export default SignUpOwner;