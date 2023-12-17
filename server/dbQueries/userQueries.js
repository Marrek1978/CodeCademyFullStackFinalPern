import { v4 as uuidv4 } from "uuid";
import { query } from "../dbConnection/dbConnection.js";

//* *******************   GET/POST USER DATA BY ID     ***********************
const getUserDataById = async (id) => {
  const results = await query(`SELECT * FROM users WHERE id = $1 `, [id]);
  if (results.rows.length === 0) return null;
  return results.rows[0];
};

const postUserDataById = async (
  id,
  email,
  password,
  firstname,
  lastname,
  address,
  phone
) => {
  const results = await query(
    `UPDATE users SET email = $1, password = $2, firstname = $3, lastname = $4, address = $5, phone = $6 WHERE id = $7 RETURNING *`,
    [email, password, firstname, lastname, address, phone, id]
  );
  if (results.rows.length === 0) return null;
  return results.rows[0];
};


//* *******************   GET/POST USER CC DATA BY ID     ***********************
const getUserCardDataById = async (id) => {
  const results = await query(`SELECT * FROM ccdata WHERE userid = $1 `, [id]);
  if (results.rows.length === 0) return null;
  return results.rows[0];
};

const postUserCCDataById = async (id, cardnumber, expirationdate, cvv) => {
  const userId = id;
  const ccData = await query(`SELECT * FROM ccdata WHERE userid = $1`, [
    userId,
  ]);

  if (ccData.rows.length === 0) {
    console.log("no ccData");
    const id = uuidv4();
    const results = await query(
      `INSERT INTO ccdata (id, userid, cardnumber, expirationdate, cvv)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
      [id, userId, cardnumber, expirationdate, cvv]
    );

    if (results.rows.length === 0) return null;
    return results.rows[0];
  } else {
    const results = await query(
      `UPDATE ccdata SET cardnumber = $1, expirationdate = $2, cvv = $3 WHERE userid = $4 RETURNING *`,
      [cardnumber, expirationdate, cvv, userId]
    );

    if (results.rows.length === 0) return null;
    return results.rows[0];
  }
};

export {
  getUserDataById,
  postUserDataById,
  postUserCCDataById,
  getUserCardDataById,
};
