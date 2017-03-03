var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sectionSchema = new Schema({
	title: String,
	description: String,
	course: {
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Course'
	},
	contents: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Content'	
	}]
}
, {
    timestamps : true
}                           
); 

var Sections = mongoose.model('Section', sectionSchema);

module.exports = Sections;