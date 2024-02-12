import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import DigitalDevices from '../resources/digital devices.jpg'; //Free image from freepik.com
import Navbar from '../components/Navbar';
import Product from '../components/Product';
import Chatbot from '../components/Chatbot';
import Footer from '../components/Footer';
import { logAction } from '../util/util';

/** 
 * Home component
 * Entry point of the application.
 */ 
function Home() {

  // Local product storage
  const [products, setProducts] = useState({});

  const productCatogories = [];

  useEffect(() => {
    const fetchProductCatogories = () => {
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        if(key.startsWith('checkbox_') && value === 'true'){
          productCatogories.push(key.slice(9,));
        }
      }
      if(productCatogories.length === 0){
        productCatogories.push('phones');
        productCatogories.push('tvs');
        productCatogories.push('headphones');
        productCatogories.push('laptops');
        productCatogories.push('watches');
      }
    }

    fetchProductCatogories();
  }, []);

  // Fetch all products by category
  useEffect(() => {
    try{
      const fetchProductsByCategory = async () => {
      
        const fetchedProducts = {};

        for(let category of productCatogories){
          const response = await fetch(`/products/category/${category}_backlog`);
          const productsData = await response.json();
          fetchedProducts[category] = productsData;
        }

        setProducts(fetchedProducts);
      }
      fetchProductsByCategory();
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }, []);

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

  // Log starting page action
  useEffect(() => {
    logAction('Opened starting page', 1);
  }, []);
  

  // Display products
  const displayProducts = (products) => products
  .map((product, index) => (
    <div key={index} onClick={() => logAction(`product clicked: ${product.name}`, 2 )}>
      <Product
        name={product.name}
        price={product.price}
        rating={product.rating}
        image={product.image}
      />
    </div>
  ));


  return (
    <div>
      
      {/* Navbar */}
      <Navbar runQuery={runQuery}/>

      {/* Banner */}
      <div className='flex bg-[#caf2ff] h-full w-[90vw] m-20 rounded-3xl px-20 items-center'>
        <div>
          <div className="text-6xl min-w-fit font-serif font-semibold text-gray-800 leading-relaxed pt-32">Tech Made Simple,<br/>Shopping Made Fun.
            <div className='text-2xl pt-36 float-right'>Shop our best sellers here<br/>
              <button className='bg-[#9ce6ff] ml-[50%]' onClick={() => {window.scrollTo({top: 1000, behavior: "smooth"})}}>View</button>
            </div>
          </div>
        </div>
        <img src={DigitalDevices} className='ml-auto'/>
      </div>

      {/* Product Categories */}
      {Object.keys(products).map(category => (
        <div key={category}>
          <div className='text-4xl font-serif font-semibold text-gray-800 leading-relaxed pt-32 ml-96'>{category.charAt(0).toUpperCase() + category.slice(1,)}
            <Link to={`/category_products/${category}`} className='text-2xl float-right'>View All</Link>
          </div>
          <div className='grid grid-cols-6 ml-96'>
            {displayProducts(products[category].slice(0, 4))}
          </div>
        </div>
      ))}

      {/* Chatbot */}
      <Chatbot />
        
      {/* Footer */}
      <Footer />

    </div>
  );
}

export default Home;
