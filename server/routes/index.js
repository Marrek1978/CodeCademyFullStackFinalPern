import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import stripeRoutes from "./stripeRoutes.js";

const routes = (app) => {

  authRoutes(app);
  userRoutes(app);
  stripeRoutes(app);
};

export default routes;
