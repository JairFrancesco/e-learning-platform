var request = require('request');
var cheerio = require('cheerio');

exports.list = function(url, cb){
	request(url, function(err, resp, body){		
		if (err) {
			cb({
				error: error
			});
		} else {
			var $ = cheerio.load(body);
			var pin = {};
			var $url = url;

			var json = $('#schema_markup script').text();
			var obj = JSON.parse(json);
			var $img = obj.image;
			var $desc = obj.name;
			//var indexJPG = body."https://udemy-images.udemy.com/course/";
			//var $img = $('.placeholder__thumbnail-container play-button-trigger').text(); //get from udemy
			//var $desc = $('.clp-component-render h1').text(); // description from pinterest	

			console.log($img + ' pin url');

			var course = {
				img: $img,
				url: $url,
				desc: $desc
			}

			//respond with the final JSON object

			cb(course);
		}
	})
};