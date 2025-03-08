const express = require("express");
const router = express.Router();
const academicRecordController = require("../controllers/academicRecordController");

// Save academic record
router.post("/saveAcademicRecord", academicRecordController.saveAcademicRecord);

// Fetch academic record for a user
router.get(
  "/getAcademicRecord/:cnic",
  academicRecordController.getAcademicRecord
);

module.exports = router;
