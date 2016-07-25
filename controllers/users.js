var express = require('express');
var router = express.Router();
var passport = require('../config/passport.js');
var User = require('../models/users.js');
var School = require('../models/schools.js');
var request = require('request');
var util = require('util'); 
//requiring util from passport. this will help check if user is loggedin
// var nearbyColleges = process.env.NEARBY_COLLEGES_ID;


//Let's Create a new user!
router.post('/register', function (req, res){
	User.create(req.body, function(err, user){
		if (err) {
			console.log(err)
			res.send(500).end();
		}
		res.send(true);
	});
});

router.get('/search', function(req,res){   
	// var schoolQuery = req.body.result;
	console.log(req.body);
	// deepPrint(ingredientQuery);
	var sat25 = req.query.sat25;
	var act25 = req.query.act25;
	console.log(req.query) 
  request("https://www.nearbycolleges.info/api/search?key=" + process.env.NEARBY_COLLEGES_ID + "&filter=tests.act25%3A>" + act25 + "%2Ctests.sat25%3A>" + sat25, function(error, response, body){
    if(!error && response.statusCode == 200){
    	result = JSON.parse(body);
    	res.send({result});
    }
  });
});

//Route w/ JWT token 
router.use(passport.authenticate('jwt', { session: false }));

//saved colleges by user profile
router.get('/profile', function(req, res, next){
	User.findById(req.user.id).then(function(user){
		res.send(user);
	}); 
});

module.exports = router;
