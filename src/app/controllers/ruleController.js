const ruleService = require('../services/ruleService');
const {multipleSequelizeToObject,SequelizeToObject} = require('../../util/sequelize');
const e = require('express');


 //[GET]:rule/edit
 class RuleController{
     async edit(req, res, next){
        if(req.user){
            try {
                var rules = await ruleService.getRule()
                console.log(rules);
                res.render('rules/inforRule',{rules})
            } catch (error) {
                next(error)
            }
        } else{
            res.redirect('/');
        }
    }

    async update(req, res, next){
        console.log("Hàm update rule được gọi")
        try {
            await ruleService.updateSave(req);
            res.redirect('back');
        } catch (error) {
            next(error)
        }
    }


}

module.exports = new RuleController