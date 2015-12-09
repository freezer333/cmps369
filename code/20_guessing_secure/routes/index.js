var express = require('express');
var router = express.Router();

var timesPlayed = 0;
var timesCorrect = 0;

exports.timesPlayed = timesPlayed;

router.get('/stats', function (req, res) {
	res.render('stats', {
		timesPlayed : timesPlayed, 
		timesCorrect : timesCorrect });
});


var ensureLoggedIn = function(req, res) {
	if ( req.user ) {
		next();
	}
	else {
		res.sendRedirect("/login");
	}
}

router.get('/start', function (req, res) {
	var value = Math.floor((Math.random()*10)+1);
    req.session.value = value;
    req.session.results = [];
    
    console.log("The secret number is %d", req.session.value);
    console.log(req.session);
    timesPlayed++;
    res.render('start', {});
});


router.post('/guess', function (req, res) {
	var guess = req.body.guess;
	var value = req.session.value;
	
	if ( guess > value ) {
		req.session.results.push( { guess : guess, result : "too high"});
		res.render('guess', { results : req.session.results});
	}
	else if ( guess < value ) {
		req.session.results.push( { guess : guess, result : "too low"});
		res.render('guess', { results : req.session.results});
	}
	else {
		res.render('success', {});
	}
});

router.get('/success', function (req, res) {
	timesCorrect++;
	res.render('success');
});


module.exports = router;
