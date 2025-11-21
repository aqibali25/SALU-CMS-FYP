// routes/admissionSchedule.js
const express = require("express");
const router = express.Router();
const {
  getAdmissionSchedule,
  updateAdmissionScheduleStatus,
} = require("../controllers/admissionScheduleController");

// URL: GET /api/admission-schedule
router.get("/admission-schedule", getAdmissionSchedule);

// URL: PUT /api/admission-schedule/update-status
router.put("/admission-schedule/update-status", updateAdmissionScheduleStatus);

module.exports = router;
