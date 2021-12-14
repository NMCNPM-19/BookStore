
class authController{
    //[GET]: /logout
    logout(req, res ){
        req.logout();
        res.render('logout', { layout: false });
    }
    

    //[GET]: /login 
    login(req, res) {
        res.render('login', {
            layout: false,
            message: req.flash()
        })
    }
}
module.exports = new authController