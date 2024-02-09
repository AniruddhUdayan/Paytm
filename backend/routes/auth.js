const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../passport");

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      token: req.user.accessToken,
    });
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      token: req.user.accessToken,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
); 

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  }),
//   (req, res) => {
//     res.redirect(`${process.env.CLIENT_URL}`);
//   }
);

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.CLIENT_URL);
  });
});

module.exports = router;
