var connect = require('connect');
var http = require('http');
var ejs  = require('ejs');


var app = connect()
    .use (connect.logger('dev'))
    .use (connect.cookieParser())
    .use (connect.session( { secret : 'cmps369'}))
    .use (connect.bodyParser())
    .use (connect.static('public'))
    .use (serve);

http.createServer(app).listen(3000);

function serve (req, res) {
    console.log(req.url + " has been requested");
    if ( req.url == "/start") {
        init(req);
        render (res, "guess_ajax", {});
    }
    else if ( req.url == "/guess") {
        // Ajax request - just return json indicating result
        // Assuming this is a POST, so we get the guess from the bodys
        // if GET, then we'd need to deal with query string instead.s
        res.writeHead(200, { 'Content-Type': 'application/json' });   
        var value = req.session.value;
        var guess = req.body.guess;
        console.log ( value + ' <> ' + guess);
        if ( guess == value ) {
            res.end(JSON.stringify({result : 'success'}));
            init(req);
        }
        else if ( guess < value ) {
            res.end(JSON.stringify({result : 'low'}));
        }
        else {
            res.end(JSON.stringify({result : 'high'}));
        }
    }

}

function init(req) {
    var value = Math.floor((Math.random()*10)+1);
    req.session.value = value;
    console.log("The secret number is %d", value);
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