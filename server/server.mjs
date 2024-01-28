import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
//import { handleRequest } from './chatbot.js';
import basketRoutes from './routes/basketRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();
app.use(bodyParser.json());

// Enable CORS for requests from localhost:3000
const corsOptions = {
  origin: 'http://localhost:5000',
};

app.use(cors(corsOptions));
app.use(express.json());

// Set up product routes
app.use('/products', productRoutes);

// Set up basket routes
app.use('/basket', basketRoutes);

// API endpoint to handle LLM chat requests
app.post('/chat', async (req, res) => {
  const userPrompt = req.body.prompt;
  const reply = await handleRequest(session, res, userPrompt);
  res.json({ reply });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
