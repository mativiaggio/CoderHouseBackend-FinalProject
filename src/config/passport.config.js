const passport = require("passport");
const local = require("passport-local");
const { createHash, isValidPasword } = require("../utils");
const userModel = require("../models/users");
const GithubStrategy = require("passport-github2");
require("dotenv").config();
const env_config = require("../config/config");

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;

        let user = await userModel.findOne({ email: username });

        try {
          if (user) {
            // done(null, false);
            return done(null, false, {
              message: "El correo electrónico ya está en uso",
            });
          }

          const hashedPassword = createHash(password);

          const result = await userModel.create({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
          });

          done(null, result);
          // res.send({ status: "success", mesage: "user registered" });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          const user = await userModel.findOne({ email });
          if (!user) {
            return done(null, false);
          }
          if (!isValidPasword(user, password)) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: `${env_config.clientID}`,
        callbackURL: `${env_config.callbackURL}`,
        clientSecret: `${env_config.clientSecret}`,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const user = await userModel.findOne({
            email: profile._json.email,
          });

          if (!user) {
            let newUser = {
              first_name: profile._json.name,
              last_name: "",
              age: 0,
              email: profile._json.email,
            };
            let result = await userModel.create(newUser);
            return done(null, result);
          } else {
            return done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  let user = await userModel.findById(id);
  done(null, user);
});

module.exports = initializePassport;
