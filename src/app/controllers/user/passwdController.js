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
            if(req.user){
                const message = await userService.changePasswd(req);
                res.render('user/changePasswd',{user :req.user ,message});
            }else{
                res.redirect('/');
            }
            
        }
        catch(err){
            res.redirect('user/changePasswd',{message: 'Something went wrong !!! Try again!'});
        }
    }
    
}
module.exports = new passwdController;