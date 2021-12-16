var Cart = require('../models/cart');
const cartservice = require('../services/cartService')
const {multipleSequelizeToObject} = require('../../util/sequelize')
class cartController{
    //[GET]: /cart
    async cartList(req, res ,next){
        try {
            var product = await cartservice.getSachs();
            var cart = req.session.cart|| null
            res.render('cart/cart', { product: multipleSequelizeToObject(product) ,  totalPrice: 0 })
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

        } catch (error) {
            next(error)
        }
    }

    async remove(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    
}
module.exports = new cartController