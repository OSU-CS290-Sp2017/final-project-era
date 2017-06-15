var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
// var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

// var mongoHost = process.env.MONGO_HOST;
// var mongoPort = process.env.MONGO_PORT || 27017;
// var mongoUser = process.env.MONGO_USER;
// var mongoPassword = process.env.MONGO_PASSWORD;
// var mongoDBName = process.env.MONGO_DB;
// var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword +
//   '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;
var mongoURL = 'mongodb://localhost:27017/myproject'
var mongoDB;


// console.log('== MongoDB URL:', mongoURL);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
//******************************************************************************
// get pages
// get index page, used for login 
app.get('/index',function(req, res, next){
    console.log(req.url);
    var templateArgs = {
    userName:'login here',
    order:false
    };
    res.render('indexPage',templateArgs);
});

// get drink page, used for login 
app.get('/drink',function(req, res, next){
    console.log(req.url);
    var templateArgs = {
    userName:'Dapeng',
    order:false
    };
    res.render('drinkPage',templateArgs);
});

// get breakfast page, used for login 
app.get('/breakfast',function(req, res, next){
    console.log(req.url);
    var templateArgs = {
    userName:'login here',
    order:false
    };
    res.render('breakfastPage',templateArgs);
});

// get sandwich page, used for login 
app.get('/sandwich',function(req, res, next){
    console.log(req.url);
    var templateArgs = {
    userName:'login here',
    order:false
    };
    res.render('sandwichPage',templateArgs);
});

// get salad page, used for login 
app.get('/salad',function(req, res, next){
    console.log(req.url);
    var templateArgs = {
    userName:'login here',
    order:false
    };
    res.render('saladPage',templateArgs);
});

// get good_eat page, used for login 
app.get('/good_eat',function(req, res, next){
    console.log(req.url);
    var templateArgs = {
    userName:'login here',
    order:false
    };
    res.render('good_eatPage',templateArgs);
});

// get breakfast_sandwiches_burritos page, used for login 
app.get('/breakfast_sandwiches_burritos',function(req, res, next){
    console.log(req.url);
    var templateArgs = {
    userName:'login here',
    order:false
    };
    res.render('breakfast_sandwiches_burritosPage',templateArgs);
});

//******************************************************************************
// post oders from each page
// get information from mongoDB (collection "orderInfo") to shopping_cart page
// get drink page, used for login 
app.post('/drink',function(req, res, next){
    
    if(req.body && req.body.url){
      var name = req.body.name;
      var orderName = drinkName;
      var orderPrice = drinkValue;
      var orderDescription = drinkDescription;

      var collection = mongoDB.collection();



    }else{
      res.status(400).send("oops, something wrong on the server");
    }
    
});



app.get('/shoppingCart', function (req, res, next) {
  // console.log(req.url);
  // var collection = mongoDB.collection('tempOrderData');
  // collection.find().toArray(function(err, tempOrderData){
  //   if (err) {
  //     res.status(500).send("Error fetching people from DB.");
  //   } else {
  //     console.log(tempOrderData);
  //     var templateArgs = {
  //       // name:tempOrderData,
  //       order: "find"
        
  //     };
  //     // res.render('shopping_cart/index', templateArgs);
  //     res.render('shoppingCartPage', templateArgs);
  //   }
  // // });
  var templateArgs = {
    
    order:false
  };
  res.render('shoppingCartPage',templateArgs);
  // var collection = mongoDB.collection('userInfo');
  // collection.find({}).toArray(function (err, peopleData) {

  //   if (err) {
  //     res.status(500).send("Error fetching people from DB.");
  //   } else {
  //     var templateArgs = {
  //       people: peopleData,
  //       title: "Photos of People"
  //     };
  //     res.render('chefPage', templateArgs);
  //   }

  // });

});

// post information from shopping_cart to mongoDB, save to "processing" collection



app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res) {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

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
