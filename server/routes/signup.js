const router = require("express").Router();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/user");
// const checkSpecialChar = require("../utils/customValidation");
// const checkNumeric = require("../utils/customValidation");
// const checkAsterisk = require("../utils/customValidation");
const UserToken = require("../models/otp");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { registerValidation } = require("../registrationValidation");
// const { TLSSocket } = require('tls');
const jwt = require("jsonwebtoken");

require("dotenv").config();
// var transporter = nodemailer.createTransport(
//   'smtps://team%40@engineersway.in:dasrshan09@smtp.');

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

    // Sending Activation Link to user's Gmail

    //------------------//-- Below Codes Are for Google Outh2 Mail --//--------------------//
    const auth = new google.auth.GoogleAuth({
      keyFile: '../preplet-434413-4810fefeb1cc.json',
      scopes: ['https://www.googleapis.com/auth/gmail.send'], // Add other scopes as needed
    });
    async function sendMail() {
      try {
        
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth,
          tls: {
            rejectUnauthorized: false,
          },
        });

        let mailingDetails = {
          from: '"Team PrepLet"<tonmaysardar500@gmail.com>',
          to: savedUser.email,
          subject: "Verify your email",
          html: `<h1> Raha nhi jata ... Tadap hi Aisi hain! </h1>
                        <h2> Verify Your Email First </h2> 
                     <a href = "http://localhost:3005/verify-email?token=${onetime_key}"> Click to verify</a>
                        `,
        };

        let Sending = await transporter.sendMail(mailingDetails);
        return Sending;
      } catch (error) {
        console.log("Khatam Tata Bye bye");
        console.log(error);
      }
    }
    sendMail()
      .then((Sending) => console.log("Email Has been sent..", Sending))
      .catch((error) => console.log(error));

    res.json({ message: "Check Your email and Verify", error: false });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});
module.exports = router;

// let mailingDetails = {
//   from: '"Team Xlet"<team@engineersway.in>',
//   to: user.email,
//   subject: "Verify your email",
//   html: `<h1> Raha nhi jata ... Tadap hi Aisi hain! </h1>
//                 <h2> Verify Your Email First </h2>
//              <a href = "http://localhost:3005/verify-email?token=${onetime_key}"> Click to verify</a>
//                 `
// };
// console.log("Keep Going");
// // Sending Mail
// transporter.sendMail(mailingDetails, function (error, info) {
//   if (error) {
//     console.log("In the If");
//     console.log(error);
//   } else {
//     console.log("Mail has been sent to email account");
//   }
// });
// console.log("still Going");
