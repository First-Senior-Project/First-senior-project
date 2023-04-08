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
 <a><img className='brand-logo' src="https://res.cloudinary.com/dm50agjsx/image/upload/v1680903525/ccnlt5ibm5ungtrdubuk.png"alt="Your Logo"/></a>
          <ul className="nav-links">
              <li><a href="/">Home</a></li>
              <li><a href="About">About</a></li>
              <li><a href="Contact">Contact</a></li>
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
    </div>
  );
}
export default App
