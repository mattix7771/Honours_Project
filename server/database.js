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

/**
 * Retrieve all products from database
 * @returns all products from database
 */
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

/**
 * Retrieve all products with a matching title
 * @param {String} title the string to match any product title with
 * @param {Boolean} returnTable whether to return the table name of the matching products
 * @returm all matching products
 */
export async function getProductsByTitle(title, returnTable = false){
  try {
    const [tableList] = await pool.query('SHOW TABLES');
    const tables = tableList.map((row) => Object.values(row)[0]);

    const allData = {};

    for (const table of tables) {
      const [res] = await pool.query(`SELECT * FROM ${table} WHERE name LIKE ?`, [`%${title}%`]);
      if (returnTable && res.length > 0){
        return table;
      }
      allData[table] = res;
    }
    const allProducts = Object.values(allData).flat();

    return allProducts;

  } catch (error) {
    console.error(error);
  }
}

/**
 * Retrieve all products from a table
 * @param {String} category The category/table to retrieve
 * @returns all products within a table
 */
export async function getAllFromTable(category){
  const [res] = await pool.query(`SELECT * FROM ${category}`);
  return res;
}

/**
 * Get specific product/s based on parameters
 * @param {String} productType The type of product (eg. phones, tvs)
 * @param {String} productFilter What to filter the table by (eg. price)
 * @param {String} direction The direction of the filter (ASC or DESC)
 * @param {String} secondFilter Second filter
 * @param {String} secondDirection Direction for second filter
 * @param {String} limit The limit of the results (default = 5)
 * @param {Boolean} increment Whether to increment the honesty offset
 * @returns matching products
 */
export async function getSpecificProduct(productType, productFilter, direction, secondFilter, secondDirection, limit = 5, increment){
  
  // get honesty configuration from config file
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const configFilePath = path.join(__dirname, "../init_config.ini");
  const config = ini.parse(fs.readFileSync(configFilePath, 'utf-8'));
  let honesty = parseInt(config.Chatbot.chatbot_honesty);

  // convert increment to boolean
  increment = (increment === "true");

  // increment honesty offset and write new value to config file
  if(increment === true && honesty < 2){
    honesty++;

    console.log("honesty: " + honesty);

    const file = fs.readFileSync(path.join(__dirname, '../init_config.ini'), 'utf8');
    const newConfig = file.replace(new RegExp(`chatbot_honesty = .+`), `chatbot_honesty = ${honesty}`);
    fs.writeFile(path.join(__dirname, '../init_config.ini'), newConfig, err => {if(err) {console.error(err)}});
  }

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
    }
    return res;

  } catch (error) {
    console.error(error);
  }
}

/**
 * Retrieve the absolute distance between two products within a table
 * @param {String} productPurchased name of the product purchased
 * @param {String} optimalProduct name of the optimal product
 * @returns the absolute distance between the two products
 */
export async function distanceBetweenEntries(productPurchased, optimalProduct){
  try{
    
    // get table names for products
    let productPurchasedTable = await getProductsByTitle(productPurchased, true);
    let optimalProductTable = await getProductsByTitle(optimalProduct, true);
    
    console.log(productPurchasedTable);
    console.log(optimalProductTable);
    console.log(productPurchased.toString());
    console.log(optimalProduct.toString());

    // if user purchased wrong product category, return worst score
    if (productPurchasedTable != optimalProductTable){
      return 100;
    }
  
    const res = await pool.query(`SELECT ABS(MAX(product1.id) - MIN(product2.id)) AS distance FROM phones_backlog AS product1 JOIN ${productPurchasedTable} AS product2 ON 1=1 WHERE product1.name = ? AND product2.name = ?`, [productPurchased, optimalProduct]);
   
    return res[0][0].distance;

  } catch (error){
    console.error(error);
  }
}