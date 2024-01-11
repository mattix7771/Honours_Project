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

export async function getPhones(){
    const [res] = await pool.query('SELECT * FROM phones');
    return res;
}