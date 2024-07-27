// frontend/my-app/src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post('http://127.0.0.1:5000/chat', { message });
      setResponse(result.data.response);
    } catch (error) {
      console.error('There was an error making the request:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat with HealthcareBot</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
        <p>{response}</p>
      </header>
    </div>
  );
}

export default App;




