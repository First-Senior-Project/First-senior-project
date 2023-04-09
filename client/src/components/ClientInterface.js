import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

function ClientInterface() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const client = useLocation();

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

  const handleLogOut = () => {
    navigate('/');
  };

  const handlePopClick = () => {
    const audio = new Audio("./alo.mp3");
    audio.play();
    setMessage(null);
  };

  useEffect(() => {
    if (user && user.balance >= 500000) {
      setMessage("Overdue debt, Payment required for exceeded limit.");
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="popa">
      {message && (
        <div className="popup">
          <h1>{message}</h1>
          <button className="pop" onClick={handlePopClick}>
            OK
            <span className="pop-dot"></span>
          </button>
        </div>
        
      )}
      </div>

      <button className='logout' onClick={handleLogOut}>LogOut</button>
      <div className="clientinterface">
      <h1>{user.first_name} {user.last_name}</h1>
      <p>Email: {user.email}</p>
      <p>Debt: {user.balance}</p>
      </div>

    </div>
  );
}

export default ClientInterface;



