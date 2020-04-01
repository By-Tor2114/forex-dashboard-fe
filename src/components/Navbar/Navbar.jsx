import React from 'react';
import candles from '../../images/candles.png';

import './Navbar.css';

const Navbar = ({ logout }) => {
  return (
    <nav className="Navbar">
      <ul>
        <li>
          <img src={candles} alt="" />
        </li>
      </ul>
      <ul>
        <li className="nav-button">Profile</li>
        <li className="nav-button logout" onClick={logout}>
          Log Out
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
