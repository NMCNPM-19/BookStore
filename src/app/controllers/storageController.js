const pagination = require('../../public/js/pages/pagination');
const productService = require('../services/storageService');
const {multipleSequelizeToObject,SequelizeToObject} = require('../../util/sequelize');
const e = require('express');


class storageController{
    //[GET]:\storage
    async list(req, res, next){
        console.log('hhh');
        if(req.user){
            res.render('storage')
        } else{
            res.redirect('/');
        }
    }
}

module.exports=new storageController;