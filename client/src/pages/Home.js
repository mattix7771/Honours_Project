import React, {useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import Navbar from '../components/Navbar';
import Product from '../components/Product';
import Sidebar from '../components/Sidebar';
import Chatbot from '../components/Chatbot';

function Home() {

  const [products, setProducts] = useState([{}]);
  const [dataFetched, setDataFetched] = useState(false);
  const itemsPerPage = 20;

  // Load products from database
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

  // Update products when a category is selected
  const runCategoryQuery = async (category) => {

    console.log("runCategoryQuery running")
    console.log(category)
    // try {
    //   const response = await fetch(`/products/category/${category}`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
  
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
  
    //   const data = await response.json();
    //   console.log(data);
      
    //   setProducts(data);

    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };

  function paginateItems(itemsPerPage){
    
  }

  return (
    <>
      <Navbar runQuery={runQuery}/>

      <Sidebar runCategoryQuery={runCategoryQuery}/>

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
    </>
  );
}

export default Home;
