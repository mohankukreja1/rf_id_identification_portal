var express = require('express');
var path = require('path');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session')
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);


mongoose.connect('mongodb://localhost:27017/shopping',{ useNewUrlParser: true }, function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to DB successfully!');
      }
});
var app = express();


    
var index = require('./routes/index');




// view engine setup
app.engine('.hbs', expressHbs({defaultLayout : 'layout' , extname: '.hbs'}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){
  res.locals.login = req.user;
  res.locals.session = req.session;
  next();
})
    

app.use('/', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen('4000',function(req,res){
  console.log('server started');
})



