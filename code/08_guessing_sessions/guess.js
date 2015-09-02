var connect = require('connect');
var http = require('http');
var ejs = require('ejs');

var app = connect()
    .use (connect.logger('dev'))
    .use (connect.cookieParser())
    .use (connect.session( { secret : 'cmps369'}))
    .use (connect.bodyParser())
    .use (connect.static('public'))
    .use (serve);

http.createServer(app).listen(3000);

function serve (req, res) {
    console.log(req.url);
    if ( req.url == "/start") {
        console.log("Starting!");
        var value = Math.floor((Math.random()*10)+1);
        req.session.value = value;
        req.session.results = [];
        console.log("The secret number is %d", value);
        render (res, "start", {});
    }
    else if ( req.url == "/guess") {
        var value = req.session.value;

        var guess = req.body.guess;
        if ( guess == value ) {
            render (res, "success", {});
        }
        else if ( guess < value ) {
            req.session.results.push({ guess : guess, result : "too low"});
            render (res, "guess", {results:req.session.results});
        }
        else {
            req.session.results.push({ guess : guess, result : "too high"});
            render (res, "guess", {results:req.session.results});
        }
        console.log("Guessing");
    }
    else {
        res.end("Page not found!");
    }
}

function render (res, view, model) {
     ejs.renderFile("templates/" + view + ".ejs" ,model,
        function(err, result) {
            if (!err) {
                res.end(result);
            }
            else {
                res.end("An error occurred");
            }
        }
    );
}