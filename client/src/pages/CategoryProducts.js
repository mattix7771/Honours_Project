import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Product from '../components/Product';
import ReactPaginate from 'react-paginate';
import { Button, IconButton } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { logAction, getProductsByTitle } from '../util/util';

function CategoryProducts() {

  const category = useParams().category;
  const [products, setProducts] = useState([]);
  const [rerender, setRerender] = useState(false);

	const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 24;
  const pageCount = Math.ceil(products.length / itemsPerPage);


  async function fetch(){
    const p = await getProductsByTitle(category);
    setProducts(p[0]);
    return p;
  }

  useEffect(() => {
    const fetchRelevantProducts = async () => {
      if(category.length < 30){
        try{
          const p = fetch();
          console.log(p);
          setRerender(prev => !prev);
        } catch (error) {
          console.error('Fetch error:', error);
        }
      } else{
        // Fetch relevant category products
        try{
            const response = await fetch(`/products/category/${category}_backlog`);
            const data = await response.json();
            setProducts(data);
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

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center">
          <h1 className="text-6xl font-bold text-indigo-950">Category: {category}</h1>
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
