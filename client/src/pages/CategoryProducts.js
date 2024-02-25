import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Product from '../components/Product';
import ReactPaginate from 'react-paginate';
import { Button, IconButton } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { logAction, getProductsByTitle } from '../util/util';
import angle_down from '../resources/angle down.png'; //Free image from freepik.com

function CategoryProducts() {

  console.log(useParams());

  const category = useParams().category;
  const [products, setProducts] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [title, setTitle] = useState('');

	const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 24;
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const [filter, setFilter] = useState('Relevance');


  async function fetchDataFromSearch(){
    try{
      const p = await getProductsByTitle(category);
      setProducts(p[0]);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  async function fetchRecommendedProducts(productDetails){
    try{
      const response = await fetch(`/products/getSpecificProduct/${productDetails[0]}/${productDetails[1]}/ASC/5`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      

      const data = await response.json();
      console.log(data);
      setProducts(data);
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchRelevantProducts = async () => {
      if(category.includes('[')){

        const productDetails = JSON.parse(category);
        fetchRecommendedProducts(productDetails);

        setTitle("Recommended products");

        
      } else if(category != 'phones' && category != 'watches' && category != 'laptops' && category != 'headphones' && category != 'tvs'){
        try{
          const p = fetchDataFromSearch();
          setTitle("Search results: " + category)
          setRerender(prev => !prev);
        } catch (error) {
          console.error('Fetch error:', error);
        }
      } else{
        // Fetch relevant category products
        try{
          const response = await fetch(`/products/category/${category}_backlog`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setProducts(data);

          setTitle("Category: " + category);
        } catch (error) {
          console.error('Fetch error:', error);
        }
      }
    };
    fetchRelevantProducts();
  }, [category]);

  useEffect(() => {
    logAction(`opened ${category} product category`, 6);
  }, []);

	const displayProducts = () => products
  .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
	.map((product, index) => (
		<div key={index}>
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

  function toggleDropdown(){
    const dropdown = document.getElementById('chatbotDropdown');
    dropdown.classList.toggle('hidden');
  }

  function updateDropdown(filter){
    setFilter(filter);
    toggleDropdown();
  }

  useEffect(() => {

    let sortedProducts = [...products];

    if(filter == 'Lowest price'){
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if(filter == 'Highest price'){
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if(filter == 'Lowest rating')
      sortedProducts.sort((a, b) => a.rating.split(' ').slice(0,1) - b.rating.split(' ').slice(0,1));
    else if(filter == 'Highest rating')
      sortedProducts.sort((a, b) => b.rating.split(' ').slice(0,1) - a.rating.split(' ').slice(0,1));
    else
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));

    setProducts(sortedProducts);

  }, [filter]);
  

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center">
          <h1 className="text-6xl font-bold text-indigo-950">{title}</h1>
      </div>

      
      <div className='relative my-10'>
        <div className=' w-64 mx-10 border-solid border-gray-400 border-2 px-5 py-2 rounded cursor-pointer font-bold hover:bg-gray-100' onClick={toggleDropdown}>Sort by: {filter}
          <img src={angle_down} className='h-5 w-5 float-right mt-0.5'/>
        </div>
          <div className='hidden rounded border-gray-400 bg-white absolute w-64 border-2 mx-10 shadow-md' id='chatbotDropdown'>
            <div className='hover:bg-gray-100 cursor-pointer p-4' onClick={() => updateDropdown('Relevance')}>Relevance</div>
            <div className='hover:bg-gray-100 cursor-pointer p-4' onClick={() => updateDropdown('Lowest price')}>Lowest Price</div>
            <div className='hover:bg-gray-100 cursor-pointer p-4' onClick={() => updateDropdown('Highest price')}>Highest Price</div>
            <div className='hover:bg-gray-100 cursor-pointer p-4' onClick={() => updateDropdown('Highest rating')}>Highest Rating</div>
            <div className='hover:bg-gray-100 cursor-pointer p-4' onClick={() => updateDropdown('Lowest rating')}>Lowest Rating</div>
          </div>
      </div>
      


      <div className='grid grid-cols-auto-fit-100'>
        {displayProducts()}
      </div>
      
      <div className="flex gap-4 my-4 mx-96 p-4 justify-center bg-blue-100 rounded-xl">
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

export default CategoryProducts;
