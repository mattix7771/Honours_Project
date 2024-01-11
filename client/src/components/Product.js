import React from 'react';

function Product(props) {
  return (
    <div className='w-64 h-80 border-4 m-4'>
      <img src={props.image} className='max-w-[50%] max-h-[50%] translate-x-1/2'/>
      <a>{props.name}</a><br/>
      <a>£{props.price}</a><br/>
      <a>{props.rating}☆</a><br/>
    </div>
  );
};

export default Product;