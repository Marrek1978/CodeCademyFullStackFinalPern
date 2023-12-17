import bcrypt from "bcrypt";
import passport from "passport";
import { v4 as uuidv4 } from "uuid";
// import { getUserByEmail, registerNewUser } from '../db/queries/authQueries.js';
import { getUserByEmail, registerNewUser } from "../dbQueries/authQueries.js";
import { ensureNotAuthed } from "../middlewares/authMiddleWares.js";

const authRoutes = (app) => {
  //* *******************   LOCAL LOGIN     ***********************
  app.post("/login", ensureNotAuthed, async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return res.status(500).json({ type: "error", error: err });
      if (info) {
        if (info.message)
          return res
            .status(401)
            .json({ type: "credentials", error: info.message });
        if (info.error)
          return res
            .status(401)
            .json({ type: "credentials", error: info.error });
      }

      if (!user) return res.status(401).json({ error: info.message });

      req.login(user, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.send({ user, authed: true });
      });
    })(req, res, next);
  });

  //* *******************   LOCAL REGISTER     ***********************/
  app.post("/register", async (req, res) => {
    let user;

    try {
      user = await getUserByEmail(req.body.email);
    } catch (error) {
      if (error.message !== "User not found")
        return res.status(500).json({ error: error.message });
    }

    if (user)
      return res
        .status(409)
        .json({ type: "credentials", error: "Email already in use" });

    const newId = uuidv4();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      id: newId.trim(),
      email: req.body.email,
      password: hashedPassword,
    };

    try {
      const registeredUser = await registerNewUser(newUser);
      return res.status(201).json({ user: registeredUser, authed: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  //* *******************   Local Logout     ***********************
  app.get("/logout", (req, res) => {
    req.logout((err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.send({ authed: false });
    });
  });
};

export default authRoutes;
