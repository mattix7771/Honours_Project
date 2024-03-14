import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// import { handleRequest } from './chatbot.js';
import basketRoutes from './routes/basketRoutes.js';
import productRoutes from './routes/productRoutes.js';
import fs, { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { distanceBetweenEntries } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyParser.json());

const logDir = '../session_logs.csv';
const scoreDir = '../score.txt';
const optimal_answersDir = '../optimal_answers.txt';
const sessionStart = new Date();

// Enable CORS for requests from localhost:3000
const corsOptions = {
  origin: 'http://localhost:5000',
};

app.use(cors(corsOptions));
app.use(express.json());

// Set up session logs
fs.appendFile(logDir, '\n\nTime, Elapsed time, Action Code, Action', err => {if(err) {console.error(err)}} );
fs.appendFile(logDir, '\r\n' + `${sessionStart.toLocaleTimeString()},0s,0,session started`, err => {if(err) {console.error(err)}});
fs.access(logDir, fs.constants.F_OK, err => {
  if (err) {
    fs.writeFile(logDir, 'Time, Elapsed time, Action', err => console.error(err) );
    fs.appendFile(logDir, '\r\n' + `${sessionStart},0,session started`, err => console.error(err));
  }
});

// Set up user scores
fs.appendFile(scoreDir, '\n\nUser Scores', err => {if(err) {console.error(err)}});
fs.access(scoreDir, fs.constants.F_OK, err => {
  if (err) {
    fs.writeFile(scoreDir, 'User Scores', err => console.error(err) );
  }
});

let optimal_answers = [];
let taskNum = 0;
fs.readFileSync(optimal_answersDir, 'utf8').split(';').forEach((line) => {
  optimal_answers.push(line);
});

// Endpoint to log user movements throughout the application
app.post('/log', async (req, res) => {
  const actionTime = new Date();
  const log = req.body.log;
  const actionCode = req.body.code;
  fs.appendFile(logDir, '\r\n' + `${actionTime.toLocaleTimeString()},${(actionTime-sessionStart)/1000}s,${actionCode},${log}`, err => {if(err) {console.error(err)}});
  res.sendStatus(200);
});

// Set up product routes
app.use('/products', productRoutes);

// Set up basket routes
app.use('/basket', basketRoutes);

// Endpoint to handle LLM chat requests
app.post('/chat', async (req, res) => {
  const userPrompt = req.body.prompt;
  const reply = await handleRequest(userPrompt);
  res.send({ reply });
});

// Endpoint to read configuration file
app.get('/config', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.sendFile(path.join(__dirname, '../init_config.ini'));
});

// Endpoint to write to configuration file
app.post('/configWrite', (req, res) => {

  // Get variable to change and new value
  const variable = req.body.variable;
  const value = req.body.value;
  
  const file = fs.readFileSync(path.join(__dirname, '../init_config.ini'), 'utf8');
  const config = file.replace(new RegExp(`${variable} = .+`), `${variable} = ${value}`);
  fs.writeFile(path.join(__dirname, '../init_config.ini'), config, err => {if(err) {console.error(err)}});
  
  res.sendStatus(200);
});

// Endpoint to generate a score based on accuracy of product purchased and time taken
app.post('/generateScore', async (req, res) => {

  // Get distance between purchased product and optimal product in database
  const productPurchased = req.body.purchasedProduct;
  const optimalProduct = optimal_answers[taskNum];
  let distance = await distanceBetweenEntries(productPurchased, optimalProduct);
  
  // Get time taken to purchase product
  let timeTaken = (new Date() - sessionStart)/1000;
  
  // Cap distance and time taken at 100
  if (distance > 100){
    distance = 100;
  }
  if (timeTaken > 100){
    timeTaken = 100;
  }

  console.log(`Distance: ${distance}, Time taken: ${timeTaken}`);

  // If 5 tasks have been completed, calculate final score
  const lines = readFileSync(scoreDir, 'utf8').split('\n');
  if (lines.length >= 5){
    const finalScore = ((distance + timeTaken - 1)/999)*100;
    fs.appendFile(scoreDir, `\nFinal score\n${finalScore}`, err => {if(err) {console.error(err)}});
  }

  // Append score to file
  fs.appendFile(scoreDir, '\r\n' + `${distance + timeTaken}`, err => {if(err) {console.error(err)}});

  taskNum++;
  res.sendStatus(200);
});

// Setup Express on port 5000 or port specified in .env file
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});