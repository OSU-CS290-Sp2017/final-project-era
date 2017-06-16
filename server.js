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
