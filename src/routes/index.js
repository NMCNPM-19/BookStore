const RouterSite = require('./Site')
const RouterAccount = require('./Accounts')
function route(app){
    app.use('/accounts',RouterAccount)
    app.use('/',RouterSite)
}

module.exports = route 