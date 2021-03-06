const rulesService = require('../services/rulesService');
const {multipleSequelizeToObject,SequelizeToObject} = require('../../util/sequelize');
const e = require('express');


 //[GET]:rule/edit
 class RuleController{
     async edit(req, res, next){
        if(req.user){
            if(req.user.LOAINV == 'adm') {
                try {
                    var rules = await rulesService.getRules()
                    res.render('rules/inforRule',{rules})
                } catch (error) {
                    next(error)
                }
            }
        } else{
            res.redirect('/');
        }
    }

    async update(req, res, next){
        if(req.user){
            if(req.user.LOAINV == 'adm') {
                try {
                    await rulesService.updateSave(req);
                    res.redirect('back');
                } catch (error) {
                    next(error)
                }
            }
        } else{
            res.redirect('/');
        }
    }


}

module.exports = new RuleController