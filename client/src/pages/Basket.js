import React, { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { logAction } from '../util/util';

/**
 * Basket Page
 * Shows user all products in basket and allows them to be removed
 */
function Basket() {

  // Products in basket
  const [products, setProducts] = useState([{}]);

  const navigate = useNavigate();

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
  }

  // Get all the names of the products in the basket
  function getProductNames(){
    let names = [];
    for(let product of products){
      names.push(product.name);
    }
    return names;
  }

  // API call to generate score based on purchased product
  async function generateScore(){
    
    // Check if there are any products in the basket
    if (products.length == 0) {
      return;
    }

    // Ecode object name
    const purchasedProduct = products[0].name.replace('%','');
    const encodedPurchasedProduct = encodeURIComponent(JSON.stringify(purchasedProduct));

    try{
      // API call to generate score
      const response = await fetch(`/generateScore/${encodedPurchasedProduct}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // Redirect to Home component
      let isCorrectProduct = await response.json();

      if (isCorrectProduct)
        isCorrectProduct = 'correct';
      else
        isCorrectProduct = 'incorrect';

      navigate(`/${isCorrectProduct}`);

    } catch(error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Alert */}
      <div class="flex bg-blue-100 border m-4 w-96 justify-center align-middle border-blue-500 text-blue-700 px-4 py-3 hidden" role="alert" id='alert'>
        <p class="font-bold">Product successfully prchased!</p>
      </div>

      {/* Product */}
      <div className='m-2'>
        {products.map((product, index) => (
            <div key={index} className='flex m-6 my-10'>
              <img src={product.image} className='max-h-[160px] min-h-[160px]'/>
              <a className='font-bold m-5'>{product.name}<br/>£{product.price}</a>
              <button 
                className='bg-blue-300 w-40 h-20 font-bold text-lg rounded-lg ml-10 mt-10' 
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
        className='bg-blue-300 w-40 h-20 font-bold text-lg rounded-lg float-right mr-96' 
        onClick={() => {
        logAction(`items purchased: ${getProductNames().join(',')}`, 7);
        generateScore();
        purchaseItems();
        document.querySelector("#alert").classList.toggle("hidden")}}>
        Purchase
      </button>
    </>
  );
}

export default Basket;
