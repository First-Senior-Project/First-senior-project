
import React, { useEffect, useState } from 'react';
function ClientInterface() {
  const [clientData, setClientData] = useState({});
  useEffect(() => {
    const idclients = window.location.pathname.split('/').pop(); // Extract idclients from URL
    fetch(`http://localhost:3001/api/getOne/${idclients}`)
      .then((response) => response.json())
      .then((data) => setClientData(data[0])) // Set the user's information in the state
      .catch((error) => console.error(error));
  }, []);
  
  return (
    <div>
      <h2>Welcome, {clientData.firstname} {clientData.lastname}!</h2>
      <p>Email: {clientData.email}</p>
      <p>Phone: {clientData.phone}</p>
      <p>Address: {clientData.address}</p>
    </div>
  );}
export default ClientInterface;