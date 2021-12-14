const RouterSite = require('./Site')
const RouterAccount = require('./Accounts')
const RouterCustomer = require('./Customers')
const RouterProfile = require('./User')
const RouterProduct = require('./Products')
function route(app){
    
    app.use('/',RouterSite)
    app.use('/products',RouterProduct)
    app.use('/user',RouterProfile)
    app.use('/accounts',RouterAccount)
    app.use('/customers',RouterCustomer)
}

module.exports = route 