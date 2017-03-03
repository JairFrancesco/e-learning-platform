var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    postedBy: {
        required: true
        ,type: mongoose.Schema.Types.ObjectId
        ,ref: 'User'
    }, 
    coursers: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Course' 
	}]
}
, {
    timestamps : true
}                           
); 

var Favorites = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorites;