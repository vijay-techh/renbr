import express from "express";
import passport from "passport";
import generateJWT from "../utils/generateJWT.js";

const router = express.Router();

// Start Google login
router.get("/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// Callback after Google login
router.get("/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login-failed.html" }),
  (req, res) => {

    const user = req.user;

    const token = generateJWT({
      id: user.id,
      email: user.email
    });

    res.redirect(`http://localhost:5000/google-callback.html?token=${token}`);
  }
);

export default router;
