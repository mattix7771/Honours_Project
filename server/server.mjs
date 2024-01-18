import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { LlamaModel, LlamaContext, LlamaChatSession } from 'node-llama-cpp';
import { getAllProducts , getAllCategory, getProductsByTitle } from './database.js';
import { handleRequest } from './chatbot.js';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(bodyParser.json());

// Set up database routes
app.get('/products', async (req, res) => {
  const products = await getAllProducts();
  res.send(products);
});

// Get products by title
app.get('/products/:title', async (req, res) => {
  const title = req.params.title;
  const products = await getProductsByTitle(title);
  res.send(products);
});

// Get all products by category
app.get('/products/category/:category', async (req, res) => {
  const category = req.params.category;
  const products = await getAllCategory(category);
  res.send(products);
});

// Basket
let basket = [];

// Get basket items
app.get('/getBasket', (req, res) => {
  res.json({ basket });
});

// Add item to basket
app.post('/addToBasket', (req, res) => {
  let product = req.body;
  if (!product || !product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: 'Invalid product data' });
  }
  console.log(product);
  basket.push(product);
  console.log(basket);
  res.json({ success: true, basket });
});

// Enable CORS for requests from localhost:3000
const corsOptions = {
  origin: 'http://localhost:5000',
};

app.use(cors(corsOptions));
app.use(express.json());


// Initialize the Llama Model
const modelPath = path.join(__dirname, "models", "llama-2-7b-chat.Q5_K_M.gguf");
const model = new LlamaModel({ modelPath });
const context = new LlamaContext({ model });
const session = new LlamaChatSession({ context });

// API endpoint to handle chat requests
app.post('/chat', async (req, res) => {
  const userPrompt = req.body.prompt;
  const reply = await handleRequest(session, res, userPrompt);
  res.json({ reply });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
