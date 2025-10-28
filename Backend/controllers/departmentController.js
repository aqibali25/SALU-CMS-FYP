// departmentController.js - Updated for connection pool
const { pool } = require("../db");

const getDepartments = (req, res) => {
  const query = "SELECT * FROM departments";
  
  // Use the connection pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting connection from pool: ", err);
      return res.status(500).json({ 
        message: "Database connection error!", 
        error: err.message 
      });
    }
    
    // Use the connection to execute query
    connection.query(query, (err, results) => {
      // Always release the connection back to the pool
      connection.release();
      
      if (err) {
        console.error("Error fetching departments: ", err);
        return res.status(500).json({ 
          message: "Database error!", 
          error: err.message 
        });
      }
      
      res.status(200).json(results);
    });
  });
};

module.exports = { getDepartments };