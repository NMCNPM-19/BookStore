const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const {models} = require('../config/sequelize');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async function(username, password, done) {
        try {
            const user = await models.account.findOne({ where: {EMAIL: username, ROLE: 'Admin'}, raw: true });
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            const match = await validPassword(user, password);
            if (!match) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        } catch(err) {
            return done(err);
        }
    }
));

passport.serializeUser(function(user, done) {
    done(null, {accountID: user.ID, owner: user.OWNER});
});
  
passport.deserializeUser(function(user, done) {
    return done(null, user);
});

function validPassword(user, password){
    return bcrypt.compare(password, user.PASSWORD);
}

module.exports = passport;