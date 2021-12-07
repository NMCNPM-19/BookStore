const RouterSite = require('./Site')

function route(app){
    
    app.use('/',RouterSite)
}

module.exports = route 