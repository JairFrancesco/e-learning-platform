var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Dishes = require('../models/courses');
var Verify = require('./verify');

var courseRouter = express.Router();
courseRouter.use(bodyParser.json());

courseRouter.route('/')
.get(function (req, res, next) {
    Dishes.find(req.query)
        .populate('comments.postedBy')
        .exec(function (err, course) {
        if (err) next(err);
        res.json(course);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Dishes.create(req.body, function (err, course) {
        if (err) next(err);
        console.log('Dish created!');
        var id = course._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the course with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Dishes.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

courseRouter.route('/:courseId')
.get(function (req, res, next) {
    Dishes.findById(req.params.courseId)
        .populate('comments.postedBy')
        .exec(function (err, course) {
        if (err) next(err);
        res.json(course);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Dishes.findByIdAndUpdate(req.params.courseId, {
        $set: req.body
    }, {
        new: true
    }, function (err, course) {
        if (err) next(err);
        res.json(course);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Dishes.findByIdAndRemove(req.params.courseId, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

courseRouter.route('/:courseId/comments')
.get(function (req, res, next) {
    Dishes.findById(req.params.courseId)
        .populate('comments.postedBy')
        .exec(function (err, course) {
        if (err) next(err);
        res.json(course.comments);
    });
})

.post(Verify.verifyOrdinaryUser ,function (req, res, next) {
    Dishes.findById(req.params.courseId, function (err, course) {
        if (err) next(err);
        req.body.postedBy = req.decoded._id;
        course.comments.push(req.body);
        course.save(function (err, course) {
            if (err) next(err);
            console.log('Updated Comments!');
            res.json(course);
        });
    });
})

.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin, function (req, res, next) {
    Dishes.findById(req.params.courseId, function (err, course) {
        if (err) next(err);
        for (var i = (course.comments.length - 1); i >= 0; i--) {
            course.comments.id(course.comments[i]._id).remove();
        }
        course.save(function (err, result) {
            if (err) next(err);
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all comments!');
        });
    });
});

courseRouter.route('/:courseId/comments/:commentId')
.get(Verify.verifyOrdinaryUser,function (req, res, next) {
    Dishes.findById(req.params.courseId)
        .populate('comments.postedBy')
        .exec(function (err, course) {
        if (err) next(err);
        res.json(course.comments.id(req.params.commentId));
    });
})

.put(Verify.verifyOrdinaryUser,function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Dishes.findById(req.params.courseId, function (err, course) {
        if (err) next(err);
        course.comments.id(req.params.commentId).remove();
                req.body.postedBy = req.decoded._id;
        course.comments.push(req.body);
        course.save(function (err, course) {
            if (err) next(err);
            console.log('Updated Comments!');
            res.json(course);
        });
    });
})

.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function (req, res, next) {
    Dishes.findById(req.params.courseId, function (err, course) {
        if (course.comments.id(req.params.commentId).postedBy
           != req.decoded._id) {
            var err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        }
        course.comments.id(req.params.commentId).remove();
        course.save(function (err, resp) {
            if (err) next(err);
            res.json(resp);
        });
    });
});

module.exports = courseRouter;