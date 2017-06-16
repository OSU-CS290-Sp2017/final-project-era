var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
// var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
//var port = process.env.PORT || 3000;


var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;

var mongoURL = 'mongodb://localhost:5000/myproject'
var mongoDB;


app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var routes = require('./routes/index');
var users = require('./routes/users');








// evanshen add start for app.js


// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;  // 登录的时候的判断条件 
  next();
});


// if you meet / you need to use routes
//app.use('/', routes);
app.use('/users', users);




// evanshen add end for app.js








// get index page, used for login 
app.get('',function(req, res, next){
    console.log(req.url);
    var user = 'please log in';
    if(res.locals.user){
      user = res.locals.user.name;
    }
    var templateArgs = {
    userName:user,
    order:false
    };
    res.render('indexPage',templateArgs);
});

// get index page, used for login 
app.get('/',function(req, res, next){
    console.log(req.url);
    var user = 'please log in';
    if(res.locals.user){
      user = res.locals.user.name;
    }
    var templateArgs = {
    userName:user,
    order:false
    };
    res.render('indexPage',templateArgs);
});


// get index page, used for login 
app.get('/index',function(req, res, next){
    console.log(req.url);
    var user = 'please log in';
    if(res.locals.user){
      user = res.locals.user.name;
    }
    var templateArgs = {
    userName:user,
    order:false
    };
    res.render('indexPage',templateArgs);
});

// get drink page, used for login 
app.get('/drink',function(req, res, next){
    console.log(req.url);
    var user = 'please log in';
    if(res.locals.user){
      user = res.locals.user.name;
    }
    var templateArgs = {
    userName:user,
    order:false
    };
    res.render('drinkPage',templateArgs);
});

// get breakfast page, used for login 
app.get('/breakfast',function(req, res, next){
    console.log(req.url);
    var user = 'please log in';
    if(res.locals.user){
      user = res.locals.user.name;
    }
    var templateArgs = {
    userName:user,
    order:false
    };
    res.render('breakfastPage',templateArgs);
});

// get sandwich page, used for login 
app.get('/sandwich',function(req, res, next){
    console.log(req.url);
    var user = 'please log in';
    if(res.locals.user){
      user = res.locals.user.name;
    }
    var templateArgs = {
    userName:user,
    order:false
    };
    res.render('sandwichPage',templateArgs);
});

// get salad page, used for login 
app.get('/salad',function(req, res, next){
    console.log(req.url);
    var user = 'please log in';
    if(res.locals.user){
      user = res.locals.user.name;
    }
    var templateArgs = {
    userName:user,
    order:false
    };
    res.render('saladPage',templateArgs);
});

// get good_eat page, used for login 
app.get('/good_eat',function(req, res, next){
    console.log(req.url);
    var user = 'please log in';
    if(res.locals.user){
      user = res.locals.user.name;
    }
    var templateArgs = {
    userName:user,
    order:false
    };
    res.render('good_eatPage',templateArgs);
});

// get breakfast_sandwiches_burritos page, used for login 
app.get('/breakfast_sandwiches_burritos',function(req, res, next){
    console.log(req.url);
    var user = 'please log in';
    if(res.locals.user){
      user = res.locals.user.name;
    }
    var templateArgs = {
    userName:user,
    order:false
    };
    res.render('breakfast_sandwiches_burritosPage',templateArgs);
});

//******************************************************************************
// post oders from each page
// get information from mongoDB (collection "orderInfo") to shopping_cart page
// get drink page, used for login 
app.post('/drink',function(req, res, next){
    
    if(req.body.name && 
        req.body.orderName &&
        req.body.orderPrice &&
        req.body.orderDescription ){

      // console.log("name = "+req.body.name +
      //             "\norderName = ", req.body.orderName +
      //             "\norderPrice = ", req.body.orderPrice +
      //             "\norderDescription = ", req.body.orderDescription);
      //pass to mongoDB
      var collection = mongoDB.collection('tempOrder');
      collection.update(
        { name:req.body.name,
          orderName:req.body.orderName,
          orderPrice:req.body.orderPrice,
          orderDescription : req.body.orderDescription,
          status: "unsubmitted"},
        {$inc: {quantity: 1}},
        {upsert: true, safe: false},
        function(err, data){
          if(err){
            console.log("err =>",err);
          }else{
            console.log("update succeded");
          }
          res.status(200).send();
        }
        );
    }else{
      res.status(400).send("oops, cannot send correct info to server");
    }
});


// get shoppingCart page, used for submit order 
app.get('/shoppingCart',function(req, res, next){
  var userName = "Dapeng";
    // console.log(req.url,"person = ",person);
    var collection = mongoDB.collection('tempOrder');
    collection.find({name:userName}).toArray(function(err, tempOrderData){
        if (err) {
            res.status(500).send("Error fetching people from DB.");
        } else {
            var totalPrice = 0;
            for (var i = tempOrderData.length - 1; i >= 0; i--) {
              tempOrderData[i].subTotal = (tempOrderData[i].quantity * tempOrderData[i].orderPrice).toFixed(2);
              totalPrice +=(tempOrderData[i].quantity * tempOrderData[i].orderPrice);
            }
            console.log(tempOrderData);
            var templateArgs = {
              name:userName,
              tempOrderData : tempOrderData,
              totalPrice:totalPrice.toFixed(2)
            };
            res.render('shoppingCartPage', templateArgs);
        }
    });
    var templateArgs = {
        orderName:"coffee",
        orderDescription: "not free",
        orderPrice:99,
        order:false
    };
    
});

// post content on the shopping cart page, to the mongoDB
// app.post('/shoppingCart',function(req, res, next){
    

// }


app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res) {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});



app.set('port', (process.env.PORT || 3000));

var port = process.env.PORT || 3000;

// Start the server listening on the specified port.
MongoClient.connect(mongoURL, function (err, db) {
  if (err) {
    throw err;
  }
  mongoDB = db;
  app.listen(port, function () {
    console.log("== Server listening on port", port);
    
  });

});



