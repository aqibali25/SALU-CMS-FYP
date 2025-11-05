const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");
const app = express();
const PORT = process.env.PORT || 3306;

// Middleware
app.use(cors());

// Increase payload size limit (e.g., 50MB)
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Routes
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/programSelection"));
app.use("/api", require("./routes/department"));
app.use("/api", require("./routes/fatherGuardianInfo"));
app.use("/api", require("./routes/academicRecord"));
app.use("/api", require("./routes/personalInfo"));
app.use("/api", require("./routes/documents"));

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});