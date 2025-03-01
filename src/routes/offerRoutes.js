const express = require("express");
const offerController = require("../controller/offerController");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth.middleware");
router.post(
  "/send-offer",
  authenticateToken,
  offerController.sendOfferNotification
);

module.exports = router;
