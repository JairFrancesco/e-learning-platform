var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var markerSchema = new Schema({
	content: [{
		required: true,
		type: mongoose.Schema.Types.ObjectId
		ref: 'Content'
	}],
    postedBy: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
       	ref: 'User'
    }
}
, {
    timestamps : true
}                           
); 

var Markers = mongoose.model('Marker', markerSchema);

module.exports = Markers;