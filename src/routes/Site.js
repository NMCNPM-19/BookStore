const express = require('express');
const passport = require("../config/auth/passport");
const router = express.Router();
const sitecontroller = require('./../app/controllers/siteController')
const authcontroller = require('./../app/controllers/authController')



router.get('/', sitecontroller.index);
router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/?wrongLogin'})
);
router.get('/logout', authcontroller.logout);








module.exports = router