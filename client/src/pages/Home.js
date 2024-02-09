import React, {useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import { Button, IconButton } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import DigitalDevices from '../resources/digital devices.jpg'; //Free image from freepik.com
import Navbar from '../components/Navbar';
import Product from '../components/Product';
import Sidebar from '../components/Sidebar';
import Chatbot from '../components/Chatbot';
import Footer from '../components/Footer';

function Home() {

  const [products, setProducts] = useState([{}]);

  const [phones, setPhones] = useState([{}]);
  const [tvs, setTvs] = useState([{}]);
  const [headphones, setHeadphones] = useState([{}]);
  const [laptops, setLaptops] = useState([{}]);
  const [watches, setWatches] = useState([{}]);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 24;
  const pageCount = Math.ceil(products.length / itemsPerPage);

  //Load products from database
  useEffect(() => {
    fetch('/products')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setProducts(data))
      .then(() => console.log(products))
      .catch((error) => console.error('Fetch error:', error));
  }, []);


  useEffect(() => {
    try{
      fetch('/products/category/phones_backlog').then(res => res.json()).then(res => setPhones(res));
      fetch('/products/category/tvs_backlog').then(res => res.json()).then(res => setTvs(res));
      fetch('/products/category/headphones_backlog').then(res => res.json()).then(res => setHeadphones(res));
      fetch('/products/category/laptops_backlog').then(res => res.json()).then(res => setLaptops(res));
      fetch('/products/category/watches_backlog').then(res => res.json()).then(res => setWatches(res));
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }, []);

 

  // useEffect(() => {
  //   const getProductsByCategory = async (category) => {
  //     try {
  //       const response = await fetch(`/products/category/${category}`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });
    
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
    
  //       const responseData = await response.json();
  //       console.log("RESPONSE", responseData);
    
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  //   getProductsByCategory(category);
  // }, []);
  
  

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

  const logAction = async (message, code) => {
    try {
      const response = await fetch('/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ log: message, code: code }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      console.log('Log successfully sent.');
    } catch (error) {
      console.error('Error:', error.message);
    }

    
  };
  

  const displayProducts = (products) => products
    .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    .map((product, index) => (
      <div key={index} onClick={() => logAction(`product clicked: ${product.title}`, 2 )}>
        <Product
          name={product.name}
          price={product.price}
          rating={product.rating}
          image={product.image}
        />
      </div>
    ));


  function paginateItems(itemsPerPage){
    setCurrentPage(itemsPerPage.selected);
  }

  return (
    <div>
      
      {/* Navbar */}
      <Navbar runQuery={runQuery}/>

      {/* Banner */}
      <div className='flex bg-[#caf2ff] h-full w-[calc(100%-160px)] m-20 rounded-3xl px-20'>
        <div className="text-6xl min-w-fit font-serif font-semibold text-gray-800 leading-relaxed pt-32">Tech Made Simple,<br/>Shopping Made Fun.
          <div className='text-2xl pt-36 float-right'>Shop our best sellers here<br/>
            <button className='bg-[#9ce6ff] ml-[50%]' onClick={() => {window.scrollTo({top: 1000, behavior: "smooth"})}}>View</button>
          </div>
        </div>
        <img src={DigitalDevices} className='ml-auto'/>
      </div>

      <div className='text-4xl font-serif font-semibold text-gray-800 leading-relaxed pt-32 ml-96'>Phones</div>
      <div className='grid grid-cols-6 ml-96'>
        {displayProducts(phones.slice(0, 4))}
      </div>
      
      <div className='text-4xl font-serif font-semibold text-gray-800 leading-relaxed pt-32 ml-96'>Tvs</div>
      <div className='grid grid-cols-6 ml-96'>
        {displayProducts(tvs.slice(0, 4))}
      </div>

      <div className='text-4xl font-serif font-semibold text-gray-800 leading-relaxed pt-32 ml-96'>Headphones</div>
      <div className='grid grid-cols-6 ml-96'>
        {displayProducts(headphones.slice(0, 4))}
      </div>

      <div className='text-4xl font-serif font-semibold text-gray-800 leading-relaxed pt-32 ml-96'>Laptops</div>
      <div className='grid grid-cols-6 ml-96'>
        {displayProducts(laptops.slice(0, 4))}
      </div>

      <div className='text-4xl font-serif font-semibold text-gray-800 leading-relaxed pt-32 ml-96'>Watches</div>
      <div className='grid grid-cols-6 ml-96'>
        {displayProducts(watches.slice(0, 4))}
      </div>

      <div className='text-4xl font-serif font-semibold text-gray-800 leading-relaxed pt-32 ml-96'>Our Products</div>

      <Sidebar runCategoryQuery={runCategoryQuery}/>

      <div className='grid grid-cols-auto-fit-100 ml-96'>
        {displayProducts(products)}
      </div>
      
      <div className="flex gap-4 my-4 ml-96 p-4 justify-center bg-blue-100 rounded-xl">
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> PREVIOUS
        </Button>

        <div className="flex items-center gap-7">
          {[...Array(pageCount)].map((_, index) => (
            <IconButton
              key={index}
              variant={currentPage === index ? "filled" : "text"}
              color="gray"
              onClick={() => setCurrentPage(index)}
            >
              {index + 1}
            </IconButton>
          ))}
        </div>
        
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount - 1))}
          disabled={currentPage === pageCount - 1}
        >
          NEXT <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>

      {/* <ReactPaginate
          previousLabel={<ArrowLeftIcon className='h-4 w-4'/> + 'Previous'}
          nextLabel={'Next →'}
          pageCount={Math.ceil(products.length / itemsPerPage)}
          onPageChange={paginateItems}
          containerClassName={'pagination'}
          previousLinkClassName={'pagination__link'}
          nextLinkClassName={'pagination__link'}
          disabledClassName={'pagination__link--disabled'}
          activeClassName={'pagination__link--active'}
          className='flex justify-center'
        />
        <ArrowLeftIcon className='h-4 w-4 border-4' /> */}

        <Chatbot />
        <Footer />
    </div>
  );
}

export default Home;
