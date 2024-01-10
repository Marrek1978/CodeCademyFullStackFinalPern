import express from "express";
import config from "./config.js";
import allRoutes from "./routes/index.js";
import middleware from "./middlewares/middleware.js";
import passportConfig from "./passport/passport.js";

const { SERVER_PORT } = config; // const port = 3001; // Make sure this port is different from Vite's
const routes = allRoutes;

const app = express();
app.use(express.static("public"));

// const YOUR_DOMAIN = "http://localhost:3001";

// Load middlewares
middleware(app);

// const passportConfig = require("./auth/passport");
// Load passport configuration
passportConfig();

// Load routes
routes(app);

// Error handling middleware (optional)
// app.use((err, req, res) => {
//   console.log("in error handler");
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// / Catch 404 and forward to error handler
app.use((req, res) => {
  console.log("in 404");
  res.json(404).send("Sorry, that route does not exist!");
  res.status(404).send("Sorry, that route does not exist!");
});

// Start the server
app.listen(SERVER_PORT, () => {
  console.log(`Server listening at http://localhost:${SERVER_PORT}`);
});

 