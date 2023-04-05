import React, { useState } from 'react';
import SignInClient from './SignInClient';
import SignUpClient from './SignUpClient';
import SignInOwner from './SignInOwner';
import SignUpOwner from './SignUpOwner';
function Home() {
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
  return (
    <div>
      <h1>Welcome to My Website!</h1>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="">Select an option</option>
        <option value="client">For client</option>
        <option value="owner">For owner</option>
      </select>
      {selectedOption === "client" && (
        <>
          <button onClick={handleClientClick}>Sign In</button>
          <button onClick={() => setShowSignUpClient(true)}>Sign Up</button>
          {showSignInClient && <SignInClient />}
          {showSignUpClient && <SignUpClient />}
        </>
      )}
      {selectedOption === "owner" && (
        <>
          <button onClick={handleOwnerClick}>Sign In</button>
          <button onClick={() => setShowSignUpOwner(true)}>Sign Up</button>
          {showSignInOwner && <SignInOwner />}
          {showSignUpOwner && <SignUpOwner />}
        </>
      )}
    </div>
  );
}
export default Home;