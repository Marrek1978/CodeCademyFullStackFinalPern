import cors from "cors";
import passport from "passport";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";

export default function middleware(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

  app.use(
    session({
      //make env variable
      secret: "secretcode",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production", // or your specific environment logic
        // other cookie options if needed
      },
    })
  );

  app.use(cookieParser("secretcode"));

  // Passport middlewares
  app.use(passport.initialize());
  app.use(passport.session());
}
