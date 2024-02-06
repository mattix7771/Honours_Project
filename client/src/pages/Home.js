import React, {useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import { Button, IconButton } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Navbar from '../components/Navbar';
import Product from '../components/Product';
import Sidebar from '../components/Sidebar';
import Chatbot from '../components/Chatbot';
import DigitalDevices from '../resources/digital devices.jpg'; //Free image from freepik.com

function Home() {

  const [products, setProducts] = useState([{}]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 24;
  const pageCount = Math.ceil(products.length / itemsPerPage);

  // Load products from database
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
  

  const displayProducts = products
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
  console.log(products[0])

  function paginateItems(itemsPerPage){
    setCurrentPage(itemsPerPage.selected);
  }

  return (
    <div>
      
      <Navbar runQuery={runQuery}/>

      <div className='flex bg-[#caf2ff] h-full w-[calc(100%-160px)] m-20 rounded-3xl px-20'>
        <div className="text-6xl min-w-fit font-serif font-semibold text-gray-800 leading-relaxed pt-32">Tech Made Simple,<br/>Shopping Made Fun.
          <div className='text-2xl pt-36 float-right'>Shop our best sellers here<br/>
            <button className='bg-[#9ce6ff] ml-[50%]' onClick={() => {window.scrollTo({top: 10000, behavior: "smooth"})}}>View</button>
          </div>
        </div>
        <img src={DigitalDevices} className='ml-auto'/>
      </div>

      <div className='text-4xl font-serif font-semibold text-gray-800 leading-relaxed pt-32 ml-96'>Our Products</div>
      

      <Sidebar runCategoryQuery={runCategoryQuery}/>

      <div className='grid grid-cols-auto-fit-100 ml-96'>
        {displayProducts}
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

    </div>
  );
}

export default Home;
