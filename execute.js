const { Pool } = require("pg");
require("dotenv").config();

// Configure the PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
});

// Read the SQL file
const fs = require("fs");
const sqlScript = fs.readFileSync(
  "./drawSQL-pgsql-export-2023-09-22.sql",
  "utf8"
);

// Run the SQL script
pool.query(sqlScript, (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log("SQL script executed successfully");
  }

  // Close the pool (end the database connection)
  pool.end();
});
