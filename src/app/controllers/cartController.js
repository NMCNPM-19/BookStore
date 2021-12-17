var Cart = require('../models/cart');
const cartservice = require('../services/cartService')
const {multipleSequelizeToObject} = require('../../util/sequelize')
class cartController{
    //[GET]: /cart
    async cartList(req, res ,next){
        try {

            if (!req.session.cart) {
                return res.render('cart/cart', {
                  products: null
                });
              }
              var cart = new Cart(req.session.cart);
              res.render('cart/cart');
        } catch (error) {
            next(error)
        }
    }
    //[GET]: /cart/add/:LOAINV/:id
    async add(req, res, next){
        try {
            var productId = req.params.id;
            var cart = new Cart(req.session.cart ? req.session.cart : {});
            var product = await cartservice.getSachbyID(productId);
            cart.add(product, productId);
            req.session.cart = cart;
            res.redirect('/')

        } catch (error) {
            next(error)
        }
    }

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
    async update(req, res, next){
        try {
            console.log('here')
            var quantity = req.query.quantity;
            var id = req.query.id;
            var cart = new Cart(req.session.cart ? req.session.cart : {});
            cart.update(id, quantity)
            req.session.cart = cart
            res.status(201).json({})
        } catch (error) {
            next(error)
        }
    }
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

}
module.exports = new cartController