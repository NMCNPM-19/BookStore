

class SiteController{
    index(req, res, next){
        console.log('here')
        //res.render('login', { layout: false, wrongLogin: req.query.wrongLogin !== undefined} );
        res.render('index')
        next();
    }
}
module.exports = new SiteController;