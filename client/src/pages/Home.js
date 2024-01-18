import React, {useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import { Button, IconButton } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Navbar from '../components/Navbar';
import Product from '../components/Product';
import Sidebar from '../components/Sidebar';
import Chatbot from '../components/Chatbot';

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

  const displayProducts = products
  .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
  .map((product, index) => (
    <Product
      key={index}
      name={product.title}
      price={product.price}
      rating={product.rating}
      image={product.image}
    />
  ));

  function paginateItems(itemsPerPage){
    setCurrentPage(itemsPerPage.selected);
  }

  return (
    <>
      <Navbar runQuery={runQuery}/>

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

    </>
  );
}

export default Home;
