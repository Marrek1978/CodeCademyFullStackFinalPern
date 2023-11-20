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

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          if (!email || !password)
            return done(null, false, { error: "Bad Credentials" });

          const user = await getUserByEmail(email);
          if (!user) return done(null, false, { error: "Email not found." });

          const match = await bcrypt.compare(password, user.password);
          if (!match)
            return done(null, false, { error: "Incorrect password." });

          if (user && user.id) return done(null, user);
          return done(null, false)
          // return done(null, { user, authed: true });
        } catch (error) {
          return done(error);
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

  passport.serializeUser((userId, done) => {
    return done(null,userId);
  });

  passport.deserializeUser((id, done) => {
    getUserById(id, (error, result) => {
      if (error) return done(error);
      return done(null, result);
    });
  });

  return passport;
};

export default passportConfig;
