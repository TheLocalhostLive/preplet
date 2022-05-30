const router = require('express').Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/user');
const UserToken = require('../models/otp')
const nodemailer = require('nodemailer');
const { registerValidation } = require('../registrationValidation');
// const { TLSSocket } = require('tls');
const jwt = require('jsonwebtoken');


require('dotenv').config();


let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'tonmaysardar500@gmail.com',
        pass: process.env.AUTH_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})

router.get('/register', (req, res) => {
    res.send('Sign up to continue');
})


router.post('/', async (req, res) => {
    // validating the User's data
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send('Bhai yeh Kya kar tuu...' + error.details[0].message);

    //check if the user is already in database or not
    const emailExsit = await User.findOne({ email: req.body.email });
    if (emailExsit) return res.status(400).json({ message: 'Yeh kaisa dognlapanti? email already exists', error: true })

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
            userId : savedUser._id,
            oneTimeKey : crypto.randomBytes(64).toString('hex')
        })
        const savedToken = await userToken.save();
        console.log(userToken)
        // res.json(savedUser);
        //  res.redirect('/login');
        const payload = {
            id: user._id ,
            tokenId : userToken._id,
            oneTimeKey : userToken.oneTimeKey
        }
        const onetime_key = jwt.sign(payload , process.env.ACCESS_TOKEN_SECRET ,{expiresIn: '15m'})

        // Sending Activation Link to user's Gmail
        let mailingDetails = {
            from: '"Team Xlet"<tonmaysardar500@gmail.com>',
            to: user.email,
            subject: "Verify your email",
            html: `<h1> Raha nhi jata ... Tadap hi Aisi hain! </h1>
                    <h2> Verify Your Email First </h2> 
                 <a href = "http://localhost:3000/verify-email?token=${onetime_key}"> Click to verify</a>
                    `
             // <a href = "http://localhost:3000/verify-email?token=${user.emailToken}"> Click to verify</a>
        }


        // Sending Mail 
        transporter.sendMail(mailingDetails, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Mail has been sent to email account")
            }
        })


    } catch (error) {
        res.status(404).send(error);
    }

})
module.exports = router;