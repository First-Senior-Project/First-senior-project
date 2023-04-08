import React, { useState } from 'react';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
 
  }

  return (
    <div className="contact-us">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />

        <label htmlFor="message">Message:</label>
        <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} rows="6" required></textarea>

        <button type="submit">Send Message</button>
      </form>
      <p>Or email us at <a href="mailto:kerdili@rbk.com">kerdili@rbk.com</a></p>
    </div>
  );
}

export default Contact;