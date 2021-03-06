const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars')
const flash = require('connect-flash');
const doc=require("jspdf");
const express_handlebars_sections = require('express-handlebars-sections');




const userOnl = require('./app/middlewares/userOnl')
const sessionCart = require('./app/middlewares/sessionCart')
//Router for app
const router = require('./routes');



const session = require('express-session');
const passport = require('./config/auth/passport');
const app = express();

// view engine setup
app.engine(
    '.hbs',
    exphbs.engine({
        extname :'hbs',
        helpers: require('./helper/handlebars'),
    })
);
express_handlebars_sections(exphbs);

app.set('views', path.join(__dirname ,'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(userOnl)
app.use(sessionCart)

router(app)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error', {layout: false});
});

module.exports = app;
