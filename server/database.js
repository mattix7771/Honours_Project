import mysql from 'mysql2';
import dotenv from 'dotenv';
import path from 'path';
import ini from 'ini';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

// Connect to MySQL database
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise();

// Get all products from database
export async function getAllProducts() {
  try {
    const [tableList] = await pool.query('SHOW TABLES');
    const tables = tableList.map((row) => Object.values(row)[0]);

    const allData = {};

    for (const table of tables) {
      const [res] = await pool.query(`SELECT * FROM ${table}`);
      allData[table] = res;
    }
    const allProducts = Object.values(allData).flat();

    return allProducts;

  } catch (error) {
    console.error(error);
  }
}

// Get products by title
export async function getProductsByTitle(title){
  try {
    const [tableList] = await pool.query('SHOW TABLES');
    const tables = tableList.map((row) => Object.values(row)[0]);

    const allData = {};

    for (const table of tables) {
      const [res] = await pool.query(`SELECT * FROM ${table} WHERE name LIKE ?`, [`%${title}%`]);
      allData[table] = res;
    }
    const allProducts = Object.values(allData).flat();

    return allProducts;

  } catch (error) {
    console.error(error);
  }
}

// Get all products by category
export async function getAll(category){
  category = category.split(',');
  let products = [];
  for (let cat of category) {
    const [res] = await pool.query(`SELECT * FROM ${cat}`);
    products.push(res);
  }
  return products;
}

// Get all products by category
export async function getAllFromTable(category){
  const [res] = await pool.query(`SELECT * FROM ${category}`);
  return res;
}

// Get cheapest phone
export async function getSpecificProduct(productType, productFilter, direction, secondFilter, secondDirection, limit = 5){
  
  // get honesty configuration from config file
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const configFilePath = path.join(__dirname, "../init_config.ini");
  const config = ini.parse(fs.readFileSync(configFilePath, 'utf-8'));
  const honesty = config.Chatbot.chatbot_honesty;

  // Add offset value based on chatbot honesty
  let resultsOffset;
  
  if (honesty == 1){
    resultsOffset = 10;
  } else if (honesty == 2){
    resultsOffset = 50;
  } else {
    resultsOffset = 0;
  }

  try {

    let res;

    if (secondFilter && secondDirection){
      [res] = await pool.query(`SELECT * FROM ${productType}_backlog ORDER BY ${productFilter} ${direction}, ${secondFilter} ${secondDirection} LIMIT ${limit} OFFSET ${resultsOffset}`);
    } else {
      [res] = await pool.query(`SELECT * FROM ${productType}_backlog ORDER BY ${productFilter} ${direction} LIMIT ${limit} OFFSET ${resultsOffset}`);
      console.log(res);
    }
    console.log(resultsOffset);
    return res;

  } catch (error) {
    console.error(error);
  }
}