import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "./Product";

/**
 * Products component which displays products
 * @param {Array} currentItems the items to be displayed on the current page 
 * @returns the displayed products
 */
function Products({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((product, index) => (
          <div key={index}>
            <Product
              name={product.name}
              price={product.price}
              rating={product.rating}
              image={product.image}
            />
          </div>
        ))}
    </>
  );
}

/**
 * PaginatedItems component which paginates products
 * @param {Array} items all the items to be paginated
 * @param {Number} itemsPerPage the number of items to be displayed per page
 * @returns a paginated list of items
 */
function PaginatedItems({ items, itemsPerPage }) {

  // products, offset, and page count
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Page handler
  const changePage = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {/* Products */}
      <div className='grid grid-cols-auto-fit-100'>
        <Products currentItems={currentItems} />
      </div>
      
      {/* Pagination Bar */}
      <ReactPaginate
        className='flex justify-center my-14 p-10 mx-96 gap-4 bg-blue-50 m-10 font-bold rounded-xl'
        breakLabel="..."
        nextLabel="NEXT >"
        onPageChange={changePage}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< PREVIOUS"
        renderOnZeroPageCount={null}
        activeClassName='bg-blue-200 px-3 rounded-xl'
      />
    </>
  );
}

export default PaginatedItems;