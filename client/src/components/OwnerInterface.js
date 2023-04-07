import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

function OwnerInterface() {
  const user = useLocation();
  console.log(user.state);
  const [clients, setClients] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate(); // get the history object

  useEffect(() => {
    async function getClients() {
      try {
        const response = await axios.get(`http://localhost:3001/api/getClient/${user.state.id}`);
        setClients(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getClients();
  }, []);

  const handleDeleteClient = async (clientId) => {
    const clientToDelete = clients.find(client => client.idclients === clientId);
    if (clientToDelete.balance === 0) {
      const response = await axios.delete(`http://localhost:3001/api/deleteClient/${clientId}`);
      if (response.status === 200) {
        const updatedClients = clients.filter(client => client.idclients !== clientId);
        setClients(updatedClients);
      }
    } else {
      alert('The client has a balance, cannot be deleted');
    }
  };

  const handleIncreaseBalance = async (clientId) => {
    const toAdd = parseInt(inputValue);
    const response = await axios.put(`http://localhost:3001/api/addBalance/${clientId}`, { balance: toAdd });
    if (response.status === 200) {
      const updatedClients = clients.map(client => {
        if (client.idclients === clientId) {
          return {
            ...client,
            balance: client.balance + toAdd,
          };
        }
        return client;
      });
      setClients(updatedClients);
    }
  };

  const handleDecreaseBalance = async (clientId) => {
    const toSubtract = parseInt(inputValue);
    const response = await axios.put(`http://localhost:3001/api/retrieveBalance/${clientId}`, { balance: toSubtract });
    if (response.status === 200) {
      const updatedClients = clients.map(client => {
        if (client.idclients === clientId) {
          return {
            ...client,
            balance: client.balance - toSubtract,
          };
        }
        return client;
      });
      setClients(updatedClients);
    }
  };

  const handleLogOut = () => {
    navigate('/'); // navigate to the home component
  };

  return (
    <div>
      <button onClick={handleLogOut}>logOut</button>
      <h2> Your clients</h2>
      
      <ul>
        {clients.map(client => (
          <div className='card' key={client.idclients}>
            
            <li>{client.first_name}{" "}{client.last_name}</li>
           <li>balance:{client.balance}   <button onClick={() => handleIncreaseBalance(client.idclients)}>+</button>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button onClick={() => handleDecreaseBalance(client.idclients)}>-</button>
             </li>   
           <li><button onClick={() => handleDeleteClient(client.idclients)}>Delete client</button></li>
          </div> 
           
        ))}
      </ul>
      
    </div>
  );
}

export default OwnerInterface;
