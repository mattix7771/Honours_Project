import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

function Basket() {

  const [products, setProducts] = useState([{}]);

  useEffect(() => {
    fetch('/getBasket')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.basket);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function removeItem(name) {
    try {
      fetch('/removeFromBasket', {
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
    window.location.reload();
  }

  return (
    <>
      <Navbar />

      <div className='m-2'>
        {products.map((product, index) => (
            <div key={index} className='inline-flex'>
              <img src={product.image} className='max-h-[160px] min-h-[160px]'/>
              <a>{product.name}</a><br/>
              <a>{product.price}</a><br/>
              <button className='bg-blue-300 w-40 h-20 font-bold text-lg' onClick={() => {removeItem(product.name)}}>Remove item</button>
            </div>
          ))}
          
      </div>
    </>
  );
}

export default Basket;
