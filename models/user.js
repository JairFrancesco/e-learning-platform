var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: String,
    password: String,
    email: {
      type: String,
      required: true
    },
    subscription: {
      type: Boolean,
      default: false
    },
    honorific: {
      type: String,
      required: false
    },
    biography: {
      type: String,
      required: false
    },
    country: {
      type: String,
      required: false
      //type: Schema.Types.ObjectId,
      //ref: 'Country'
    },
    googleplus:{
      type: String,
      required: false
    },
    twitter:{
      type: String,
      required: false
    },
    facebook:{
      type: String,
      required: false
    },
    linkedin:{
      type: String,
      required: false
    },
    youtube:{
      type: String,
      required: false
    },
    picture: {
      type: String,
      required: false
    },
    notifications:{
      type: Boolean,
      default: false
    },
    OauthId: String,
    OauthToken: String,
    firstname: {
      type: String,
      default: ''
    },
    lastname: {
      type: String,
      default: ''
    },
    instructor: {
        type: Boolean,
        default: false
    }
});

User.methods.getName = function() {
    return (this.firstname + ' ' + this.lastname);
};

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);