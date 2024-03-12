import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Product Component
 * A card to show the product and all its attributes
 */
function Product(props) {

  // Ensure product's attributes are all valid
  if (props.name == undefined || props.price == undefined || props.image == undefined || props.rating == undefined) {
    return 0;
  }
  
  // Round rating
  const starCount = Math.round(props.rating.split(' ').slice(0,1));

  
  return (
    <div className='w-64 h-80 m-4 mb-14'>
      
      {/* Picture (link to ProductDetails page) */}
      <Link
        to={`/product_details/${encodeURIComponent(props.name)}`}
        state = {{
          title: props.name.split(' ').slice(0, 1).join(' '),
          name: props.name,
          price: props.price,
          image: props.image,
          rating: props.rating 
        }}
        >
        <div className='bg-blue-50 rounded-3xl flex justify-center items-center p-6 mx-3 cursor-pointer' id='productImage'>
          <img src={props.image} className='max-h-[160px] min-h-[160px]'/>
        </div>
      </Link>

      {/* Product Info */}
      <div className='px-5 py-2'>
        <a className='font-bold'>{props.name.split(' ').slice(0, 1).join(' ')}</a><br/>
        <a>{props.name.split(' ').slice(1, 7).join(' ')}</a><br/>
        <a>£{props.price}</a><br/>
        <a>
          {Array(starCount).fill().map((_, index) => (
            <span key={index}>⭐</span>
          ))}
        </a><br/>

      </div>
    </div>
  );
}

export default Product;