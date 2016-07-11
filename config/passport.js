var User = require('..models/users.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var JwtOpts = {};
//able to capture users identity based off of login from their computer

var util = require("util");
JwtOpts.jwtFromRequest = function(req) {
	var token = null;
	if (req && req.cookies) {
		token = req.cookies['jwt_token'];
	} 
	return token
};

JwtOpts.secretOrKey = process.env.JWT_SECRET;

passport.use(new JwtStrategy(JwtStrategy, function(jwt_payload, done){
	console.log("JWT PAYLOAD" + util.inspect(jwt_payload));

//see if we found the jwt token in browser
User.findOne({username: jwt_payload._doc.username}, function(err, user){
		if (err) {
			return done(err, false);
		}
		if (user) {
			console.log("this is user" + user.username)
			done(null, user);
		} else {
			done(null, false);
		}
	});
}));

passport.use (new LocalStrategy(
	function(username, password, done) {
		console.log("Let's find that username");
		User.findOne ({username: username}, function(err, dbUser){
			if (err) {
				console.log("can't find username");
				return done(err);
			}
			if (!dbUser){
				return (done, false)
			}
			if (!dbUser.authenticate(password)){
				return done(null, false);
			}
			return (done, dbUser);
		});
	})
);

module.exports = passport;


