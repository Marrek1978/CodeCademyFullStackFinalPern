//import route files
import testRoutes from './test.js';
import authRoutes from './authRoutes.js';
//auth routes
//cusotmer profile
//cart
//checkout
//order
//subscription


//export app with routes
const routes = (app) => {

  console.log('index')
 
  testRoutes(app)
  authRoutes(app)

}


export default routes;