const router = require('express').Router();
const bcrypt = require('bcryptjs');
// const crypto = require('crypto');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
// const cookie = require('cookie-parser');
const {loginValidation} = require('../loginValidation');

const dotenv = require('dotenv');
dotenv.config();

const createToken = (id)=>{
    return jwt.sign(id , process.env.ACCESS_TOKEN_SECRET);
}

router.get('/',(req,res)=>{
    res.send("LOGIN");
})

router.post('/',async(req,res)=>{
   
    // validating the User's Data
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send('Bhai yeh Kya kar tuu...'+error.details[0].message);

    // Checking whether user id exists or not
    const validUser = await User.findOne({ email : req.body.email});
    // console.log(validUser);
    if(!validUser) return res.status(400).send('Yeh Shab Doglapan hain! .... Wrong Username or Password!');
    

    if(validUser. isVerified ){
    // Checking whether password is correct or not 
    const validPassword = await bcrypt.compare(req.body.password, validUser.password);
    if(!validPassword) return res.status(400).send('Nalla hain kya ?... Wrong Password')

    //Creating a Token
    // const token = jwt.sign({_id: validUser._id} , process.env.ACCESS_TOKEN_SECRET);

    const token = createToken({_id: validUser._id});
    // Storing token in cookie
    res.cookie('auth-token',token).send('Reh Bhai Bhai ! Logged in');
    // res.header('auth-token', token).send(token) -- Store in header if needed

    // res.send('Reh Bhai Bhai ! Logged in');

    } else {
        res.status(403).send('First Verify Your Account');
    }


})

module.exports = router ;