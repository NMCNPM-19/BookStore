const userService = require('../../services/userService');

class passwdController{
    //[GET]: /user/changePasswd
    async show (req, res, next){
        if(req.user){
            res.render('user/changePasswd');
        } else {
            res.redirect('/');
        }
    }
    //[PUT]: /user/changePasswd/:id
    async change(req, res ,next){
        try {
            const message = await userService.changePasswd(req);
            res.render('user/changePasswd',{message});
        }
        catch(err){
            res.redirect('user/changePasswd',{message: 'Something went wrong !!! Try again!'});
        }
    }
    
}
module.exports = new passwdController;