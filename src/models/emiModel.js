// const pool = require("../config/db");

// const getEMIByUserId = async (userId) => {
//   try {
//     const query = "SELECT * FROM emi WHERE user_id = $1";
//     const results = await pool.query(query, [userId]);
//     console.log("EMI", results);
//     return results.rows; // PostgreSQL returns results in `.rows`
//   } catch (error) {
//     throw new Error(`Error fetching EMI: ${error.message}`);
//   }
// };

// module.exports = { getEMIByUserId };

const pool = require("../config/db");

// Function to validate UUID format
const isValidUUID = (id) =>
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
    id
  );

const getEMIByUserId = async (userId) => {
  try {
    // Validate userId format before querying
    if (!isValidUUID(userId)) {
      console.warn(`Invalid UUID format: ${userId}`);
      return []; // Return empty array if invalid UUID
    }

    const query = "SELECT * FROM emi WHERE user_id = $1";
    const results = await pool.query(query, [userId]);

    console.log(`EMI records for user ${userId}:`, results.rows);
    return results.rows || []; // Ensure it always returns an array
  } catch (error) {
    console.error("Database error fetching EMI:", error);
    throw new Error(`Error fetching EMI: ${error.message}`);
  }
};

module.exports = { getEMIByUserId };
