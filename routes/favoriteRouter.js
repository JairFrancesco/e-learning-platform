var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorite = require('../models/favorites');
var Dish = require('../models/courses');
var verify = require('./verify');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .all(verify.verifyOrdinaryUser)
    .get(function (req, res, next) {
        Favorite.find({'postedBy': req.decoded._id})
            .populate('postedBy')
            .populate('courses')
            .exec(function (err, favorites) {
                if (err) return err;
                res.json(favorites);
            });
    })

    .post(function (req, res, next) {
        Favorite.find({'postedBy': req.decoded._id})
            .exec(function (err, favorites) {
                if (err) throw err;
                req.body.postedBy = req.decoded._id;

                if (favorites.length) {
                    var favoriteAlreadyExist = false;
                    if (favorites[0].courses.length) {
                        for (var i = (favorites[0].courses.length - 1); i >= 0; i--) {
                            favoriteAlreadyExist = favorites[0].courses[i] == req.body._id;
                            if (favoriteAlreadyExist) break;
                        }
                    }
                    if (!favoriteAlreadyExist) {
                        favorites[0].courses.push(req.body._id);
                        favorites[0].save(function (err, favorite) {
                            if (err) throw err;
                            console.log('Um somethings up!');
                            res.json(favorite);
                        });
                    } else {
                        console.log('Setup!');
                        res.json(favorites);
                    }

                } else {
                    Favorite.create({postedBy: req.body.postedBy}, function (err, favorite) {
                        if (err) throw err;
                        favorite.courses.push(req.body._id);
                        favorite.save(function (err, favorite) {
                            if (err) throw err;
                            console.log('Something is up!');
                            res.json(favorite);
                        });
                    })
                }
            });
    })

    .
    delete(function (req, res, next) {
        Favorite.remove({'postedBy': req.decoded._id}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        })
    });

favoriteRouter.route('/:courseId')
    .all(verify.verifyOrdinaryUser)
    .delete(function (req, res, next) {

        Favorite.find({'postedBy': req.decoded._id}, function (err, favorites) {
            if (err) return err;
            var favorite = favorites ? favorites[0] : null;

            if (favorite) {
                for (var i = (favorite.courses.length - 1); i >= 0; i--) {
                    if (favorite.courses[i] == req.params.courseId) {
                        favorite.courses.remove(req.params.courseId);
                    }
                }
                favorite.save(function (err, favorite) {
                    if (err) throw err;
                    console.log('Here you go!');
                    res.json(favorite);
                });
            } else {
                console.log('No favorites!');
                res.json(favorite);
            }

        });
    });

module.exports = favoriteRouter;