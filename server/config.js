// import("dotenv").then(({ config }) => config());
import process from "process";
import "dotenv/config";

const config = {
  SERVER_PORT: process.env.SERVER_PORT,
  SESSION_SECRET: process.env.SESSION_SECRET,
  HOST_SERVER: process.env.HOST_SERVER,
  DB: {
    PGHOST: process.env.PGHOST,
    PGUSER: process.env.PGUSER,
    PGDATABASE: process.env.PGDATABASE,
    PGPASSWORD: process.env.PGPASSWORD,
    PGPORT: process.env.PGPORT,
  },
};

export default config;
