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

[Chatbot]
chatbot = toucan-bot ;toucan-bot || toucan-bot-configured || toucan-bot-llm

[LLM]
model = llama-2-7b-chat.Q2_K.gguf ;model to be used (must be present in server/models folder)
llm_max_tokens = 70
gpu_layers = 33 ;33 is default max for NVIDIA gtx 1650
llm_temperature = 0 ;0 is disabled default
llm_top_k = 0 ;0 is disabled default
llm_top_p = 1 ;1 is disabled default