import React from 'react';
import { Link } from 'react-router-dom';
import css from '../'
function Navbar() {
  return (
    <nav id="navbar">
    <div className="nav-wrapper">
        <a href="#" className="brand-logo">Logo</a>
        <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </div>
</nav>)
}

export default Navbar;
