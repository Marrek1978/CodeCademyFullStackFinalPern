//import route files
import testRoutes from "./test.js";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
//auth routes
//cusotmer profile
//cart
//checkout
//order
//subscription

//export app with routes
const routes = (app) => {
  testRoutes(app);
  authRoutes(app);
  userRoutes(app);
};

export default routes;
