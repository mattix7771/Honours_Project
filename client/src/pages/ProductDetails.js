import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { logAction } from '../util/util';

/**
 * ProductDetails Page
 * A more detailed view of all the product's features
 */
function ProductDetails() {
  
  // Get product's attributes
  const location = useLocation();
  const { id } = useParams();
  const { title, name, price, image, rating } = location.state;
  let productInfo = JSON.stringify({ name, price, image });

  // Round rating
  const starCount = Math.floor(rating.split(' ').slice(0,1));
  
  /**
   * Add product to basket
   */
  async function addToCart() {
    try {

      // API call to add product to basket with its respective attributes
      fetch('/basket/addToBasket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, price, image }),
      })
      .then((res) => {
        if (res.ok) {

          // Show successfully added to cart alert
          const alert = document.getElementById('alert');
          alert.classList.remove('hidden');
        }
        return res.json();
      });
    } catch (error) {
      console.error('Error:', error);
    }
    
    // Log ading product to card action
    logAction(`product added to basket: ${name}`, 3);
  }
  

  return (
    <>

      {/* Navbar */}
      <Navbar />

      {/* Alert */}
      <div class="flex bg-blue-100 border m-4 w-96 justify-center align-middle border-blue-500 text-blue-700 px-4 py-3 hidden" role="alert" id='alert'>
        <p class="font-bold">Product successfully added to cart!</p>
      </div>

      {/* Product Info */}
      <div className='inline-flex m-10 '>
        <img src={image} className='max-h-full min-h-[50vh]'/>
        <div className='mx-20 my-6'>
          <a className='text-7xl font-bold'>{title}</a><br/>
          <div className='m-5 text-3xl font-semibold'>
            <a className=''>{name}</a><br/>
            <a>£{price}</a><br/><br/>
            <a>
              {Array(starCount).fill().map((_, index) => (
                <span key={index}>⭐</span>
              ))}
            </a><br/><br/>
          </div>
          <button className='bg-blue-300 w-40 h-20 font-bold text-lg rounded-lg' onClick={addToCart}>
            Add to cart
          </button>
        </div>
      </div>

    </>
  );
}

export default ProductDetails;
