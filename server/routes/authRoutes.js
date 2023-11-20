import bcrypt from "bcrypt";
import passport from "passport";
import { v4 as uuidv4 } from "uuid";
// import { getUserByEmail, registerNewUser } from '../db/queries/authQueries.js';
import { getUserByEmail, registerNewUser } from "../dbQueries/authQueries.js";

const authRoutes = (app) => {
  // Routes
  //* *******************   LOCAL LOGIN     ***********************
  // console.log(" in authRoutes ");
  app.post("/login", async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      // console.log(" in passport.authenticate ");
      if (err) return res.status(500).json({ error: err.message });
      if (!user) return res.status(401).json({ error: info.message });

      req.login(user.id, (err) => {
        if (err) {
          return res.status(500).json({ error: "Could not log this user in." });
        }
        res.send({user, authed:true});
      });
    })(req, res, next);
    // console.log(' in login route')
    // let user;
    // try {
    //   user = await getUserByEmail(req.body.email);
    // } catch (error) {
    //   if (error.message !== "User not found")
    //     return res.status(500).json({ error: error.message });
    // }
    // if (!user) return res.status(404).json({ error: "User not found" });

    // //user ?

    // const passwordMatch = await bcrypt.compare(
    //   req.body.password,
    //   user.password
    // );
    // if (passwordMatch) {
    //   console.log("🚀 ~ file: authRoutes.js:26 ~ app.post ~ passwordMatch:", passwordMatch)
    //   // const token = createToken(user.id); // Implement createToken according to your authentication strategy
    //   // res.json({ message: "Login successful", token: token });
    //   return res.status(200).json({ user, authed: true });
    // }
    // console.log('passwordMatch', passwordMatch)
    // return res.status(401).json({ error: "Invalid password" });

    //replace above with passport.authenticate()
    // req.logIn(req.user, function(err) {})
  });

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
    console.log(
      "🚀 ~ file: authRoutes.js:69 ~ app.post ~ newId:",
      newId,
      "-e4nd"
    );
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
};

export default authRoutes;
