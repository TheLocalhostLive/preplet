const router = require('express').Router();

router.get('/',(req,res)=>{
    res.cookie(null).json({message: 'LogOut Done' , error:false })
})

module.exports = router