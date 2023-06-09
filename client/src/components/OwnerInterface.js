import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

function OwnerInterface() {
  const user = useLocation();
  const [clients, setClients] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [owner,setOwner]=useState([]);
  const [showId, setShowId] = useState(false);
  const navigate = useNavigate(); 
  const [searchQuery, setSearchQuery] = useState("");
  const filteredClients = clients.filter((client) =>
    client.first_name.toLowerCase().includes(searchQuery.toLowerCase())
  );


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
  useEffect(() => {
    async function getOwner() {
      try {
        const response = await axios.get(`http://localhost:3001/api/getOneOwner/${user.state.id}`);
        setOwner(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getOwner();
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
      alert('The client has Debt, cannot be deleted');
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
    navigate('/'); 
  };
  function handleSearchInputChange(event) {
    setSearchQuery(event.target.value);
  };
  
  const handleIdClick = () => {
    setShowId(!showId);
  };
  return (
 
    <div className='allowner'>
      <button className='logout' onClick={handleLogOut}>LogOut</button>
<div className='headOwner'>
<h1> <span className='welcomeword'> Welcome&nbsp;&nbsp;&nbsp; </span>  {owner[0]?.first_name} {owner[0]?.last_name} </h1>
       <h1 className='urid' onClick={handleIdClick}>&nbsp;&nbsp;&nbsp;Your id: {showId ? owner[0]?.id_owner : '*****'} </h1>
     
  </div>    
  <h2 className='clientlist'>Your clients</h2>
  <div className='inputclients'>
        <label htmlFor="searchInput"></label>
        <input placeholder='Search for a client  by his first name'
          type="text"
          id="searchInput"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>

<ul class="client-list">
  {filteredClients.map(client => (
  <li key={client.idclients} class="client-card">
    <div class="card-header">
      <h3>{client.first_name} {client.last_name}</h3>
      <button class="delete-button" onClick={() => handleDeleteClient(client.idclients)}>Delete client</button>
    </div>
    <div class="card-body">
      <p>Debt: {client.balance} Millimes</p>
      <div class="balance-input">
        <button onClick={() => handleIncreaseBalance(client.idclients)}>+</button>
        <input type="number" min="0" maxLength="6"  value={inputValue[client.idclients]} onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={() => handleDecreaseBalance(client.idclients)}>-</button>
      </div>
    </div>
  </li>
  ))}
</ul>
</div>
  );
}

export default OwnerInterface;



    
  