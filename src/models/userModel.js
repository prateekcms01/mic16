// const pool = require("../config/db");

// const getUserById = async (userId) => {
//   try {
//     const query = "SELECT * FROM users WHERE id = $1";
//     const results = await pool.query(query, [userId]);
//     console.log(results);
//     return results.rows[0]; // PostgreSQL stores results inside `rows`
//   } catch (error) {
//     throw new Error(`Error fetching user: ${error.message}`);
//   }
// };

// module.exports = { getUserById };

const pool = require("../config/db");

const isValidUUID = (id) =>
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
    id
  );

const getUserById = async (userId) => {
  try {
    // Validate UUID format before querying
    if (!isValidUUID(userId)) {
      return null; // Return null if the format is invalid
    }

    const query = "SELECT * FROM users WHERE id = $1";
    const results = await pool.query(query, [userId]);

    return results.rows[0] || null; // Return null if user not found
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

module.exports = { getUserById };
