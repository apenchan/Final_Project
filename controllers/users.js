var express = require('express');
var router = express.Router();
var passport = require('../config/passport.js');
var User = require('../models/users.js');
var School = require('../models/schools.js');
var request = require('request');
var util = require('util'); 
//requiring util from passport. this will help check if user is loggedin
var nearbyColleges = process.env.NEARBY_COLLEGES_ID;
console.log(nearbyColleges);

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

module.exports = router;
