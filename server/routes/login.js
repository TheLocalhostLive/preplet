const router = require("express").Router();
const bcrypt = require("bcryptjs");
const checkAsterisk = require("../utils/customValidation");
// const crypto = require('crypto');
const User = require("../models/user");
const UserToken = require("../models/otp")
const jwt = require("jsonwebtoken");
// const cookie = require('cookie-parser');
const { loginValidation } = require("../loginValidation");

const dotenv = require("dotenv");
dotenv.config();

// const createToken = (id)=>{
//     return jwt.sign(id , process.env.ACCESS_TOKEN_SECRET);
// }

router.get("/", (req, res) => {
  res.send("Please LOGIN");
});

router.post("/", async (req, res) => {
  // validating the User's Data
  const { error } = loginValidation(req.body);
  if (error)
    return res.status(400).json({
      message: "Bhai yeh Kya kar tuu..." + error.details[0].message,
      error: true,
    });

  const isAsterisk = checkAsterisk(req.body.password);
  if (isAsterisk)
    return res
      .status(400)
      .json({ message: "Asterisk is not allowed in Password", error: true });

  // Checking whether user id exists or not
  const validUser = await User.findOne({ email: req.body.email });
  if (validUser === null)
    return res.status(400).json({
      message: "Yeh Shab Doglapan hain! .... Wrong Username or Password!",
      error: true,
    });

  if (validUser.isVerified) {
    // Checking whether password is correct or not
    const validPassword = await bcrypt.compare(
      req.body.password,
      validUser.password
    );
    if (!validPassword)
      return res
        .status(400)
        .json({ message: "Nalla hain kya ?... Wrong Password", error: true });

    const userToken = await UserToken.findOne({userId:validUser._id})

    //creating payload
    const payload = {
      id: validUser._id,
      isAdmin: validUser.admin,
    };
    //Creating a AccesssToken
    const Accesstoken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    //creating RefreshToken
    const RefreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "30d",
    });
    userToken.refreshToken = RefreshToken 
    await userToken.save()
    console.log(userToken.refreshToken )
    res
      .cookie("access-token", Accesstoken)
      .cookie("refresh-token", RefreshToken)
      .json({ message: "log in success" });
    // res.cookie('auth-token',token).json({message:'Reh Bhai Bhai ! Logged in',isAdmin:validUser.admin});
  } else {
    res.status(403).send("First Verify Your Account");
  }
});

router.get('/get-new-access-token',async (req,res)=>{
    const regresh_token = req.cookies['refresh-token']
    // console.log(regresh_token)
    // if(!regresh_token) return res.send(401).json({message:'Refresh Token Expired',error:true})

    try {
        // console.log('going')
    
        const checkedRfresh = jwt.verify(regresh_token ,process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findOne({_id:checkedRfresh.id})
        const userToken = await UserToken.findOne({userId:user._id})
        console.log(userToken.refreshToken)
        if(userToken.refreshToken===regresh_token){
          // console.log('In the if')
            const payload = {
                id: user._id,
                isAdmin: user.admin,
              };
              const Accesstoken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "15m",
              });

              res.cookie("access-token", Accesstoken).json({ message: "Tokens Sent" , error:false});
              // console.log('Done')
        }
        else {
          res.end('invalid request')
        }


    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"Token Expired" , error:true})
    }
    
})

module.exports = router;
