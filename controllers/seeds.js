var express = require('express');
var mongoose = require('mongoose');
var db = process.env.MONGODB_URI || "mongodb://localhost//find_me_uni";
var router = express.Router();
var User = require('../models/users.js');
var School = require('../models/schools.js');

router.get('/', function(req, res){
	var user1 = new User({
		firstName: "Anna",
		lastName: "Penchansky",
		username: "apenchan",
		password: "password",
		state: "Florida",
		zipCode: "33458",
		satScore: "1900",
		actScore: "25",
		savedSchools: []
	});

	var school1 = new School({
		img: String,
		name: String,
		state: String,
		undergradTotal: String,
		sat25: String,
		sat75: String,
		act25: String,
		act75: String,
		website: String
	})


});

module.exports = router;