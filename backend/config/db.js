import mysql from "mysql2/promise";

// Use the configuration that works - No SSL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 13088,
  waitForConnections: true,
  connectionLimit: 10,
  ssl: false  // This is what works with my Aiven setup
});

export default pool;
