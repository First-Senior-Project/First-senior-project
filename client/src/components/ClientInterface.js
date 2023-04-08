import React, { useState, useEffect } from "react";
import { useLocation,useNavigate } from 'react-router-dom';

import axios from "axios";

function ClientInterface() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
 const navigate=useNavigate();
 const client=useLocation();
 console.log(client.state.id); 
 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/getOne/${client.state.id}`);
        setUser(response.data[0]);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handleLogOut = () => {
    navigate('/'); // navigate to the home component
  };
  return (
    <div>
      <button onClick={handleLogOut}>logOut</button>
      <h1>{user.first_name} {user.last_name}</h1>
      <p>Email: {user.email}</p>
      <p>Balance: {user.balance}</p>
       
    </div>
  );
}

export default ClientInterface;