# Honours_Project

## React Frontend
The React frontend is setup to run on port 3000 by default.
To start the frontend:
    - cd client
    - npm run start

## Express Backend
The Expressjs backend is setup to run on port 5000. Changing the port but be specified in package.json in /client
To start backend:
    - cd server
    - npm run start

## Botpress Bot
The Botpress bot is setup to run on port 3001. The port can also be specified in data/botpress.config.schema.json
To start bot:
    - ./bp



dotenv library works with .env file to preserve sensitive information
nodemon library to autoreload express server on changes

## Using project_init.bat
Click it and everything will start


## Using init_config

[webStore]
productCategories = phones, tvs, headphones, laptops, watches ;product categories to show (phones, tvs, headphones, laptops, watches (comma separated))
num_products = 4 ;number of each product to show on initial page
slogan_banner = true ;toggle banner

[Chatbot]
chatbot = toucan-bot ;toucan-bot || toucan-bot-configured || toucan-bot-llm
honesty = 0 ;0 - Honest, 1 - Partially honest, 2 - Dishonest

[LLM]
model = llama-2-7b-chat.Q2_K.gguf ;model to be used (must be present in server/models folder)
language_style = 0 ;0 - Professional/formal, 1 - Friendly/informal
llm_max_tokens = 70
gpu_layers = 33 ;33 is default max for NVIDIA gtx 1650
llm_temperature = 0 ;0 is disabled default
llm_top_k = 0 ;0 is disabled default
llm_top_p = 1 ;1 is disabled default

const productCategories = Array.from(config.webStore.productCategories.replace(' ', '').split(','));
const num_products = config.webStore.num_products;
const slogan_banner = config.webStore.slogan_banner;
const chatbot_show = config.webStore.chatbot_show;
const sort_show = config.webStore.sort_show;

const chatbot_name = config.Chatbot.chatbot;
const chatbot_honesty = config.Chatbot.chatbot_honesty;
const chatbot_popup = config.Chatbot.chatbot_popup;

const model_name = config.LLM.model;
const language_style = config.LLM.language_style;
const llm_max_tokens = config.LLM.llm_max_tokens;
const llm_temperature = config.LLM.llm_temperature;
const llm_top_k = config.LLM.llm_top_k;
const llm_top_p = config.LLM.llm_top_p;
const gpu_layers = config.LLM.gpu_layers;