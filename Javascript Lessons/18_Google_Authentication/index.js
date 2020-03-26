require("dotenv").config();

var express = require("express");
const app = express();

var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;


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


app.get(
  "/",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"]
  })
);

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
