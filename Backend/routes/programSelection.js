const express = require("express");
const router = express.Router();
const programSelectionController = require("../controllers/programSelectionController");

// Save program choices
router.post(
  "/saveProgramSelection",
  programSelectionController.saveProgramChoices
);

// Fetch program choices for a user
router.get(
  "/getProgramSelection/:cnic",
  programSelectionController.getProgramSelection
);

module.exports = router;
