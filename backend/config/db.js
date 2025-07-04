import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

// Path to the certificate (Windows-compatible)
const caCertPath = path.join(process.cwd(), "certs", "ca.pem");

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT || 13088,
  waitForConnections: true,
  connectionLimit: 10,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync(caCertPath), // Load the CA certificate
  },
});

export default pool;
