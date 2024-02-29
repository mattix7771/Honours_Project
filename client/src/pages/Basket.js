import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { logAction } from '../util/util';

/**
 * Basket Page
 * Shows user all products in basket and allows them to be removed
 */
function Basket() {

  // Products in basket
  const [products, setProducts] = useState([{}]);

  // API call to get all the products added to basket
  useEffect(() => {
    fetch('/basket/getBasket')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.basket);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // API call to remove item from basket
  async function removeItem(name) {
    try {
      fetch('/basket/removeFromBasket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
      })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error('Error:', error);
    }

    // Reload page to update basket
    window.location.reload();
  }


  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Product */}
      <div className='m-2'>
        {products.map((product, index) => (
            <div key={index} className='inline-flex'>
              <img src={product.image} className='max-h-[160px] min-h-[160px]'/>
              <a>{product.name}</a><br/>
              <a>{product.price}</a><br/>
              <button 
                className='bg-blue-300 w-40 h-20 font-bold text-lg' 
                onClick={() => {
                  removeItem(product.name)
                  logAction(`product removed from basket: ${product.name}`, 4)}}>
                  Remove item
              </button>
            </div>
          ))}
          
      </div>
    </>
  );
}

export default Basket;
