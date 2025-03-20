import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = await mysql.createConnection({
  host: 'localhost', 
  user: 'root',       
  password: '', 
  database: 'node_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("✅ Connected to MySQL via XAMPP!");

export default db;
