var express = require('express');
var router = express.Router();

/*  The following data would be much better off being in a database! */
var timesPlayed = 0;
var timesCorrect = 0;
var totalGuesses = 0;





/*  Redirect to / if the user is not authenticated */
function authorize(req, res, next) {
    console.log("Authorizing user");
    if (req.user) {
      next();
    } else {
      req.session.error = 'Access denied!';
      console.log("Unauthorized page access");
      res.redirect('/');
    }
}


// just for a demo.... we aren't actually using this in the app.
router.get('/auth', function (req, res) {
	res.status(401).set('WWW-Authenticate', "Basic realm='guessing game'");
	res.end();
});



router.get('/stats', function (req, res) {
	res.render('stats', {
		timesPlayed : timesPlayed, 
		timesCorrect : timesCorrect, 
        avgGuesses : totalGuesses / timesCorrect});
});




router.get('/', function (req, res) {
    res.render('login');
});





router.get('/start', authorize, function (req, res) {
	var value = Math.floor((Math.random()*10)+1);
    req.session.value = value;
    req.session.results = [];
    
    console.log("The secret number is %d", req.session.value);
    console.log(req.session);
    timesPlayed++;
    res.render('start', {});
});


router.post('/guess', authorize, function (req, res) {
	var guess = req.body.guess;
	var value = req.session.value;
	totalGuesses++;
	if ( guess > value ) {
		req.session.results.push( { guess : guess, result : "too high"});
		res.render('guess', { results : req.session.results});
	}
	else if ( guess < value ) {
		req.session.results.push( { guess : guess, result : "too low"});
		res.render('guess', { results : req.session.results});
	}
	else {
        timesCorrect++;
		res.render('success', {});
	}
});

router.get('/success', authorize, function (req, res) {
	timesCorrect++;
	res.render('success');
});


module.exports = router;
