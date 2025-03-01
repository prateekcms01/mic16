const twilio = require("twilio");
require("dotenv").config();

let client;
try {
  client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
} catch (error) {
  console.error("Error initializing Twilio client:", error);
  process.exit(1);
}

module.exports = client;
