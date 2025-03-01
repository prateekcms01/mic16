const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");
const twilioClient = require("../config/twilio");

exports.recordTransaction = async (req, res) => {
  const { transactions } = req.body;

  if (!Array.isArray(transactions) || transactions.length === 0) {
    return res.status(400).json({ error: "Invalid transactions format" });
  }

  let results = [];

  for (const transaction of transactions) {
    let { userId, amount, status } = transaction;

    try {
      // Convert amount to number and validate it
      amount = parseFloat(amount);
      if (isNaN(amount) || amount <= 0) {
        results.push({
          userId,
          status: "Failed",
          message: "Invalid transaction amount",
        });
        continue;
      }

      console.log(
        `Processing transaction: UserID=${userId}, Amount=₹${amount}, Status=${status}`
      );

      await Transaction.recordTransaction(userId, amount, status);
      const user = await User.getUserById(userId);

      if (!user) {
        results.push({ userId, status: "Failed", message: "User not found" });
        continue;
      }

      const message = `Transaction Alert: ₹${amount} ${status}. Thank you for using our service!`;
      console.log(`Sending SMS: ${message} to ${user.phone}`);

      await twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: user.phone,
      });

      results.push({
        userId,
        status: "Success",
        message: "Transaction recorded & SMS sent",
      });
    } catch (error) {
      console.error("Transaction error:", error);
      results.push({ userId, status: "Failed", message: error.message });
    }
  }

  res.json({ success: true, results });
};
