require("dotenv").config();

var express = require("express");
const app = express();

var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

//  Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.

app.use(passport.initialize());
app.use(passport.session());


 passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var UserConnected="";

passport.use(new GoogleStrategy({
    clientID: process.env["GOOGLE_CLIENT_ID"],
    clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
    callbackURL: process.env["GOOGLE_CALLBACK_URL"]       //from Google personal key JSON
  },
  function(accessToken, refreshToken, profile, done) {
      if (profile) {
        console.log("Profile",profile);
        user = profile;
        UserConnected = user.displayName;
        return done(null, user);
        }
        else {
        return done(null, false);
        }
  }
));

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get(
  "/",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"]
  })
);

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/err" }),
  function(req, res) {
    res.status('200').send(`User ${UserConnected} connected`);
  }
);

const port = process.env.port || 5000;
app.listen(port, function callback() {
  console.log(`Server running at http://localhost:${port}`);
});
