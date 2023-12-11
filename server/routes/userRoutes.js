import { getUserDataById } from "../dbQueries/userQueries.js";

const userRoutes = (app) => {
  app.get("/user/:userId", async (req, res, next) => {
    // console.log("in user info route");
    // get user info by id
    // if (req.user) {
    //   res.json({ user: req.user });
    // } else {
    //   res.json({ user: null });
    // }

    //ensure authed
    try {
      const userData = await getUserDataById(req.params.userId);
      console.log("🚀 ~ file: userRoutes.js:16 ~ app.get ~ userData:", userData)
      res.send({ user: userData });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

    next();
    // return 'yolos from userRoutes'
  });
};

export default userRoutes;
