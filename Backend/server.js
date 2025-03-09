const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Load environment variables
const db = require("./db"); // Database connection

// Import Routes
const authRoutes = require("./routes/auth");
const programSelectionRoutes = require("./routes/programSelection");
const departmentRoutes = require("./routes/department");
const fatherGuardianInfoRoutes = require("./routes/fatherGuardianInfo");
const academicRecordRoutes = require("./routes/academicRecord");
const personalInfoRoutes = require("./routes/personalInfo"); // Missing route added

const app = express();
const PORT = process.env.PORT || 3306; // Fix: Use PORT instead of DB_PORT

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", authRoutes);
app.use("/api", programSelectionRoutes);
app.use("/api", departmentRoutes);
app.use("/api", fatherGuardianInfoRoutes);
app.use("/api", academicRecordRoutes);
app.use("/api", personalInfoRoutes); // Ensure the new route is included

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
