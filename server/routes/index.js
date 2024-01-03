//import route files
// import testRoutes from "./test.js";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import stripeRoutes from "./stripeRoutes.js";

//auth routes
//cusotmer profile
//cart
//checkout
//order
//subscription

//export app with routes
const routes = (app) => {

  authRoutes(app);
  userRoutes(app);
  stripeRoutes(app);
};

export default routes;
