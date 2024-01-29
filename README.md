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