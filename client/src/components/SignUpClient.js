import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function SignUpClient(props) {
  const [name, setName] = useState('');
  const [lastname,setLastName]=useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [idowner,setIdOwner]=useState('');
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted!');
    if (password.length>=8 && lastname.length>2 && name.length>2){
      fetch("http://localhost:3001/api/insertClient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name: name, last_name: lastname, email, password,store_owner_id_owner:idowner })
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
      navigate('/signInClient');
    } else {
      alert('something wrong in the field you typed');
    }
  };
  
  return (
    <form className='formaclient' onSubmit={handleSubmit}>
      <h2>Sign Up For Clients</h2>
      <label>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        &nbsp;&nbsp;&nbsp;Last Name&nbsp;&nbsp;&nbsp;
        <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} />
      </label>
      <label>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        &nbsp;&nbsp;&nbsp;&nbsp;Password&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label>
        Your Owner ID
        <input type="text" value={idowner} onChange={(e) => setIdOwner(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default SignUpClient;