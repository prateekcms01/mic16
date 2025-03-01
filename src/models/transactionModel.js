const pool = require("../config/db");

const recordTransaction = async (userId, amount, status) => {
  try {
    const query =
      "INSERT INTO transactions (user_id, amount, status, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *";
    const result = await pool.query(query, [userId, amount, status]);
    return result.rows[0]; // Returning the inserted transaction
  } catch (error) {
    console.error("Transaction error:", error);
    throw new Error(`Error recording transaction: ${error.message}`);
  }
};

module.exports = { recordTransaction };
