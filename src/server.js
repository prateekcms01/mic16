const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
dotenv.config();
app.use(cors());
app.use(express.json());
const client = require("./config/db");

const emiRoutes = require("./routes/emiRoutes");
const offerRoutes = require("./routes/offerRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

app.use("/api", emiRoutes);
app.use("/api", offerRoutes);
app.use("/api", transactionRoutes);

const PORT = process.env.PORT || 8050;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
