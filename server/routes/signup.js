const router = require("express").Router();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/user");
const UserToken = require("../models/otp");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { registerValidation } = require("../registrationValidation");
// const { TLSSocket } = require('tls');
const jwt = require("jsonwebtoken");

const send_email = require("../utils/send_email");
const verifyEmailTemplate = require("../templates/verify_email");

require("dotenv").config();

router.get("/register", (req, res) => {
  res.send("Sign up to continue");
});

router.post("/", async (req, res) => {
  // validating User's details

  const { error } = registerValidation(req.body, res);
  //console.log(error);

  if (error)
    return res.status(400).json({
      message: "Bhai yeh Kya kar tuu..." + error.details[0].message,
      error: true,
    });

  // User exists or not

  const emailExsit = await User.findOne({ email: req.body.email });
  if (emailExsit)
    return res.status(400).json({
      message: "Yeh kaisa dognlapanti? email already exists",
      error: true,
    });

  //Hashing The Passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    // Create a new User
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      // emailToken: crypto.randomBytes(64).toString('hex'),
    });
    const savedUser = await user.save();
    // Finally Adding The user in Data Base "hurray"

    const userToken = new UserToken({
      userId: savedUser._id,
      oneTimeKey: crypto.randomBytes(64).toString("hex"),
    });
    const savedToken = await userToken.save();
    const payload = {
      id: user._id,
      tokenId: userToken._id,
      oneTimeKey: userToken.oneTimeKey,
    };
    const onetime_key = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    const link = `http://localhost:3005/verify-email?token=${onetime_key}`;
    const emailHtml = verifyEmailTemplate(user.name, link);
    await send_email(user.email, 'Verify Your Email Account', emailHtml);

    res.json({ message: "Check Your email and Verify", error: false });

  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});
module.exports = router;

