import React,{useState} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import OwnerInterface from './components/OwnerInterface';
import ClientInterface from './components/ClientInterface.js';
import SignInClient from './components/SignInClient';
import SignInOwner from './components/SignInOwner';
function App() {
  
const [client,setClient]=useState(false);
const [owner,setOwner]=useState(false)
function getClient(x){
    setClient(x)
}
function getOwner(x){
  setOwner (x)
}
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="signInClient" element={<SignInClient getClient={getClient}/>} />
            <Route path="signInOwner" element={<SignInOwner getOwner={getOwner} />} />
          <Route path="/" element={<Home getClient={getClient} getOwner={getOwner} />} />
            {owner && <Route path='/OwnerInterface' element={<OwnerInterface />} />}
            {client &&  <Route path='/ClientInterface' element={<ClientInterface  />}  /> }
          </Routes>
        </BrowserRouter>
      </div>

  );
}

export default App;