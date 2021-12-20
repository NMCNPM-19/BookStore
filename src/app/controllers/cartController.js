var Cart = require('../models/cart');
const cartservice = require('../services/cartService')
const rulesService = require('../services/rulesService')
const {multipleSequelizeToObject} = require('../../util/sequelize')
class cartController{
    //[GET]: /cart
    async cartList(req, res ,next){
        try {
            var emp = req.user.LOAINV === 'emp'
            const min = await rulesService.getMinQuantity(emp)
            // if (!req.session.cart) {
            //     return res.render('cart/cart', {
            //       products: null
            //     });
            //   }
            //   var cart = new Cart(req.session.cart);
            
              res.render('cart/cart',{min});
        } catch (error) {
            next(error)
        }
    }
    //[GET]: /cart/add/
    async add(req, res, next){
        try {
            var emp = req.user.LOAINV === 'emp'
            var productId = req.body.masach;
            var minQuantity = await rulesService.getMinQuantity(emp)
            var curr_quantity_max = await rulesService.getCurrMax()
            var curr_quantity_min = await rulesService.getCurrMin()
            var product = await cartservice.getSachbyID(productId);
            var stockPr = await cartservice.getquantityBook(productId)
            if (!emp && stockPr.SLCuoi  > curr_quantity_max) {
                res.json({message: 'Số lượng sách hiện tại vượt mức quy định'})
            } 
            else {
                if(emp && stockPr.SLCuoi - minQuantity < curr_quantity_min){
                    res.json({message: 'Số lượng sách hiện tại vượt mức quy định'})
                }else{
                    var cart = new Cart(req.session.cart ? req.session.cart : {});
                    cart.add(product, productId, minQuantity);
                    req.session.cart = cart;
                    res.json({message: 'Thành công!'})
                }
            }

        } catch (error) {
            next(error)
        }
    }
    //[GET]:/remove/:id
    async remove(req, res, next){
        try {
            var productId = req.params.id;
            var cart = new Cart(req.session.cart ? req.session.cart : {});
            cart.remove(productId);
            req.session.cart = cart;
            res.redirect('/cart');
        } catch (error) {
            next(error)
        }
    }
    //[GET]:/update-quantity
    async update(req, res, next){
        try {
            var emp = req.user.LOAINV === 'emp'
            var quantity = req.query.quantity;
            var id = req.query.id;
            var curr_quantity_max = await rulesService.getCurrMax()
            var curr_quantity_min = await rulesService.getCurrMin()
            var stockPr = await cartservice.getquantityBook(id)
            if( emp && stockPr.SLCuoi - quantity < curr_quantity_min){
                res.status(201).json({message: 'Số lượng sách hiện tại vượt mức quy định'})
            }else{
                if (!emp && stockPr.SLCuoi  > curr_quantity_max){
                res.status(201).json({message: 'Số lượng sách hiện tại vượt mức quy định'})
                }else{
                    var cart = new Cart(req.session.cart ? req.session.cart : {});
                    cart.update(id, quantity)
                    req.session.cart = cart
                    res.status(201).json({})
                }
                
            }
            
        } catch (error) {
            next(error)
        }
    }
    //[GET]:/resfesh
    async resfesh(req, res , next) {
        try{
            if (!req.session.cart) {
                res.status(200).json({
                    title: 'NodeJS Shopping Cart',
                    products : null ,
                    totalPrice: 0})
              }
              
              var cart = new Cart(req.session.cart);
              var products = cart.getItems() ? cart.getItems() : {}
                res.status(200).json({
                title: 'NodeJS Shopping Cart',
                products  ,
                totalPrice: cart.totalPrice})
        }catch(error){
            next(error)
        }
    }
    //[GET]:/listUser
    async listCust(req, res , next) {
        try {
            const list = await cartservice.getlistCust()
            res.status(200).json({list})
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new cartController