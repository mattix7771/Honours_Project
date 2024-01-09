import React, {useEffect, useState} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Product from './components/Product';
import Sidebar from './components/Sidebar';

import mockImage from './resources/toucan.png';  

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
    <>
      <Navbar />
      <Sidebar />
      <div className='grid grid-cols-auto-fit-100'>
        <Product image={mockImage} name='Product 1' price='1' rating='2' />
        <Product image={mockImage} name='Product 1' price='1' rating='2' />
        <Product image={mockImage} name='Product 1' price='1' rating='2' />
        <Product image={mockImage} name='Product 1' price='1' rating='2' />
        <Product image={mockImage} name='Product 1' price='1' rating='2' />
        <Product image={mockImage} name='Product 1' price='1' rating='2' />
        <Product image={mockImage} name='Product 1' price='1' rating='2' />
        <Product image={mockImage} name='Product 1' price='1' rating='2' />
        <Product image={mockImage} name='Product 1' price='1' rating='2' />
        <Product image={mockImage} name='Product 1' price='1' rating='2' />
        <Product image={mockImage} name='Product 1' price='1' rating='2' />
        <Product image={mockImage} name='Product 1' price='1' rating='2' />
        <Product image={mockImage} name='Product 1' price='1' rating='2' />
        <Product image={mockImage} name='Product 1' price='1' rating='2' />
        <Product image={mockImage} name='Product 1' price='1' rating='2' />
        <Product image={mockImage} name='Product 1' price='1' rating='2' />
        <Product image={mockImage} name='Product 1' price='1' rating='2' />
        <Product image={mockImage} name='Product 1' price='1' rating='2' />
        <Product image={mockImage} name='Product 1' price='1' rating='2' />
        <Product image={mockImage} name='Product 1' price='1' rating='2' />
        <Product image={mockImage} name='Product 1' price='1' rating='2' />
        <Product image={mockImage} name='Product 1' price='1' rating='2' />
        <Product image={mockImage} name='Product 1' price='1' rating='2' />
        <Product image={mockImage} name='Product 1' price='1' rating='2' />
        
        
      </div>
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
    </>
  );
}

export default App;
