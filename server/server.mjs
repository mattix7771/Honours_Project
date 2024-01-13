import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { LlamaModel, LlamaContext, LlamaChatSession } from 'node-llama-cpp';
import { getAllProducts ,getAllPhones, getProductsByTitle } from './database.js';
import { handleRequest } from './chatbot.js';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Set up database routes
app.get('/products', async (req, res) => {
  const products = await getAllProducts();
  res.send(products);
});

// Get products by title
app.get('/products/:title', async (req, res) => {
  const title = req.params.title;
  console.log(title);
  const products = await getProductsByTitle(title);
  console.log(products);
  res.header('Content-Type', 'application/json');
  res.send(products);
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
