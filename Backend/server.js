const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db"); // Database connection
const authRoutes = require("./routes/auth"); // Auth routes
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3306; // Use environment variable for port

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", authRoutes); // All auth routes will start with /api

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
