import React from 'react';

function Product(props) {

  
  if (props.name == undefined || props.price == undefined || props.image == undefined || props.rating == undefined) {
    return 0;
  } else{
    const starCount = Math.round(props.rating.split(' ').slice(0,1));
    return (
      <div className='w-64 h-80 m-4 mb-14'>
        <div className='bg-blue-50 rounded-3xl flex justify-center items-center p-6 mx-3'>
          <img src={props.image} className='max-h-[160px] min-h-[160px]'/>
        </div>
        <div className='px-5 py-2'>
          <a className='font-bold'>{props.name.split(' ').slice(0, 3).join(' ')}</a><br/>
          <a>{props.name.split(' ').slice(4, 10).join(' ')}</a><br/>
          <a>{props.price}</a><br/>
          <a>
            {Array(starCount).fill().map((_, index) => (
              <span key={index}>⭐</span>
            ))}
          </a><br/>
  
        </div>
      </div>
    );

  }
};

export default Product;