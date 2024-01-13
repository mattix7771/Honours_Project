import React, {useEffect, useState} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Product from './components/Product';
import Sidebar from './components/Sidebar';
import Chatbot from './components/Chatbot';

function App() {

  const [products, setProducts] = useState([{}]);
  const [dataFetched, setDataFetched] = useState(false);

  // Get products from database
  if(!dataFetched){
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
    .then(() => setDataFetched(true))
    .then(() => console.log("All products fetched"))
    .then(() => console.log(products))
    .catch(error => {
      // Handle errors
      console.error('Fetch error:', error);
    });
  }

  // Update products when a new search is made
  const runQuery = async (userSearch) => {
    try {
      const response = await fetch(`/products/${userSearch}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
      
      setProducts(data);

    } catch (error) {
      console.error('Error:', error);
    }
  };



  return (
    <>
      <Navbar runQuery={runQuery}/>

      <Sidebar />

      <div className='grid grid-cols-auto-fit-100 ml-96'>
        {products.map((product, index) => (
          <Product
            key={index}
            name={product.title}
            price={product.price}
            rating={product.rating}
            image={product.image}
          />
        ))}
      </div>

      <div className='fixed right-0 top-2/4 m-3 mx-auto my-8 p-6 max-w-sm h-[340px] border-4 bg-white shadow-2xl rounded-md shadow-black'>
        <Chatbot/>
      </div>
    </>
  );
}

export default App;
