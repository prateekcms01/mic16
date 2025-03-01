const express = require("express");
const transactionController = require("../controller/transactionController");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth.middleware");
router.post(
  "/record-transaction",
  //   authenticateToken,
  transactionController.recordTransaction
);

module.exports = router;
