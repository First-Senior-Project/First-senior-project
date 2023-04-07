import React, { useState } from 'react';
import SignInClient from './SignInClient';
import SignUpClient from './SignUpClient';
import SignInOwner from './SignInOwner';
import SignUpOwner from './SignUpOwner';

function Home(props) {
  const [selectedOption, setSelectedOption] = useState("");
  const [showSignInClient, setShowSignInClient] = useState(false);
  const [showSignUpClient, setShowSignUpClient] = useState(false);
  const [showSignInOwner, setShowSignInOwner] = useState(false);
  const [showSignUpOwner, setShowSignUpOwner] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setShowSignInClient(false);
    setShowSignUpClient(false);
    setShowSignInOwner(false);
    setShowSignUpOwner(false);
  };

  const handleClientClick = () => {
    setShowSignInClient(true);
    setShowSignUpClient(false);
  };

  const handleOwnerClick = () => {
    setShowSignInClient(false);
    setShowSignUpClient(false);
    setShowSignInOwner(true);
    setShowSignUpOwner(false);
  };

  const handleSignUpClickK = () => {
    setShowSignUpClient(true);
  };

  const handleSignUpClick = () => {
    setShowSignUpClient(true);
  };

  return (
    <div className="container1">
      <h1 id="welcome-heading">Welcome to My Website!</h1>
      <select id="option-select" value={selectedOption} onChange={handleOptionChange}>
        <option value="">Select an option</option>
        <option value="client">For client</option>
        <option value="owner">For owner</option>
      </select>

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
