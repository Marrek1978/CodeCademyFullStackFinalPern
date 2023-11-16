//import route files
import testRoutes from './test.js';
import auth from './auth.js';
//auth routes
//cusotmer profile
//cart
//checkout
//order
//subscription


//export app with routes
const routes = (app) => {

  // app.get("/api", (req, res) => {
  //   res.json({ message: "Hello from server!" });
  // });
  testRoutes(app)
  auth(app)

}


export default routes;