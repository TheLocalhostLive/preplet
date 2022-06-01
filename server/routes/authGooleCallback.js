const router = require('express').Router()
const passport = require('passport')
router.get('/', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });



   
module.exports = router
        