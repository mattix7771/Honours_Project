import express from 'express';
import { getAllProducts , getAllFromTable, getProductsByTitle, getSpecificProduct } from '../database.js';

// Product routes
const router = express.Router();

// Get specific product
router.get('/getSpecificProduct/:productType/:productFilter/:direction(ASC|DESC)/:limit', async (req, res) => {
  const productType = req.params.productType;
  const productFilter = req.params.productFilter;
  const direction = req.params.direction;
  const limit = req.params.limit;
  const products = await getSpecificProduct(productType, productFilter, direction, limit);
  res.send(products);
});

// Get products by title
router.get('/:titles', async (req, res) => {
  const titles = req.params.titles.split(',');
  const products = await getProductsByTitle(titles);
  res.send(products);
});


// Get all products by category
router.get('/category/:category', async (req, res) => {
  const category = req.params.category;
  const products = await getAllFromTable(category);
  res.send(products);
});

// Set up database routes
router.get('/', async (req, res) => {
  const products = await getAllProducts();
  res.send(products);
});


export default router;