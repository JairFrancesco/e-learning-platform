// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//answerSchema

var answerSchema = new Schema({
	text: String,
	correct: Boolean,
	postedBy: {
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

// create a schema
var questionSchema = new Schema({
    text: {
        type: String,
        required: true,
        unique: true
    },
	postedBy: {
        required: true,
       	type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    answers: [answerSchema],
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Questions = mongoose.model('Question', questionSchema);

// make this available to our Node applications
module.exports = Questions;