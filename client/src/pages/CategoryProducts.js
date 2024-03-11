import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Product from '../components/Product';
import { logAction, getProductsByTitle, getConfig } from '../util/util';
import angle_down from '../resources/angle down.png'; //Free image from freepik.com
import PaginatedItems from '../components/Pagination';

// Get webstore.sort_show configuration from config file
const config = await getConfig('webStore');
const sort_show = config.sort_show;

/**
 * CategoryProducts Page
 * Responsible for showing products results by category, from searches, and from chatbot reccomendations
 */
function CategoryProducts() {

  // webstore.sort_show configuration
  const [sortShow, setSortShow] = useState(sort_show);

  // Products to show and page attrbutes
  const category = useParams().category;
  const [products, setProducts] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [title, setTitle] = useState('');

  // Starting state of sorting dropdown
  const [filter, setFilter] = useState('Relevance');

  /**
   * API call to fetch products by title
   */
  async function fetchDataFromSearch(){
    try{

      // Get API response and assign it to products variable
      const p = await getProductsByTitle(category);
      setProducts(p[0]);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  /**
   * API call to fetch product reccomendations
   * @param {String[]} productDetails the details of the products to get from API (category and filter)
   */
  async function fetchRecommendedProducts(productDetails){
    try{

      // API call to fetch product reccomendations
      const response = await fetch(`/products/getSpecificProduct/${productDetails[0]}/${productDetails[1]}/ASC/5/false`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Get API response and assign it to products variable
      const data = await response.json();
      setProducts(data);
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Check whether this page was triggered from navbar search, category, or webchat
  useEffect(() => {
    const fetchRelevantProducts = async () => {

      // Webchat reccomendations
      if(category.includes('[')){
        const productDetails = JSON.parse(category);
        fetchRecommendedProducts(productDetails);
        setTitle("Recommended products");

      // Product search
      } else if(category != 'phones' && category != 'watches' && category != 'laptops' && category != 'headphones' && category != 'tvs'){
        try{

          const p = fetchDataFromSearch();
          setTitle("Search results: " + category)
          setRerender(prev => !prev);

        } catch (error) {
          console.error('Fetch error:', error);
        }

      // Products by category
      } else{
        // API call to fetch relevant category products
        try{
          const response = await fetch(`/products/category/${category}_backlog`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          // Get API response and assign it to products variable
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

  // Log action upon opening the page
  useEffect(() => {
    logAction(`opened ${category} product category`, 6);
  }, []);

  /**
   * Toggles opening and closing the product sorting dropdown
   */
  function toggleDropdown(){
    const dropdown = document.getElementById('chatbotDropdown');
    dropdown.classList.toggle('hidden');
  }

  /**
   * Updates the filtering options and toggles the dropdown
   * @param {String} filter the order in which the products should be sorted
   */
  function updateDropdown(filter){
    setFilter(filter);
    toggleDropdown();
  }

  // Sorts the products based on filter variable and assigns it to products variable
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

      {/* Navbar */}
      <Navbar />

      {/* Title */}
      <div className="flex justify-center items-center">
          <h1 className="text-6xl font-bold text-indigo-950">{title}</h1>
      </div>

      {/* Sort Dropdown */}
      { sortShow && <div className='relative my-10'>
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
      </div>}

      <PaginatedItems items={Array.from(products)} itemsPerPage={24} />
      
    </>
  );
}

export default CategoryProducts;