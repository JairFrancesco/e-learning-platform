var mongoose = require('mongoose');

// Instrucor Schema
var TASchema = mongoose.Schema({
	first_name: {
		type: String
	},
	last_name: {
		type: String
	},
	username: {
		type: String
	},
	email: {
		type: String
	},
	classes:[{
		class_id:{type: [mongoose.Schema.Types.ObjectId]},
		class_title: {type:String}
	}]
});

//  {{    *-^-*    Bottom of model   *-^-*    }}
//   --------------------------------------

var Ta = module.exports = mongoose.model('ta', TASchema);

module.exports.getTaByUsername = function(username, callback){
	var query = {username: username};
	Ta.findOne(query, callback);
}

// Register Instructor for Class
module.exports.register = function(info, callback) {
    Ta_username = info['ta_username'];
    class_id = info['class_id'];
    class_title = info['class_title'];

    var query = {username: ta_username};
    Ta.findOneAndUpdate(
      query,
      {$push: {"classes": {class_id: class_id, class_title: class_title}}},
      {safe: true, upsert: true},
      callback
    );
}
