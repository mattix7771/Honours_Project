import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

function ProductDetails() {
  
    const location = useLocation();
    const { id } = useParams();
    const { title, name, price, image, rating } = location.state;

    let productInfo = JSON.stringify({ name, price, image });
    console.log(productInfo);
    console.log(JSON.stringify({ name: name, price: price, image: image }));

    function addToCart() {
      try {
        fetch('/addToBasket', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, price, image }),
        })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
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
    }
  

  return (
    <>
      <Navbar />
      <div className='inline-flex m-10 '>
        <img src={image} className='max-h-full min-h-[50vh]'/>
        <div className='mx-20 my-6'>
          <a className='text-7xl font-bold'>{title}</a><br/>
          <div className='m-5 text-3xl font-semibold'>
            <a className=''>{name}</a><br/>
            <a>{price}</a><br/>
            <a>{rating}</a><br/>
          </div>
          <button className='bg-blue-300 w-40 h-20 font-bold text-lg' onClick={addToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
