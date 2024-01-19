import express from 'express';

// Basket routes
const router = express.Router();

// Basket array
let basket = [];

// Get basket items
router.get('/getBasket', (req, res) => {
  res.json({ basket });
});

// Add item to basket
router.post('/addToBasket', (req, res) => {
  let product = req.body;
  if (!product || !product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: 'Invalid product data' });
  }
  basket.push(product);
  res.json({ success: true, basket });
});

// Remove item from basket
router.post('/removeFromBasket', (req, res) => {
  let product = req.body;
  if (!product) {
    return res.status(400).json({ success: false, message: 'Invalid product data' });
  }
  basket = basket.filter((item) => item.name !== product.name);
  console.log(basket);
  res.json({ success: true, basket });
});

export default router;