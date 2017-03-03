var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contentSchema = new Schema({
	brief: String,
	title: String,
	description: String,
	body: {
		type: String,
		required: false,
		default: ''
	},
	video: {
		type: String,
		required: false,
		default: ''
	},
	section: {
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Section'
	},
	questions: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Question'	
	}]
}
, {
    timestamps : true
}                           
); 

var Contents = mongoose.model('Content', contentSchema);

module.exports = Contents;