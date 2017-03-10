'use strict'

var controller = require('./course.controller')
var express = require('express');
var router = express.Router();
var auth = require('../../auth/auth.service');
var multer = require('multer');

var upload = multer({dest: '../client/assets/images/uploads'});

router.post('/scrapeUpload', auth.isAuthenticated(), controller.scrapeUpload);
router.post('/upload', auth.isAuthenticated(), upload.any(),controller.upload);
router.get('/getAllCourses', controller.allCourses);

module.exports = router;