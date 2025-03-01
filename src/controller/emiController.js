const User = require("../models/userModel");
const EMI = require("../models/emiModel");
const twilioClient = require("../config/twilio");

exports.sendEMIReminder = async (req, res) => {
  const { userIds } = req.body;

  if (!Array.isArray(userIds) || userIds.length === 0) {
    return res.status(400).json({ error: "Invalid userIds format" });
  }

  let results = [];

  for (const userId of userIds) {
    try {
      const user = await User.getUserById(userId);
      if (!user) {
        results.push({ userId, status: "Failed", message: "User not found" });
        continue;
      }
      const emi = await EMI.getEMIByUserId(userId);
      console.log("controller", emi);

      if (!emi) {
        results.push({ userId, status: "Failed", message: "No EMI found" });
        continue;
      }

      if (!user.phone || !user.phone.match(/^\+?[1-9]\d{1,14}$/)) {
        results.push({
          userId,
          status: "Failed",
          message: "Invalid phone number",
        });
        continue;
      }

      const message = `Reminder: Your EMI of ₹${emi[0].amount} is due on ${emi[0].due_date}. Please pay on time to avoid penalties.`;
      console.log(message);
      await twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: user.phone,
      });

      results.push({ userId, status: "Success", message: "EMI Reminder sent" });
    } catch (error) {
      console.error("Error in sendEMIReminder:", error);
      results.push({ userId, status: "Failed", message: error.message });
    }
  }

  res.json({ success: true, results });
};
