import React, { useState } from 'react';
import candles from '../../images/candles.png';

import './Navbar.css';
import Modal from '../Modal/Modal';

const Navbar = ({ logout }) => {
  const [showModal, setShowModal] = useState(false);

  const modalToggler = event => {
    event.preventDefault();
    setShowModal(!showModal);
  };

  return (
    <nav className="Navbar">
      <ul>
        <li>
          <img src={candles} alt="" />
        </li>
      </ul>
      <ul>
        <li className="nav-button" onClick={modalToggler}>
          Update Profile
        </li>
        <li className="nav-button logout" onClick={logout}>
          Log Out
        </li>
      </ul>

      {showModal && <Modal toggle={modalToggler} />}
    </nav>
  );
};

export default Navbar;
