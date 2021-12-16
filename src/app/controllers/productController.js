//const { render } = require('../../app');
const pagination = require('../../public/js/pages/pagination');
const productService = require('../services/productService');
const {multipleSequelizeToObject,SequelizeToObject} = require('../../util/sequelize');
const e = require('express');

class productController{
    //[POST] : product/store
    async store(req, res, next){
        try {
            req.body.masach = await productService.genKeybook();
            const [book, created] = await productService.store(req);
            if(created){
                return res.redirect('back');
            }
            else {
                res.status(401).json("Sản phẩm đã tồn tại!");
            }
        }
        catch(err){
          next(err)
        }

    };
    //[PUT]: products/saveUpdate/:id
    async saveUpdate(req, res, next){
        try {
            await productService.saveUpdate(req);
            res.redirect('back');
        } catch (error) {
            next(error);
        }
        
    };
    //[GET]: products/update/:id
    async update(req, res, next){
        if(req.user){
            const product = await productService.update(req);
            const NXB = await productService.getNXB()
            res.render('products/formUpdatePro', { product : SequelizeToObject(product), NXB: multipleSequelizeToObject(NXB) });
        } else{
            res.redirect('/');
        }
    }
    //[DELETE]: products/:id/del
    async delete(req, res, next){
        try {
            if(!req.user){
                await productService.saveDelete(req)
                res.redirect('back')
            }else{
                res.redirect('/');
            }
        } catch (error) {
            next(error)
        }
    }
    //[GET]: /products/
    async list(req, res, next){
        if(req.user){
            if(req.user.LOAINV != 'emp') {
                const itemPerPage = 10;
                const page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
                const title = req.query.title
                const products = await productService.list(title,page,itemPerPage);
                const Theloai = await productService.getTL();
                const TotalPage = Math.ceil(products.count/itemPerPage) > page + 1 ? Math.ceil(products.count/itemPerPage) : page + 1
                const pagItems = pagination.paginationFunc(page+1, TotalPage);
                const NXB = await productService.getNXB()
                
                console.log(title)

                res.render('products/editProduct', {
                    Items: pagItems,
                    Theloai :  multipleSequelizeToObject(Theloai),
                    products: products.rows,
                    title: title,
                    NXB : multipleSequelizeToObject(NXB)
                });
            }
        } else{
            res.redirect('/');
        }

    }
    
    
}

module.exports = new productController


