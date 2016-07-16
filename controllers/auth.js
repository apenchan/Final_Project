var express = require ('express');
var router = express.Router();
var passport = require('../config/passport.js');
var User = require('../models/users.js');
var jwt = require('jsonwebtoken');

//Start passport
router.use(passport.initialize());

router.get('/', function(req, res){
	res.send('we are up and working!');
});

//lets get the following back if login is successful. post request ;)
router.post('/', passport.authenticate('local', {session: false}), function(req, res, next){
	console.log("the login seems to be successful. Let's celebrate");
	console.log('req.body:' + req.body);

//Expiration check
var token = jwt.sign(req.user, process.env.JWT_SECRET, {
	expiresIn: 1400
});

console.log(token);
res.json({token: token});
});

module.exports = router;

