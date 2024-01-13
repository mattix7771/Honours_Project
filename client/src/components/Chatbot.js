import React, {useState} from 'react';
import '../App.css';

function Chatbot() {

    // Get response from language model
    const [userPrompt, setUserPrompt] = useState('');
    const [reply, setReply] = useState('');
  
    const handleSubmit = async () => {
      setReply('');
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
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
      <input
        type="text"
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={handleSubmit}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Submit
      </button>
      <div className="mt-4">
        <p className="text-gray-600">User: {userPrompt}</p>
        <p className="text-gray-800">AI: {reply}</p>
      </div>
    </div>
  );
};

export default Chatbot;