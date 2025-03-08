const express = require("express");
const router = express.Router();
const fatherGuardianInfoController = require("../controllers/fatherGuardianInfoController");

// Save father and guardian information
router.post(
  "/saveFatherGuardianInfo",
  fatherGuardianInfoController.saveFatherGuardianInfo
);

// Fetch father and guardian information for a user
router.get(
  "/getFatherGuardianInfo/:cnic",
  fatherGuardianInfoController.getFatherGuardianInfo
);

module.exports = router;
