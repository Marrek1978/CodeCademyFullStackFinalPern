import express from "express";
import config from "./config.js";
import allRoutes from "./routes/index.js";
import  middleware from "./middlewares/middleware.js";
import passportConfig from './passport/passport.js';
// import 'dotenv/config';

const app = express();
// const port = 3001; // Make sure this port is different from Vite's
const { SERVER_PORT } = config;

// const passportConfig = require("./auth/passport");
const routes = allRoutes

// Load middlewares
middleware(app);

// Load passport configuration
passportConfig();

// Load routes
routes(app);



// Start the server
 app.listen(SERVER_PORT, () => {
  console.log(`Server listening at http://localhost:${SERVER_PORT}`);
});
