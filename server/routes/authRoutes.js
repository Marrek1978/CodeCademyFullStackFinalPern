import bcrypt from "bcrypt";
import passport from "passport";
import { v4 as uuidv4 } from "uuid";
// import { getUserByEmail, registerNewUser } from '../db/queries/authQueries.js';
import { getUserByEmail, registerNewUser } from "../dbQueries/authQueries.js";

const authRoutes = (app) => {
  //* *******************   LOCAL LOGIN     ***********************
  // console.log(" in authRoutes ");
  app.post("/login", async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      //no credentials
      //no user
      //wrong password
      //return user
      //connection, db, server, function errors - err

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

      req.login(user.id, (err) => {
        if (err)
          return res.status(500).json({ error: "Could not log this user in." });
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

    if (user) return res.status(409).json({ error: "User already exists" });

    const newId = uuidv4();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      id: newId.trim(),
      email: req.body.email,
      password: hashedPassword,
    };

    // if (!user) return res.status(200).json({ message: "Proceed to register" });
    try {
      const registeredUser = await registerNewUser(newUser);
      return res.status(201).json({ user: registeredUser, authed: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

    // });
  });

  //* *******************   Local Logout     ***********************
  app.get("/logout", (req, res) => {
    console.log("in logout route");
    req.logout((err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.send({ authed: false });
    });
  });
};

export default authRoutes;
