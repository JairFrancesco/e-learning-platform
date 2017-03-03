var express = require('express');
var router = express.Router();

Class = require('../models/class');
Ta = require('../models/ta');
User = require('../models/user');

router.get('/classes', function(req, res, next){
	Ta.getTaByUsername(req.user.username, function(err, ta){
		if(err) throw err;
		res.render('Ta/classes', {ta: ta});
	});
});

router.post('/classes/register', function(req, res){
	info = [];
	info['Ta_username'] = req.user.username;
	info['class_id'] = req.body.class_id;
	info['class_title'] = req.body.class_title;

	Ta.register(info, function(err, ta){
		if(err) throw err;
		console.log(ta);
	});

	req.flash('success_msg', 'You are now registered as Teacher Assistant of this class');
	res.redirect('/tas/classes');
});

module.exports = router;

// this page is an exact replica of instructors.js
// so it's no problem here. 

/* [note to self]
so what I'm doing with this code is a learning
excersise, I'm adding a teacher's Assistant, to
make sure what i've learned is cemented in.

students can now view what Ta's of selected classes.
*/
