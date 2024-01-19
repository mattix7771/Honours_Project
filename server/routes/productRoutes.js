import express from 'express';
import { getAllProducts , getAllCategory, getProductsByTitle } from '../database.js';

// Product routes
const router = express.Router();

// Set up database routes
router.get('/', async (req, res) => {
  const products = await getAllProducts();
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

export default router;