import React, {useEffect, useState} from 'react';
import './App.css';

function App() {

  const [backendData, setBackendData] = useState([{}]);
  const [userPrompt, setUserPrompt] = useState('');
  const [reply, setReply] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userPrompt }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setReply(data.reply);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="rectangle">
        <input
          type="text"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
        <div>
          <p>User: {userPrompt}</p>
          <p>AI: {reply}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
