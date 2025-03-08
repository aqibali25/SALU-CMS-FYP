const express = require("express");
const router = express.Router();
const personalInfoController = require("../controllers/personalInfoController");

// Save personal information
router.post("/savePersonalInfo", personalInfoController.savePersonalInfo);

// Fetch personal information for a user
router.get("/getPersonalInfo/:cnic", personalInfoController.getPersonalInfo);

module.exports = router;
