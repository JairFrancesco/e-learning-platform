// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Comment Schema
var commentSchema = new Schema({
    comment:  {
        type: String,
        required: true
    },
    postedBy: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// create a schema
var announcementSchema = new Schema({
    title: String
    body: {
        type: String,
        required: true,
        unique: true
    },
	postedBy: {
        required: true,
       	type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    course: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }
    comments: [commentSchema],
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Announcements = mongoose.model('Announcement', announcementSchema);

// make this available to our Node applications
module.exports = Announcements;