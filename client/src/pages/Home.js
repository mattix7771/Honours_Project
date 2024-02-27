import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import DigitalDevices from '../resources/digital devices.jpg'; //Free image from freepik.com
import Navbar from '../components/Navbar';
import Product from '../components/Product';
import Chatbot from '../components/Chatbot';
import Footer from '../components/Footer';
import { logAction, getConfig } from '../util/util';


// get product configuration from config file
const config = await getConfig('webStore');
const productCategoriesConfig = config.productCategories.split(',');
const num_products = config.num_products;
const slogan_banner = config.slogan_banner;
let chatbot_show = config.chatbot_show;

/** 
 * Home component
 * Entry point of the application.
 */ 
function Home() {

  console.log("chatbotShow"+chatbot_show)
  // Local product storage
  const [products, setProducts] = useState({});

  const productCategories = productCategoriesConfig;

  // useEffect(() => {
  //   const fetchProductCatogories = () => {
  //     for (var i = 0; i < localStorage.length; i++) {
  //       var key = localStorage.key(i);
  //       var value = localStorage.getItem(key);
  //       if(key.startsWith('checkbox_') && value === 'true'){
  //         productCatogories.push(key.slice(9,));
  //       }
  //     }
  //     if(productCatogories.length === 0){
  //       productCatogories.push('phones');
  //       productCatogories.push('tvs');
  //       productCatogories.push('headphones');
  //       productCatogories.push('laptops');
  //       productCatogories.push('watches');
  //     }
  //   }

  //   fetchProductCatogories();
  // }, []);

  // Fetch all products by category
  useEffect(() => {
    try{
      const fetchProductsByCategory = async () => {
      
        const fetchedProducts = {};

        for(let category of productCategories){
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

  // Log starting page action
  useEffect(() => {
    logAction('Opened starting page', 1);
  }, []);
  

  // Display products
  const displayProducts = (products) => products
  .map((product, index) => (
    <div key={index} onClick={() => {logAction(`product clicked: ${product.name}`, 2 ); chatbot_show = false;}}>
      <Product
        name={product.name}
        price={product.price}
        rating={product.rating}
        image={product.image}
      />
    </div>
  ));

    console.log(slogan_banner)

  return (
    <div>
      
      {/* Navbar */}
      <Navbar/>

      {/* Banner */}
      {slogan_banner && <div className='flex bg-[#caf2ff] h-full w-[90vw] m-20 rounded-3xl px-20 items-center'>
        <div>
          <div className="text-6xl min-w-fit font-serif font-semibold text-gray-800 leading-relaxed pt-32">Tech Made Simple,<br/>Shopping Made Fun.
            <div className='text-2xl pt-36 float-right'>Shop our best sellers here<br/>
              <button className='bg-[#9ce6ff] ml-[50%]' onClick={() => {window.scrollTo({top: 1000, behavior: "smooth"})}}>View</button>
            </div>
          </div>
        </div>
        <img src={DigitalDevices} className='ml-auto'/>
      </div>}

      {/* Product Categories */}
      {Object.keys(products).map(category => (
        <div key={category}>
          <div className='text-4xl font-serif font-semibold text-gray-800 leading-relaxed pt-32 ml-96'>{category.charAt(0).toUpperCase() + category.slice(1,)}
            <Link to={`/category_products/${category}`} className='text-2xl float-right'>View All</Link>
          </div>
          <div className='grid grid-cols-6 ml-96'>
            {displayProducts(products[category].slice(0, num_products))}
          </div>
        </div>
      ))}

      {/* Chatbot */}
      {chatbot_show && < Chatbot />}
        
      {/* Footer */}
      <Footer />

    </div>
  );
}

export default Home;
