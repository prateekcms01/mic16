// const pool = require("../config/db");

// const getAllOffers = async () => {
//   try {
//     const query = "SELECT * FROM offers ORDER BY created_at DESC";
//     const results = await pool.query(query);

//     return results.rows; // PostgreSQL stores query results in `rows`
//   } catch (error) {
//     console.error("Error fetching offers:", error);
//     throw new Error(`Error fetching offers: ${error.message}`);
//   }
// };

// module.exports = { getAllOffers };

const pool = require("../config/db");

const getAllOffers = async () => {
  try {
    const query = "SELECT * FROM offers ORDER BY created_at DESC";
    const results = await pool.query(query);

    if (!results.rows.length) {
      console.warn("No offers found in the database.");
      return [];
    }

    console.log(`Fetched ${results.rows.length} offers.`);
    return results.rows;
  } catch (error) {
    console.error("Database error fetching offers:", error);
    throw new Error(`Error fetching offers: ${error.message}`);
  }
};

module.exports = { getAllOffers };
