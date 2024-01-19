import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { LlamaModel, LlamaContext, LlamaChatSession } from 'node-llama-cpp';
import { handleRequest } from './chatbot.js';
import basketRoutes from './routes/basketRoutes.js';
import productRoutes from './routes/productRoutes.js';


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(bodyParser.json());

// Set up product routes
app.use('/products', productRoutes);

// Set up basket routes
app.use('/basket', basketRoutes);

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
