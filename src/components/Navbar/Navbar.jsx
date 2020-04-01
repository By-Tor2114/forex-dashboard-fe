import React from 'react';
import candles from '../../images/candles.png';

import './Navbar.css';
import Modal from '../Modal/Modal';

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

      <Modal />
    </nav>
  );
};

export default Navbar;
