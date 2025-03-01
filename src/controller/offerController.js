const Offer = require("../models/offerModel");
const User = require("../models/userModel");
const twilioClient = require("../config/twilio");

exports.sendOfferNotification = async (req, res) => {
  const { userIds } = req.body;

  if (!Array.isArray(userIds) || userIds.length === 0) {
    return res.status(400).json({ error: "Invalid userIds format" });
  }

  try {
    const offers = await Offer.getAllOffers();

    if (!offers || offers.length === 0) {
      return res.status(404).json({ error: "No offers available" });
    }

    const latestOffer = offers[0].description;
    let results = [];

    for (const userId of userIds) {
      try {
        const user = await User.getUserById(userId);

        if (!user) {
          results.push({ userId, status: "Failed", message: "User not found" });
          continue;
        }

        const message = `🎉 Exclusive Offer: ${latestOffer}. Limited time only!`;

        await twilioClient.messages.create({
          body: message,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: user.phone,
        });

        results.push({
          userId,
          status: "Success",
          message: "Offer notification sent",
        });
      } catch (error) {
        console.error("Error sending offer:", error);
        results.push({ userId, status: "Failed", message: error.message });
      }
    }

    res.json({ success: true, results });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
};
