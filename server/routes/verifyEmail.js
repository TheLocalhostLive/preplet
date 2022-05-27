const router = require('express').Router();
const User = require('../models/user');


router.get('/',async(req,res)=>{
    try {
        
        const user = await User.findOne({emailToken: req.query.token})
        if(user){
            // user.emailToken = null 
            user.isVerified = true 
            await user.save()
            res.redirect('/email-verfied');

        }


    } catch (error) {
        res.redirect('/register')
        document.write('Email is not verfied')
    }
})

module.exports = router ;