import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { LlamaModel, LlamaContext, LlamaChatSession } from 'node-llama-cpp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Enable CORS for requests from localhost:3000
const corsOptions = {
  origin: 'http://localhost:3000',
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
  try {
    const userPrompt = req.body.prompt;
    if (!userPrompt) {
      return res.status(400).send('No prompt provided');
    }

    console.log("User: " + userPrompt);
    const reply = await session.prompt(userPrompt);
    console.log("AI: " + reply);

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
