const router = require("express").Router();
const passport = require("passport");
const session = require("express-session");
const jwt = require("jsonwebtoken");

router.use(session({ secret: process.env.SECRET }));
router.use(passport.initialize());
router.use(passport.session());

router.get(
  "/",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    console.log(req.user.googleId);
    const payload = {
      googleId: req.user.googleId,
    };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    res.redirect(`${process.env.FRONT_END_URL}/Dashboard/?token=` + token);
    // res
    //   .cookie("auth-token", token)
    //   .json({ message: "Reh Bhai Bhai ! Logged in", isAdmin: req.user.admin });
    console.log("call back");
  }
);

module.exports = router;
