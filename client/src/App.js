import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Basket from './pages/Basket';
import Settings from './pages/Settings';
import ProductDetails from './pages/ProductDetails';
import CategoryProducts from './pages/CategoryProducts';

/**
 * Router
 * Responsible for the application's naviagtion
 */
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/:isCorrectProduct?' element={<Home />} />
        <Route path='/basket' element={<Basket />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/product_details/:id' element={<ProductDetails />} />
        <Route path='/category_products/:category' element={<CategoryProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
