

class SiteController{
    index(req, res, next){
        //res.render('login', { layout: false, wrongLogin: req.query.wrongLogin !== undefined} );
        if (!req.user) {
            res.redirect('/login');
        }
        else {
            res.render('index', {user: req.user});
        }
        next();
    }
}
module.exports = new SiteController;