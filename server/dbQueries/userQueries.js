import { query } from "../dbConnection/dbConnection.js";

const getUserDataById = async (id) => {
  const results = await query(`SELECT * FROM users WHERE id = $1 `, [id]);
  if (results.rows.length === 0) return null
  return results.rows[0];
};

export { getUserDataById };
