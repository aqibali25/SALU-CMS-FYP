const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "127.0.0.1", // Database host
  user: "root", // Your MySQL username
  password: "", // Your MySQL password
  database: "cms", // Your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
    return;
  }
  console.log("Connected to the MySQL database");
});

// API Route to fetch data from tbl_department
app.get("/api/departments", (req, res) => {
  const sqlQuery = "SELECT * FROM tbl_department";
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err.message);
      return res.status(500).json({ error: "Database query error" });
    }

    // Transform data into the format for programOptions
    const programOptions = results.map((dept) => ({
      value: dept.name, // Replace 'name' with your actual column name
      label: dept.name, // Replace 'name' with your actual column name
    }));

    res.json(programOptions);
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
