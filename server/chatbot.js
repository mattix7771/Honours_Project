import path from 'path';
import { fileURLToPath } from 'url';
import { LlamaModel, LlamaContext, LlamaChatSession } from 'node-llama-cpp';

// Initialize the Llama Model
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const modelPath = path.join(__dirname, "models", "llama-2-7b-chat.Q5_K_M.gguf");
const model = new LlamaModel({ modelPath });
const context = new LlamaContext({ model });
const session = new LlamaChatSession({ context });

const defaultPrompt = "You're acting as a virtual customer support representative for a company called Toucan Webstore which sells phones, tvs, headphones, laptops, and watches. You do not have a name and your role is to provide customers with product recommendations and help them with anything else they might need. As a customer support representative, you should prioritize customer satisfaction by responding promptly and courteously to all inquiries. Your responses should be clear, concise, short, and informative, aiming to address the customer's concerns effectively. Demonstrate empathy and understanding towards customers who may be experiencing difficulties or frustrations. Offer reassurance and support while working towards resolving their issues in a timely manner. Maintain professionalism and uphold the company's values and policies in all interactions with customers. If additional information is required to assist the customer, kindly request it in a polite and respectful manner. If the customer’s question is out of scope or if you’re unable to answer it, let the user know that only relevant questions about the store can be answered. Question:  ";

export function handleRequest(res, userPrompt){
  
  try {
    if (!userPrompt) {
      console.log("No user prompt provided")
      return new Error('No user prompt provided');
    }
    console.log("User: " + userPrompt);
    const reply = session.prompt(defaultPrompt + userPrompt);
    console.log("AI: " + reply);

    return reply;
  } catch (error) {
    console.error(error);
  }
}