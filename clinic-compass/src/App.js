// frontend/my-app/src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import StartPage from './StartPage';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post('https://clinc-comp.onrender.com/chat', { message });
      setResponse(result.data.response);
    } catch (error) {
      console.error('Error making request:', error);
    }
  };

  return (
    <Router>
      <div className="mobile-border">
        <Routes>
          <Route
            path="/"
            element={<StartPage onStart={() => window.location.href = '/chat'} />}
          />
          <Route
            path="/chat"
            element={
              <div className="App">
                <header className="App-header">
                  <h1>901 Clinic Compass</h1>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ask me about clinics or health"
                    />
                    <button type="submit">Send</button>
                  </form>
                  {response && <p className="response">{response}</p>}
                </header>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;





