const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");

// Fetch all departments
router.get("/departments", departmentController.getDepartments);

module.exports = router;
