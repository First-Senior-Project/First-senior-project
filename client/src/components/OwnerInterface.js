import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OwnerInterface() {
  const [clients, setClients] = useState([]);
  
  useEffect(() => {
    async function getClients() {
      try {
        const response = await axios.get(`http://localhost:3001/api/getClient/3`);
        setClients(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getClients();
  }, []);

  return (
    <div>
      <h2>Clients</h2>
      <ul>
        {clients.map(client => (
          <li key={client.idclients}>{client.first_name} - {client.balance}</li>
        ))}
      </ul>
    </div>
  );
}

export default OwnerInterface;
