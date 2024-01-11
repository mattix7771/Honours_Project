import React, {useEffect, useState} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Product from './components/Product';
import Sidebar from './components/Sidebar';

import mockImage from './resources/toucan.png';
import jsontest from './run_results2.json';

function App() {

  const [products, setProducts] = useState([{}]);

  // Get products from database
  fetch('/products')
  .then(res => {
    // Check if the request was successful
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    // Parse the JSON data in the response
    return res.json();
  })
  .then(res => setProducts(res))
  .catch(error => {
    // Handle errors
    console.error('Fetch error:', error);
  });






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
      <div className='grid grid-cols-auto-fit-100 ml-96'>
        
        {products.map((product, index) => (
          <Product
            key={index}
            image={product.image}
            name={product.title}
            price={product.price}
          />
        ))}
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

      <div className='fixed right-0 top-2/4 m-3 w-72 h-[340px] border-4 bg-gray-400 shadow-2xl shadow-black'>
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
    </>
  );
}

export default App;
