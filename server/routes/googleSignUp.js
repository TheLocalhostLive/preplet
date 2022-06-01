const passport = require('passport');
const router = require('express').Router()
const User = require('../models/user')
const UserToken = require('../models/otp')
const jwt = require('jsonwebtoken')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
require('dotenv').config();
const callback = require('./authGooleCallback');
const { emitWarning } = require('process');

passport.serializeUser(function(user,done){
  done(null , user)
})

passport.deserializeUser(function(user,done){
  done(null , user)
})


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3005/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    console.log("Acessing Google Account")
    // console.log(profile)
    let user = await User.findOne({googleId: profile.id})
        if (user) {
          const payload = {
            id:user._id,
            isAdmin:user.isAdmin
          }
          const token = jwt.sign(payload , process.env.ACCESS_TOKEN_SECRET)
        }
        else{
         user = new User({
           googleId : profile.id,
           name:profile.name,
           email:profile.email,
           isVerified:true
         })
        }
       return done(null, user);
  }
));




router.get('/',(req,res)=>{
res.send('<a href="/google">Signup With google')
})




        

module.exports = router


