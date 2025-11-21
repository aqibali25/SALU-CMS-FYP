// db.js - Fixed version with proper connection pooling
const mysql = require("mysql2");
require("dotenv").config();

// Create a connection pool (not single connection)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000, // 60 seconds
  timeout: 60000, // 60 seconds
  reconnect: true,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// Get a promise-based version of the pool
const poolPromise = pool.promise();

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed: ", err);
    return;
  }
  console.log("Connected to the MySQL database.");
  connection.release(); // Release the connection back to the pool
});

// Handle pool events
pool.on("acquire", (connection) => {
  console.log("Connection %d acquired", connection.threadId);
});

pool.on("release", (connection) => {
  console.log("Connection %d released", connection.threadId);
});

pool.on("error", (err) => {
  console.error("Pool error:", err);
});

// Export both the pool and promise pool
module.exports = { pool, poolPromise };
