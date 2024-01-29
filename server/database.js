import mysql from 'mysql2';
import dotenv from 'dotenv';

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
      const [res] = await pool.query(`SELECT * FROM ${table} WHERE title LIKE ?`, [`%${title}%`]);
      allData[table] = res;
    }
    const allProducts = Object.values(allData).flat();

    return allProducts;

  } catch (error) {
    console.error(error);
  }
}

// Get all products by category
export async function getAllCategory(category){
  category = category.split(',');
  let products = [];
  for (let cat of category) {
    console.log(cat)
    const [res] = await pool.query(`SELECT * FROM ${cat}`);
    products.push(res);
  }
  return products;
}

// Get cheapest phone
export async function getSpecificProduct(productType, productFilter, direction){
  try {
    const [res] = await pool.query(`SELECT * FROM ${productType}_backlog ORDER BY ${productFilter} ${direction} LIMIT 1`);
    return res[0];

  } catch (error) {
    console.error(error);
  }
}