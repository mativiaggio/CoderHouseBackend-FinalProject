const { Router } = require("express");
const userModel = require("../models/users");
const cartModel = require("../models/carts");
const bcrypt = require("bcrypt");
const { createHash, isValidPassword } = require("../utils");
const passport = require("passport");

const sessionRouter = Router();

// User registration
sessionRouter.post(
  "/register",
  passport.authenticate("register", {
    failurlRedirect: "/api/sessions/registerFail",
  }),
  async (req, res, next) => {
    try {
      // Create a new cart for the registered user
      const newCart = await cartModel.create({
        user: req.user._id,
        products: [],
      });

      // Update user document with the cartId
      await userModel.findByIdAndUpdate(req.user._id, { cartId: newCart._id });

      // Redirect to the success page with user details
      const { email, first_name, last_name } = req.user;
      res.redirect(
        `/api/mail/successfully-registered?destination=${email}&firstname=${first_name}&lastname=${last_name}`
      );
    } catch (error) {
      next(error);
    }
  }
);

// Registration failure route
sessionRouter.get("/registerFail", (req, res) => {
  res.status(401).send({ status: "error", error: "Authentication error" });
});

// User login
sessionRouter.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/loginFail",
  }),
  async (req, res) => {
    // Set user session data
    const { _id, first_name, last_name, email, age, cartId } = req.user;
    req.session.user = {
      _id,
      name: `${first_name} ${last_name}`,
      email,
      age,
      cartId,
    };

    // Redirect to the success page with user details
    // res.redirect(
    //   `/api/mail/successfully-login?destination=${email}&firstname=${first_name}&lastname=${last_name}`
    // );
    res.redirect("/");
  }
);

// Login failure route
sessionRouter.get("/loginFail", (req, res) => {
  res.status(401).send({ status: "error", error: "Login failed" });
});

// Logout route
sessionRouter.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Error destroying session");
    res.redirect("/login");
  });
});

// Github authentication route
sessionRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// Github authentication callback route
sessionRouter.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    // Set user session data
    const { first_name, email, age } = req.user;
    req.session.user = { name: first_name, email, age };

    res.redirect("/");
  }
);

// Route to get current user session
sessionRouter.get("/current", (req, res) => {
  if (req.session.user) {
    res.send({ user: req.session.user });
  } else {
    res.status(401).send({ error: "No user logged in" });
  }
});

module.exports = sessionRouter;
