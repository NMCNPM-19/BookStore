const {models} = require("../../config/sequelize");

class profileController{
    //[GET] : /profile/
    async show (req, res,next){
        if(req.user){
            const account = await models.account.findOne({ where: {ID: req.user.accountID}, raw: true });
            res.render('users/updateProfile', {account});
        } else {
            res.redirect('/');
        }
        next()
    }
    //[POST]: /profile//saveUpdate/:id
    async save(req, res ,next){
        try {
            await models.account.update(
                { OWNER: req.body.owner },
                { where: { ID: req.params.id } });
            req.user.owner = req.body.owner;
            res.render('users/updateProfile', {message: 'Success'});
        } catch(err){
            res.render('users/updateProfile', {message: 'Something went wrong !!! Try again!'});}
    }
    
}
module.exports = new profileController;