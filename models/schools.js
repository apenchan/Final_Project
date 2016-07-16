var mongoose = require('mongoose');

//Before seeding, found a bug in nearby colleges API. Shows same colleges everytime, if you add top 25 & 72 counterpart
var schoolSchema = new mongoose.Schema({
	name: String,
	sat25: String,
	// sat75: String,
	act25: String,
	// act75: String,
});

var School = mongoose.model('School', schoolSchema);

module.exports = School;