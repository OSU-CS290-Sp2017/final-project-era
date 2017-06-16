//**************** start steps 7 

var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('indexPage');
});


//**************** start steps 20
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');   // ? 这个是调的哪里的文件？ 
	}
}

//**************** end steps 20

module.exports = router;



//**************** end steps 7 