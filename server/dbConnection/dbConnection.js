import pkg from "pg";
const { Pool } = pkg;
import config from "../config.js";

const DB = config.DB;

const pool = new Pool({
  user: DB.PGUSER,
  host: DB.PGHOST,
  database: DB.PGDATABASE,
  password: DB.PGPASSWORD,
  port: DB.PGPORT,
});

const query = (text, params) => {
  return new Promise((resolve, reject) => {
    pool.query(text, params, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};



export { query };
