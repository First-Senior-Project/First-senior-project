import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

function OwnerInterface() {
  const user = useLocation();
  console.log(user);
  const [clients, setClients] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [owner,setOwner]=useState([]);
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
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    getOwner();
  }, []);
console.log(owner)
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
  function handleSearchInputChange(event) {
    setSearchQuery(event.target.value);
  }
 
  return (
    <div>
      <button onClick={handleLogOut}>logOut</button>

      <h1>
        hello {owner[0]?.first_name} {owner[0]?.last_name}{" "}
      </h1>
      <h1>your id is: {owner[0]?.id_owner} </h1>

      <div>
        <label htmlFor="searchInput">Search clients by first name:</label>
        <input
          type="text"
          id="searchInput"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>

      <h2>Your clients:</h2>

      <ul className="client-list">
        {filteredClients.map((client) => (
          <li key={client.idclients} className="client-card">
            <div className="card-header">
              <h3>
                {client.first_name} {client.last_name}
              </h3>
              <button
                className="delete-button"
                onClick={() => handleDeleteClient(client.idclients)}
              >
                Delete client
              </button>
            </div>
            <div className="card-body">
              <p>Debt: {client.balance} Millimes</p>
              <div className="balance-input">
                <button onClick={() => handleIncreaseBalance(client.idclients)}>
                  +
                </button>
                <input
                  type="number"
                  min="0"
                  maxLength="6"
                  value={inputValue[client.idclients]}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button onClick={() => handleDecreaseBalance(client.idclients)}>
                  -
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OwnerInterface;