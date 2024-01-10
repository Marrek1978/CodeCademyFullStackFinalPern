import { v4 as uuidv4 } from "uuid";
import { query } from "../dbConnection/dbConnection.js";

//* *******************   GET/POST USER DATA BY ID     ***********************
const getUserDataById = async (id) => {
  try {
    const results = await query(`SELECT * FROM users WHERE id = $1 `, [id]);
    if (results.rows.length === 0) return null;
    return results.rows[0];
  } catch (err) {
    throw new Error(err);
  }
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
  try {
    const results = await query(
      `UPDATE users SET email = $1, password = $2, firstname = $3, lastname = $4, address = $5, phone = $6 WHERE id = $7 RETURNING *`,
      [email, password, firstname, lastname, address, phone, id]
    );
    if (results.rows.length === 0) return null;
    return results.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

//* *******************   GET/POST USER CC DATA BY ID     ***********************
const getUserCardDataById = async (id) => {
  try {
    const results = await query(`SELECT * FROM ccdata WHERE userid = $1 `, [
      id,
    ]);
    if (results.rows.length === 0) return null;
    return results.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

const postUserCCDataById = async (id, cardnumber, expirationdate, cvv) => {
  const userId = id;

  let ccData;
  try {
    ccData = await query(`SELECT * FROM ccdata WHERE userid = $1`, [userId]);
  } catch (err) {
    throw new Error(err);
  }

  if (ccData.rows.length === 0) {
    const id = uuidv4();
    try {
      const results = await query(
        `INSERT INTO ccdata (id, userid, cardnumber, expirationdate, cvv)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [id, userId, cardnumber, expirationdate, cvv]
      );

      if (results.rows.length === 0) return null;
      return results.rows[0];
    } catch (err) {
      throw new Error(err);
    }
  } else {
    try {
      const results = await query(
        `UPDATE ccdata SET cardnumber = $1, expirationdate = $2, cvv = $3 WHERE userid = $4 RETURNING *`,
        [cardnumber, expirationdate, cvv, userId]
      );

      if (results.rows.length === 0) return null;
      return results.rows[0];
    } catch (err) {
      throw new Error(err);
    }
  }
};

const postUserSubDataByUserId = async (userID, subFrequency) => {
  let existingSub;
  try {
    existingSub = await query(
      `SELECT * FROM usersubscription WHERE userid = $1`,
      [userID]
    );
  } catch (err) {
    throw new Error(err);
  }

  if (existingSub.rows.length > 0) {
    try {
      const updatedSub = await query(
        `UPDATE usersubscription SET subscription = $1 WHERE userid = $2 RETURNING *`,
        [subFrequency, userID]
      );
      if (updatedSub.rows.length === 0)
        throw new Error("Subsctiption not Saved");
      return updatedSub.rows[0];
    } catch (err) {
      throw new Error(err);
    }
  } else {
    try {
      const id = uuidv4();
      const results = await query(
        `INSERT INTO usersubscription (id, userid, subscription) VALUES ($1, $2, $3) RETURNING *`,
        [id, userID, subFrequency]
      );

      if (results.rows.length === 0) throw new Error("Subsctiption not Saved");
      return results.rows[0];
    } catch (err) {
      throw new Error(err);
    }
  }
};

export {
  getUserDataById,
  postUserDataById,
  postUserCCDataById,
  getUserCardDataById,
  postUserSubDataByUserId,
};
