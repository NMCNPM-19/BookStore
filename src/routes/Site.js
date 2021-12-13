const passport = require("../config/auth/passport");
const express = require('express');
const router = express.Router();
const sitecontroller = require('./../app/controllers/siteController')
const authcontroller = require('./../app/controllers/authController')



router.get('/', sitecontroller.index);
router.get('/login', authcontroller.login)
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash : true
}));
router.get('/logout', authcontroller.logout);






module.exports = router