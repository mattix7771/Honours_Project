import path from 'path';
import fs from 'fs';
import ini from 'ini';
import { fileURLToPath } from 'url';
import { getSpecificProduct } from './database.js';
import { LlamaModel, LlamaContext, LlamaChatSession } from 'node-llama-cpp';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// get LLM configuration from config file
const configFilePath = path.join(__dirname, "../init_config.ini");
const config = ini.parse(fs.readFileSync(configFilePath, 'utf-8'));
const chatbotConfig = config.LLM;

// set up LLM configuration
const model_name = chatbotConfig.model;
const language_style = parseInt(chatbotConfig.language_style);
const llm_max_tokens = parseInt(chatbotConfig.llm_max_tokens);
const gpu_layers = parseInt(chatbotConfig.gpu_layers);
const llm_temperature = parseFloat(chatbotConfig.llm_temperature);
const llm_top_k = parseInt(chatbotConfig.llm_top_k);
const llm_top_p = parseInt(chatbotConfig.llm_top_p);

// Initialize the Llama Model
const modelPath = path.join(__dirname, "models", model_name);
const model = new LlamaModel({
  modelPath,
  gpuLayers: gpu_layers,
  streaming: true
});

const context = new LlamaContext({ model });
const session = new LlamaChatSession({ context });

// Get knowledge to add to model
const knowledge = fs.readFileSync('starting_context.txt', 'utf-8');
const lines = knowledge.split(/\r?\n/);
const modelPrompt = lines[language_style];

/**
 * Process user message
 * @param {String} userPrompt The user message
 * @returns 
 */
export async function handleRequest(userPrompt){
  try {

    // Ensure userPrompt isn't empty
    if (!userPrompt) {
      console.log("No user prompt provided")
      return new Error('No user prompt provided');
    }

    // Set up query parameters
    const productCategories = ["phones", "tvs", "headphones", "laptops", "watches"];
    let userPromptCategory, userPromptFilter, direction, limit = 1;
    let suggestedProduct, suggestedProductString;
  
    // Check contents of user message and update query parameters accordingly
    for (const category of productCategories) {
      if (userPrompt.includes(category) || userPrompt.includes(category.slice(0, -1))) {
        userPromptCategory = category;
        break;
      }
    }

    if(userPrompt.includes("cheap") || userPrompt.includes("economic") || userPrompt.includes("cost") || userPrompt.includes("price") || userPrompt.includes("reasonable") || userPrompt.includes("economical")){
      userPromptFilter = "price";
      direction = "ASC";
    } else if (userPrompt.includes("expensive") || userPrompt.includes("luxury") || userPrompt.includes("premium") || userPrompt.includes("high-end") || userPrompt.includes("costly") || userPrompt.includes("pricey")){
      userPromptFilter = "price";
      direction = "DESC";
    } else if (userPrompt.includes("best") || userPrompt.includes("top") || userPrompt.includes("highest") || userPrompt.includes("greatest") || userPrompt.includes("most")){
      userPromptFilter = "rating";
      direction = "DESC";
    } else if (userPrompt.includes("worst") || userPrompt.includes("bottom") || userPrompt.includes("lowest") || userPrompt.includes("least")){
      userPromptFilter = "rating";
      direction = "ASC";
    } else if (userPrompt.includes("other") || userPrompt.includes("different") || userPrompt.includes("another") || userPrompt.includes("alternative") || userPrompt.includes("similar") || userPrompt.includes("option")){
      userPromptFilter = "price";
      direction = "ASC";
      limit = 2;
    }

    // Get products that the LLM should reccomend based on query results
    if(userPromptCategory && userPromptFilter && direction){
      suggestedProduct = await getSpecificProduct(userPromptCategory, userPromptFilter, direction, limit);
      suggestedProductString = suggestedProduct[0].name.split(' ').slice(0,5).join(' ') + " £" + suggestedProduct[0].price + " " + suggestedProduct[0].rating.split(' ').slice(0,1) + " stars";
      const reply = session.prompt(modelPrompt + " User Prompt: " + userPrompt + "\". Suggest the following product to the user: " + suggestedProductString, {
        maxTokens: llm_max_tokens,
        temperature: llm_temperature,
        topK: llm_top_k,
        topP: llm_top_p
      });
      return reply;
    } else if(userPromptCategory){
      suggestedProduct = await getSpecificProduct(userPromptCategory, "price", "ASC", limit);
      suggestedProductString = suggestedProduct[0].name.split(' ').slice(0,5).join(' ') + " £" + suggestedProduct[0].price + " " + suggestedProduct[0].rating.split(' ').slice(0,1) + " stars";
      const reply = session.prompt(modelPrompt + " User Prompt: " + userPrompt + "\". Suggest the following product to the user: " + suggestedProductString, {
        maxTokens: llm_max_tokens,
        temperature: llm_temperature,
        topK: llm_top_k,
        topP: llm_top_p
      });
      return reply;
    } else {
      const reply = session.prompt(modelPrompt + " User Prompt: " + userPrompt + "\"", {
        maxTokens: llm_max_tokens,
        temperature: llm_temperature,
        topK: llm_top_k,
        topP: llm_top_p
      });
      return reply;
    }

  } catch (error) {
    console.error(error);
  }
}