const pagination = require('../../public/js/pages/pagination');
const productService = require('../services/productService');
const {multipleSequelizeToObject,SequelizeToObject} = require('../../util/sequelize');
const e = require('express');


class SiteController{
    async index(req, res, next){
        if (!req.user) {
            res.redirect('/login');
        }
        else {
            if(!req.user.emp) {
                const itemPerPage = 10;
                const page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
                const title = req.query.title
                const products = await productService.list(title,page,itemPerPage);
                const TotalPage = Math.ceil(products.count/itemPerPage) > page + 1 ? Math.ceil(products.count/itemPerPage) : page + 1
                const pagItems = pagination.paginationFunc( +1, TotalPage);

                
                console.log(title)


                res.render('index', {
                    Items: pagItems,
                    products: products.rows,
                    title: title,
                });
            } else {
            res.redirect('/');
            }
        }
    }
}


module.exports = new SiteController;