import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
//import { handleRequest } from './chatbot.js';
import basketRoutes from './routes/basketRoutes.js';
import productRoutes from './routes/productRoutes.js';
import fs from 'fs';

const app = express();
app.use(bodyParser.json());

const logDir = '../session_logs.csv';
const sessionStart = new Date();

// Enable CORS for requests from localhost:3000
const corsOptions = {
  origin: 'http://localhost:5000',
};

app.use(cors(corsOptions));
app.use(express.json());

// Set up session logs
fs.writeFile(logDir, 'Time, Elapsed time, Action', err => {if(err) {console.error(err)}} );
fs.appendFile(logDir, '\r\n' + `${sessionStart},0,session started`, err => {if(err) {console.error(err)}});
// fs.access(logDir, fs.constants.F_OK, err => {
//   if (err) {
//     fs.writeFile(logDir, 'Time, Elapsed time, Action', err => console.error(err) );
//     fs.appendFile(logDir, '\r\n' + `${sessionStart},0,session started`, err => console.error(err));
//   }
// });

app.post('/log', async (req, res) => {
  const actionTIme = new Date();
  const log = req.body.log;
  fs.appendFile(logDir, '\r\n' + `${actionTIme},${(actionTIme-sessionStart)/1000}s,${log}`, err => {if(err) {console.error(err)}});
  res.sendStatus(200);
});

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
