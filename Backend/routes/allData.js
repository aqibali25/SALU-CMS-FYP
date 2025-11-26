const express = require("express");
const router = express.Router();
const { getAllData } = require("../controllers/allDataController");

// CNIC based data
router.get("/all-data/:cnic", getAllData);

// All data (no filter)
router.get("/all-data", getAllData);

module.exports = router;
