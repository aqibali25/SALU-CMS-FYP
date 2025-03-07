const express = require("express");
const router = express.Router();
const programSelectionController = require("../controllers/programSelectionController");

// Save program choices
router.post(
  "/program-selection",
  programSelectionController.saveProgramChoices
);

module.exports = router;
