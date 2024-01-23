import path from 'path';
import { fileURLToPath } from 'url';
import { LlamaModel, LlamaContext, LlamaChatSession } from 'node-llama-cpp';

// Initialize the Llama Model
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const modelPath = path.join(__dirname, "models", "llama-2-7b-chat.Q5_K_M.gguf");
const model = new LlamaModel({ modelPath });
const context = new LlamaContext({ model });
const session = new LlamaChatSession({ context });

export function handleRequest(session, res, userPrompt){
  try {
    if (!userPrompt) {
      return new Error('No user prompt provided');
    }

    console.log("User: " + userPrompt);
    const reply = session.prompt(userPrompt);
    console.log("AI: " + reply);

    return reply;
  } catch (error) {
    console.error(error);
  }
}