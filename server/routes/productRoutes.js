import express from 'express';
import { getAllProducts , getAllFromTable, getProductsByTitle, getSpecificProduct } from '../database.js';

// Product routes
const router = express.Router();

// Get specific products
router.get('/getSpecificProduct/:productType/:productFilter/:direction(ASC|DESC)/:secondFilter?/:secondDirection(ASC|DESC)?/:limit', async (req, res) => {
  
  // Parameters to retrieve products from database
  const productType = req.params.productType;
  const productFilter = req.params.productFilter;
  const direction = req.params.direction;
  const limit = req.params.limit;
  const secondFilter = req.params.secondFilter;
  const secondDirection = req.params.secondDirection;

  const products = await getSpecificProduct(productType, productFilter, direction, secondFilter, secondDirection, limit);
  res.send(products);
});

// Get products by title
router.get('/:titles', async (req, res) => {

  const titles = req.params.titles.split(',');
  
  let products = [];
  for (let i = 0; i < titles.length; i++) {
    products.push(await getProductsByTitle(titles[i]));
  }
  
  res.send(products);
});


// Get all products by category
router.get('/category/:category', async (req, res) => {
  const category = req.params.category;
  const products = await getAllFromTable(category);
  res.send(products);
});

// Get all products present in database
router.get('/', async (req, res) => {
  const products = await getAllProducts();
  res.send(products);
});

export default router;