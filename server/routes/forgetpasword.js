const router = require('express').Router();
const nodemailer = require('nodemailer');
const User = require('../models/user');

const dotenv = require('dotenv');
dotenv.config();

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

const emailFormatValidation = (data)=>{
    const schema =Joi.object({
        email : Joi.string().min(6).required().email()
    });

    return schema.validate(data)
};

router.get('/',(req,res)=>{
    res.render('forget-passowrd');

})

router.post('/',async(req,res)=>{
   
    // validating the User's Email
    const {error} = emailFormatValidation(req.body);
    if(error) return res.status(400).send('Kya Engineer Banega re tuu'+error.details[0].message);

    // Checking whether user id exists or not
    const validUser = await User.findOne({ email : req.body.email});
    // console.log(validUser);
    if(!validUser) return res.status(400).send('Excuse Me , That is a Wrong Email');
    

    if(validUser. isVerified ){

        let mailingDetails = {
            from: '"Team Xlet"<tonmaysardar500@gmail.com>',
            to: validUser.email,
            subject: "Verify your email",
            html: `<h1> Here's the Passwor Reset Link! </h1>
                    <a href = "http://localhost:3000/reset-password?token=${user.emailToken}">Reset Password</a>
                    `
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
        
    } else {
        res.status(403).send('First Verify Your Account');
    }


})
module.exports = router;