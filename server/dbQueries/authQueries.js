import { query } from "../dbConnection/dbConnection.js";

const getUserByEmail = async (email) => {
  //!  validation on email string b4 this step
  // returns a promise
  if (!email) throw new Error("Email is required");
  const results = await query(`SELECT * FROM users WHERE email = $1`, [email]);
  if (results.rows.length === 0) return null;
  return results.rows[0];
};

const registerNewUser = async (newUser) => {
  const results = await query(
    `INSERT INTO users (id, email, password) VALUES ($1, $2, $3) RETURNING *`,
    [newUser.id, newUser.email, newUser.password]
  );
  if (results.rows.length == 0) throw new Error("User not Created");
  return results.rows[0];
};

const getUserById = async (id) => {
  try {
    const results = await query(`SELECT * FROM users WHERE id = $1 `, [id]);
    if (results === undefined || results.rows.length === 0) return null;
    return results.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

export { getUserByEmail, registerNewUser, getUserById };
