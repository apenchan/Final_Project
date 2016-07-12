var mongoose = require('mongoose');

var schoolSchema = new mongoose.Schema({
	img_src: String,
	name: String,
	state: String,
	zipCode: String,
	undergradTotal: String,
	sat25: String,
	sat75: String,
	act25: String,
	act75: String,
	website: String
});

var School = mongoose.model('School', schoolSchema);

module.exports = School;