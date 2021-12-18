const RouterSite = require('./Site')
const RouterAccount = require('./Accounts')
const RouterCustomer = require('./Customers')
const RouterProfile = require('./User')
const RouterProduct = require('./Products')
const RouterStorage = require('./Storage')
const RouterDebt=require('./Debt')
const RouterOrder = require('./Order')
const RouterCart = require('./Cart')
const RouterSelling = require('./Selling')
function route(app){
    
    app.use('/',RouterSite)
    app.use('/selling',RouterSelling)
    app.use('/cart',RouterCart)
    app.use('/products',RouterProduct)
    app.use('/user',RouterProfile)
    app.use('/accounts',RouterAccount)
    app.use('/customers',RouterCustomer)
    app.use('/storage',RouterStorage)
    app.use('/debt',RouterDebt)
    app.use('/importOrder',RouterOrder)
    
}

module.exports = route 