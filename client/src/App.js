import React,{useState} from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import OwnerInterface from './components/OwnerInterface';
import ClientInterface from './components/ClientInterface.js';
import SignInClient from './components/SignInClient';
import SignInOwner from './components/SignInOwner';
import './App.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
function App() {
  const [client,setClient]=useState(false);
  const [owner,setOwner]=useState(false);
  
  function getClient(x){
    setClient(x)
  }
  function getOwner(x){
    setOwner (x)
  }

  return (
    <div className="App">
    <nav id="navbar">
      <div className="nav-wrapper">
 <a href="/" ><img className='brand-logo' src="https://res.cloudinary.com/dm50agjsx/image/upload/v1680903525/ccnlt5ibm5ungtrdubuk.png"alt="Your Logo"/></a>
              <ul className="nav-links">
              <li><a href="/"><h3>Home</h3></a></li>
              <li><a href="About"><h3>About</h3></a></li>
              <li><a href="Contact"><h3>Contact</h3></a></li>
          </ul>
      </div>
  </nav>
      <BrowserRouter>
        <Routes>
          <Route path="signInClient" element={<SignInClient getClient={getClient}/>} />
          <Route path="signInOwner" element={<SignInOwner getOwner={getOwner} />} />
          <Route path="/" element={<Home getClient={getClient} getOwner={getOwner} />} />
          <Route path="/About" element={<About/>} />
          <Route path="/Contact" element={<Contact/>} />
          {owner && <Route path='/OwnerInterface' element={<OwnerInterface />} />}
          {client &&  <Route path='/ClientInterface' element={<ClientInterface  />}  /> }
        </Routes>
      </BrowserRouter>
      <footer className='footer'>
  Copyright &copy; Kerdili 2023
</footer>
<div className="social-icons">
          <a href="https://www.facebook.com/jasser.melki.50/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com/barboochitn/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://github.com/orgs/First-Senior-Project/dashboard" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://discord.com/invite/8vgTUTHNQX" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-discord"></i>
          </a>
        </div>
    </div>
  );
}
export default App