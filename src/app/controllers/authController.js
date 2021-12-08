

class authController{
    //[GET]: /logout
    logout(req, res , next){
        req.logout();
        res.render('logout', { layout: false }
    )}
    
}
module.exports = new authController