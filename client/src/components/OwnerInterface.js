import { useState, useEffect } from 'react';
import axios from 'axios';

const OwnerInterface = () => {
  const [clients, setClients] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:3001/api/getClient")
    .then(({ data }) => setClients(data))
    .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   axios.get("http://localhost:3001/api/get")

  //   fetchClients();
  // }, []);

  const fetchClients = async () => {
    // Replace 'ownerId' with the actual id of the signed-in owner
    const response = await axios.get(`/api/getClient`, { store_owner_id_owner: ownerId });
    setClients(response.data);
  };

  const updateBalance = async (clientId, amount) => {
    const response = await axios.put(`/api/updateBalance${amount >= 0 ? '+' : '-'}/${clientId}`, { balance: Math.abs(amount) });
    // Update the clients list or refetch the clients
  };

  const deleteClient = async (clientId) => {
    const response = await axios.delete(`/api/deleteClient/${clientId}`);
    // Update the clients list or refetch the clients
  };

  const sendEmail = async (email) => {
    // Implement the email sending logic here
  };

  return (
    <div>
      {clients.map((client) => (
        <div key={client.idclients}>
          <p>{client.first_name} {client.last_name}</p>
          <p>Balance: {client.balance}</p>
          <input type="number" placeholder="Amount" />
          <button onClick={() => updateBalance(client.idclients, amount)}>Add</button>
          <button onClick={() => updateBalance(client.idclients, -amount)}>Subtract</button>
          <button onClick={() => deleteClient(client.idclients)} disabled={client.balance !== 0}>Delete</button>
          <button onClick={() => sendEmail(client.email)}>Send Email</button>
        </div>
      ))}
    </div>
  );
};