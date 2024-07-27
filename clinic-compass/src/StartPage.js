// frontend/my-app/src/StartPage.js
import React from 'react';
import './StartPage.css';
import logo from './images/logo.png';  // Import image from src/images

const StartPage = ({ onStart }) => {
  return (
    <div className="start-page">
      <img src={logo} alt="Logo" className="logo" />
      <h1>Welcome to 901 Clinic Compass</h1>
      <p>Find the best healthcare facilities and get health information easily.</p>
      <button onClick={onStart}>Start</button>
    </div>
  );
};

export default StartPage;

