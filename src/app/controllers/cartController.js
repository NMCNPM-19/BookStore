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
              console.log(cart.getItems())
              res.render('cart/cart', {
                title: 'NodeJS Shopping Cart',
                products:  cart.getItems(),
                totalPrice: cart.totalPrice
              });
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
    
}
module.exports = new cartController