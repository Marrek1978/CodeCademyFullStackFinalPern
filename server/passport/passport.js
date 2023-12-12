import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

// const GitHubStrategy = require("passport-github2").Strategy;
import bcrypt from "bcrypt";
// const {
// getUserByUsername,
// getUserById,
// getOrCreateGitHubUser,
// getUserIdByGetHubId,
// } = require("../db/customerQueries");

import { getUserByEmail, getUserById } from "../dbQueries/authQueries.js";

// const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
// const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const passportConfig = () => {
  // Passport setup code here
  // ...

  //no credentials - err
  //no user - !user
  //wrong password - !match
  //return user - user
  //connection, db, server, function errors - err

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          if (!email || !password)
            //no credentials
            return done(null, false, { message: "Bad Credentials" });

          //no user
          const user = await getUserByEmail(email);
          if (!user) return done(null, false, { message: "Email not found." });

          //wrong password
          const match = await bcrypt.compare(password, user.password);
          if (!match)
            return done(null, false, { message: "Incorrect password." });

          //return user
          if (user) return done(null, user);
        } catch (error) {
          return done(error, false, { error: `Server Error` + error.message });
        }
      }
    )
  );

  // passport.use(
  //   new GitHubStrategy(
  //     {
  //       clientID: GITHUB_CLIENT_ID,
  //       clientSecret: GITHUB_CLIENT_SECRET,
  //       callbackUrl: "http://localhost:4000/auth/github/callback",
  //     },
  //     (accessToken, refreshToken, profile, done) => {
  //       getOrCreateGitHubUser(profile, (error, result) => {
  //         if (error)
  //           return done(error, false, {
  //             error: "There was an error logging in with Git hub",
  //           });
  //         return done(null, profile);
  //       });
  //     }
  //   )
  // );

  passport.serializeUser((user, done) => {
    if (user && user.id) return done(null, user.id.trim());
    return done(new Error("User ID is undefined"));
  });

  passport.deserializeUser(async (id, done) => {
    const userId = id.trim();
    const user = await getUserById(userId);
    if (!user)
      return done(null, false, { error: "User not found at Deserializer." });
    return done(null, user);
  });

  return passport;
};

export default passportConfig;
