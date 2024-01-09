import React from 'react';

function Product(props) {
  return (
    <div className='w-64 h-80 border-4'>
      <img src={props.image} className=''/>
      <a>{props.name}</a>
      <a>{props.price}</a>
      <a>{props.rating}</a>
    </div>
  );
};

export default Product;