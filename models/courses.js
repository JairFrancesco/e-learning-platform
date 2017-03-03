// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// create a schema
var courseSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    chat:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },
    questions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    announcements: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Announcement'
    }],
    sections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section'
    }],
    about:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required:true
    },
    label:{
        type: String,
        required: true,
        default: ''
    },
    category:{
        type: String,
        required: true
    },
    price:{
        type: Currency,
        required: true
    },
    comments: [commentSchema],
    featured:{
        type:Boolean,
        default: false
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Courses = mongoose.model('Course', courseSchema);

// make this available to our Node applications
module.exports = Courses;