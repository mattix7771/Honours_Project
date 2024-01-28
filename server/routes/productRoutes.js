import express from 'express';
import { getAllProducts , getAllCategory, getProductsByTitle, getSpecificProduct } from '../database.js';

// Product routes
const router = express.Router();

// Get specific product
router.get('/getSpecificProduct/:productType/:productFilter/:direction(ASC|DESC)', async (req, res) => {
  const productType = req.params.productType;
  const productFilter = req.params.productFilter;
  const direction = req.params.direction;
  const products = await getSpecificProduct(productType, productFilter, direction);
  res.send(products);
});

// Get products by title
router.get('/:title', async (req, res) => {
  const title = req.params.title;
  const products = await getProductsByTitle(title);
  res.send(products);
});

// Get all products by category
router.get('/category/:category', async (req, res) => {
  const category = req.params.category;
  const products = await getAllCategory(category);
  res.send(products);
});

// Set up database routes
router.get('/', async (req, res) => {
  const products = await getAllProducts();
  res.send(products);
});


export default router;