const express = require("express");
const emiController = require("../controller/emiController");
const { authenticateToken } = require("../middleware/auth.middleware");
const router = express.Router();
router.post(
  "/send-emi-reminder",
  authenticateToken,
  emiController.sendEMIReminder
);

module.exports = router;
