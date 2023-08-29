import mysql from "mysql";

// Connect to the database
export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "keynote",
});
