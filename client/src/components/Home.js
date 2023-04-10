import React, { useState } from 'react';
import SignInClient from './SignInClient';
import SignUpClient from './SignUpClient';
import SignInOwner from './SignInOwner';
import SignUpOwner from './SignUpOwner';
import clientImage from '../client.jpg';
import ownerImage from '../owner.jpg';

function Home(props) {
  const [selectedOption, setSelectedOption] = useState("");
  const [showSignUpClient, setShowSignUpClient] = useState(false);
  const [showSignUpOwner, setShowSignUpOwner] = useState(false);

  function handleClientClick() {
    setSelectedOption("client");
    setShowSignUpClient(false);
    setShowSignUpOwner(false);
  
 
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }

  function handleOwnerClick() {
    setSelectedOption("owner");
    setShowSignUpClient(false);
    setShowSignUpOwner(false);
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }

  function handleSignUpClickK() {
    setShowSignUpClient(true);
  }

  function handleSignUpClick() {
    setShowSignUpOwner(true);
  }

  return (
    <div className="container1">
      <h1 className='tittle' >Welcome to Kerdini</h1>
      <h2 id="welcome-heading">&nbsp;&nbsp;&nbsp;&nbsp;Kerdini is  our revolutionary debt management platform! Whether you're a business owner or a client, we've got you covered. <br/> <span id="click-word">Click</span>  on the photo that best represents you: <br/> business owners get access to tools for easy debt management, <br/> while clients can manage their debt with no fees. <br/>Start taking control of your debt today!</h2>
      <div id="option-buttons">
      <img className='cl' src={clientImage} alt="For client" onClick={handleClientClick} />
      <img className='ow' src={ownerImage} alt="For owner" onClick={handleOwnerClick} />
      </div>

      {selectedOption === "client" && (
        <>
          <SignInClient getClient={props.getClient} handleSignUpClickK={handleSignUpClickK} />
          {showSignUpClient && <SignUpClient />}
        </>
      )}

      {selectedOption === "owner" && (
        <>
          <SignInOwner getOwner={props.getOwner} handleSignUpClick={handleSignUpClick} />
          {showSignUpOwner && <SignUpOwner />}
        </>
      )}
    </div>
  );
}

export default Home;
