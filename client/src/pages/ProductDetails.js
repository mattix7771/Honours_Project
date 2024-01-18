import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

function ProductDetails() {
  
    const location = useLocation();
    const { name } = useParams();
    const { price, image, rating } = location.state;

    
  

  return (
    <>
        <Navbar />
      Name: {name}<br/>
        Price: {price}<br/>
        Image: {image}<br/>
        Rating: {rating}<br/>
    </>
  );
}

export default ProductDetails;
