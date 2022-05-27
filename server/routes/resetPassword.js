const router = require('express').Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/user');
const { use } = require('./forgetpasword');

router.get('/',(req , res)=>{
    try {
        const user = await User.findOne({emailToken: req.query.token})
        if(user){
            //Hashing the Updated Password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            //Now the Store the new password
            user.password = hashedPassword;
            await user.save();
            res.redirect()

        }



    } catch (error) {
        
    }
})