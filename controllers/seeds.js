var express = require('express');
var mongoose = require('mongoose');
var db = process.env.MONGODB_URI || "mongodb://localhost/find_me_uni";
var router = express.Router();
// var User = require('../models/users.js');
// var School = require('../models/schools.js');

// router.get('/', function(req, res){
// 	var user1 = new User({
// 		firstName: "Anna",
// 		lastName: "Penchansky",
// 		username: "apenchan",
// 		password: "password",
// 		state: "Florida",
// 		zipCode: "33458",
// 		satScore: "1200",
// 		actScore: "25",
// 		savedSchools: []
// 	});

// 	var school1 = new School({
// 		name: "Tulane University of Louisiana",
// 		sat25: "1870",
// 		act25: "29",
// 	});

// 	user1.save();
// 	school1.save();
// 	user1.savedSchools.push(school1);
// 	user1.save();

// 	console.log("=============");
// 	console.log("Seed, seed, wha wha");
// 	console.log("================");
// 	res.end();
// });

// module.exports = router;