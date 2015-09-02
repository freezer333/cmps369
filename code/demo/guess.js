var connect = require('connect');

var http = require('http');
var ejs = require('ejs');

var app = connect()
	.use ( connect.logger('dev'))
	.use ( connect.bodyParser())  // req.body.guess
	.use ( connect.static('public'))
	.use ( connect.cookieParser())
	.use (connect.session ( { secret : 'something'}))
	.use ( serve );

http.createServer(app).listen(3000);

function serve(req, res) {
	console.log(req.url);
	if ( req.url == '/start') {
		console.log( "Requesting start page");
		var value = Math.floor((Math.random()*10 + 1));
		console.log(value);
		req.session.value = value;
		req.session.results = [];
		render(res, 'start', {});
	}
	else if ( req.url == '/guess') {
		var guess = req.body.guess;
		var value = req.session.value;

		console.log(guess + " > " + value );
		if ( guess > value ) {
			req.session.results.push( { guess : guess, result : "too high"});
			render(res, 'guess', { results : req.session.results});
		}
		else if ( guess < value ) {
			req.session.results.push( { guess : guess, result : "too low"});
			render(res, 'guess', { results : req.session.results});
		}
		else {
			render (res, 'success', {});
		}
	}
	else {
		res.end("Page not found");
	}
}

function render(res, view, model ) {
	ejs.renderFile('template/' + view + '.ejs', model, 
		function (err, result) {
			if ( err ) {
				console.log(err);
				res.end("error!");
			}
			else {
				res.end(result);
			}
		}

		);

}


