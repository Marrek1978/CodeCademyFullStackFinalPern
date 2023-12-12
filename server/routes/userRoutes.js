import ensureAuthed from "../middlewares/authMiddleWares.js";
import { getUserDataById } from "../dbQueries/userQueries.js";

const userRoutes = (app) => {
  //ensure authed
  app.get("/user/:userId", ensureAuthed, async (req, res) => {
    try {
      const userData = await getUserDataById(req.params.userId);
      res.send({ user: userData });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
   
  });
};

export default userRoutes;
