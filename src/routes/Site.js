const express = require('express');
const indexRouter = require("./index");
const authRouter = require("./Auth");
const passport = require("../config/auth/passport");
const {models} = require("../config/sequelize");
const router = express.Router();



router.get('/', (req, res, next) => {
    res.render('login', { layout: false, wrongLogin: req.query.wrongLogin !== undefined} );
});


router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/?wrongLogin'
    })
);

router.get('/logout', (req, res) => {
    req.logout();
    res.render('logout', { layout: false });
});


router.get('/profile', async(req, res) => {
    if(req.user){
        const account = await models.account.findOne({ where: {ID: req.user.accountID}, raw: true });
        res.render('users/updateProfile', {account});
    } else{
        res.redirect('/');
    }

});
router.put('/profile/saveUpdate/:id', async(req, res) => {
    try {
        await models.account.update(
            { OWNER: req.body.owner },
            { where: { ID: req.params.id } }
        );
        req.user.owner = req.body.owner;
        res.render('users/updateProfile', {message: 'Success'});
    } catch(err){
        res.render('users/updateProfile', {message: 'Something went wrong !!! Try again!'});
    }
});





module.exports = router