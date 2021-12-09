//const { render } = require('../../app');
const pagination = require('../../public/js/pages/pagination');
const productService = require('../services/productService');
const {multipleSequelizeToObject,SequelizeToObject} = require('../../util/sequelize')
class productController{
    //store
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

    // delete
    async hiden(req, res, next){
        await productService.hiden(req);
        res.redirect('back');
    };
    async active(req, res, next){
        await productService.active(req);
        res.redirect('back');
    };

    //update
    async saveUpdate(req, res, next){
        await productService.saveUpdate(req);
        res.redirect('/editProduct');
    };

    async update(req, res, next){
        if(!req.user){
            const product = await productService.update(req);
            res.render('products/formUpdatePro', { product : SequelizeToObject(product) });
        } else{
            res.redirect('/');
        }
    }

    //list
    async list(req, res, next){
        if(!req.user){
            const itemPerPage = 10;
            const page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
            const products = await productService.list(page,itemPerPage);
            const Theloai = await productService.getTL();
            const TotalPage = Math.ceil(products.count/itemPerPage) > page + 1 ? Math.ceil(products.count/itemPerPage) : page + 1
            const pagItems = pagination.paginationFunc(page+1, TotalPage);
            const NXB = await productService.getNXB()
            if(!products){
                res.status(401).json("Something went wrong!");
            }
            
            res.render('products/editProduct', {
                Items: pagItems,
                Theloai :  multipleSequelizeToObject(Theloai),
                products: products.rows,
                NXB : multipleSequelizeToObject(NXB)
            });
        } else{
            res.redirect('/');
        }

    }
    
    
}

module.exports = new productController


