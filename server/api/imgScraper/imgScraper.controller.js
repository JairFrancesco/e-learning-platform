'use strict'

var scrapers = {};

scrapers['udemy'] = require('./scrapers/udemy.js');
//scrapers['instagram'] = require('./scrapers/instagram.js');

exports.scrape = function(req, res){
	var url = req.body.url;
	var scraperToUse;

	if (url.indexOf('udemy')>-1){
		scraperToUse = 'udemy';
	} else {
		console.log('cannot locate scraper');
	}

	scrapers[scraperToUse].list(url, function(data){
		console.log('data from scraper', data);
		res.json(data);
	});
}
