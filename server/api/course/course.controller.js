'use strict';

var _ = require('lodash');
var Course = require('./course.model');
var path = require('path');
var utils = require('../../utils/utils.js');

exports.allCourses = function(req, res){
	Course.find({})
	 .sort({
	 	createTime:-1
	 })
	 .exec(function(err, courses){
	 	if (err) {
	 		return handleError(res, err);
	 	}
	 	if (!courses){
	 		return res.send(404);
	 	}
	 	console.log(courses);
	 	return res.status(200)
	 	 .json(courses);
	 })
}

exports.scrapeUpload = function(req, res) {
  var random = utils.randomizer(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

  utils.downloadURI(req.body.image, '../client/assets/images/uploads/' + random + '.png', function(filename) {
    console.log('done');

    var newCourse = new Course();
    newCourse.title = req.body.title;
    newCourse.email = req.body.email;
    newCourse.linkURL = req.body.linkURL;
    newCourse.description = req.body.description;
    newCourse.userName = req.body.name;
    newCourse._creator = req.body._creator;
    newCourse.createTime = Date.now();
    newCourse.upVotes = 0;
    newCourse.image = filename.slice(9);
    newCourse.save(function(err, item) {
      if (err) {
        console.log('error occured saving image');
      } else {
        console.log('Success post saved');
        console.log(item);
        res.status(200)
          .json(item);
      }
    });
  });
}

exports.upload = function(req, res, next){
	var newCourse = new Course();
  var fileimage = req.files[0].filename;

	newCourse.image = '/assets/images/uploads/' + fileimage;
	newCourse.email = req.body.email;
	newCourse.linkURL = req.body.linkURL;
	newCourse.title = req.body.title;
	newCourse.description = req.body.description;
	newCourse.userName = req.body.name;
	newCourse._creator = req.body._creator;
	newCourse.createTime = Date.now();
	newCourse.upVotes = 0;
  //newCourse.image += '.png';
	//newCourse.image = filename.slice(9);
	newCourse.save(function(err, item) {
      if (err) {
        console.log('error occured saving image');
      } else {
        console.log('Success post saved');
        console.log(item);
        res.status(200)
          .json(item);
      }
    }); 
}

function handleError(res, err){
	return res.send(500, err);
}