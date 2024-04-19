# Honours_Project

## React.js Client
This project uses React.js as the frontend framework.
By default, React will run on port 3000.\
To start the client:
- navigate to client directory (cd client)
- run client (npm run start)

## Express.js Server
This project uses Express.js as the backend framewok.
By default, Express will run on port 5000 or the port specified in a .env file. Any changes to the port number must be specified in both server.mjs and the client's package.json.\
To start the server:
- navigate to server directory (cd server)
- run server (npm run start)

## Botpress
As the bot framework, this project uses the Botpress v12 (https://github.com/botpress/v12). By default, Botpress will run on port 3001 or the next avaliable port. A specific port can also be specified in botpress-bot/data/botpress.config.schema.json.\
To start bot:
- navigate to botpress directory (cd botpress-bot)
- run Botpress script (./bp)

## MySQL
This project is confiured to load mock products from a MySQL database. A .env file inside the /server directory should specify the host, user, password, and the name of the database. The database structure should look as follows.\
<database_name>\
├── <table_name>\
│ &emsp;&emsp;└── name\
│ &emsp;&emsp;└── price\
│ &emsp;&emsp;└── rating\
│ &emsp;&emsp;└── image (link)\
├── <table_name>\
│ &emsp;&emsp;└── name\
│ &emsp;&emsp;└── price\
│ &emsp;&emsp;└── rating\
│ &emsp;&emsp;└── image (link)

## Quick Start
To quickly run all the modules of the application, project_init.bat can be executed.

## Using init_config
The init_config.ini file specifies the beginning state of the application. These states can either be changed through this file or by accessig the /settings route at runtime. Please note that some changes require a page reload or an application restart to take effect.

### WebStore Settings
**productCategories** specifies the tables of products to show on the home page. These should be valid product category names and must be delimited by a comma. (eg. productCategories = phones, tvs, headphones, laptops, watches)\
**num_products** specifies the number of each product to show on the home page. (eg. num_products = 4)\
**slogan_banner** specifies whether the banner in the home page should be visible. (eg. slogan_banner = true)\
**chatbot_show** specifies whether the chatbot should be visible. (eg. chatbot_show = false)\
**sort_show** specifies whether the option to sort items should be visible. (eg. sort_show = true)

### Chatbot Settings
**chatbot** specifies which chatbot should be used. There are currently 3 options: *toucan-bot* which features normal chatbot capabilites and the ability to conversate with a LLM, *toucan-bot-configured* which only offers basic chatbot capabilities, and *toucan-bot-llm* which only offers the ability to talk to a LLM. (eg. chatbot = toucan-bot)\
**honesty** specifies how accurate the suggestions of the chatbot should be, where any valur below 0 gives honest reccomendations, 1 gives partially honest reccomendations, and 2 gives dishonest reccomendations. Note that honesty automatically increases at every request. (eg. honesty = 1)\
**chatbot_popup** specifies whether the popup besides the chatbot should be visible. (eg. chatbot_popup = false)

### LLM Settings
**model** specifies the name of the mdoel to be used for language processing. The file should be a valid LLama based model present in the server/models folder. (eg. model = llama-2-7b-chat.Q2_K.gguf)\
**language_style** specifies the lanaguage style that the LLM should adopt, where 0 represents a professional/formal tone, and 1 represents a friendly/informal tone. (eg. language_style = 1)\
**llm_max_tokens** specifies the maximum number of tokens the LLM should output in its responses. (eg. lm_max_tokens = 70)\
**gpu_layers** represents the number of GPU layers that should be dedicated to run the LLM. (eg. gpu_layers = 33)\
**llm_temperature** specifies the temperature of the LLM, where a higher number gives more unpredictable answers. A value of 0 disables this setting. (eg. llm_temperature = 0.8)\
**llm_top_k** specifies the topK value of the model. A value of 0 disables this setting (eg. llm_top_k = 0.6)\
**llm_top_p** specifies the topP value of the model. A value of 1 disables this setting (eg. llm_top_p = 0.5)\
