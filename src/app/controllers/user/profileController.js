const userService = require('../../services/userService');

class profileController{
    //[GET] : /user/profile/
    async show (req, res,next){
        if(req.user){
            try {
                const admin = await userService.viewProfile(req);
                res.render('user/viewProfile', {admin});
            } catch(err) {
                next(err);
            }
        } else {
            res.redirect('/');
        }
    }
    //[POST]: user/profile/saveUpdate/:id
    // async save(req, res ,next){
    //     try {
    //         await userService.updateProfile(req);
    //         req.user.owner = req.body.owner;
    //         res.render('user/updateProfile', {message: 'Success'});
    //     } catch(err){
    //         res.render('user/updateProfile', {message: 'Something went wrong !!! Try again!'});}
    // }
    
}
module.exports = new profileController;