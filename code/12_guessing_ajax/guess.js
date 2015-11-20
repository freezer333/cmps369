var connect = require('connect');
var logger = require("morgan"); 
var serve_static = require("serve-static"); 
var http = require('http');
var ejs = require('ejs');
var bodyparse = require('body-parser');
var cookieparser = require('cookie-parser');
var ex_session = require('express-session');

var app = connect()
    .use (logger('dev'))
    .use (cookieparser())
    .use (ex_session( { secret : 'cmps369'}))
    .use (bodyparse())
    .use (serve_static('public'))
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
        var value = req.session.value;
        var guess = req.body.guess;
        console.log ( value + ' <> ' + guess);
        res.writeHead(200, { 'Content-Type': 'application/json' });   
        
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