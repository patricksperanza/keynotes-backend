import mysql from "mysql2";
import "dotenv/config.js";

// Connect to the database
export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
