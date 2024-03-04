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
      });
    } catch (error) {
      console.error('Error:', error);
    }

    // Reload page to update basket
    window.location.reload();
  }

  // API call to finish purchase
  async function purchaseItems() {
    try {
      fetch('/basket/removeAll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
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

      {/* Alert */}
      <div class="flex bg-blue-100 border m-4 w-96 justify-center align-middle border-blue-500 text-blue-700 px-4 py-3 hidden" role="alert" id='alert'>
        <p class="font-bold">Product successfully added to cart!</p>
      </div>

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
                  removeItem(product.name);
                  logAction(`product removed from basket: ${product.name}`, 4);}}>
                  Remove item
              </button>
            </div>
          ))}
      </div>

      {/* Purchase Button */}
      <button 
        className='bg-blue-300 w-40 h-20 font-bold text-lg' 
        onClick={() => {
        purchaseItems();
        logAction(`items purchased ${products}`, 7);
        document.querySelector("#alert").classList.toggle("hidden")}}>
        Purchase
      </button>
    </>
  );
}

export default Basket;
