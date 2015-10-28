var connect = require("connect"); 
var logger = require("morgan"); 
var http = require("http"); 
var ejs = require('ejs');  
var bodyparse = require('body-parser');

var app = connect()
    .use (logger('dev'))
    .use (bodyparse())
    .use (serve);

http.createServer(app).listen(3000);

function serve (req, res) {
    console.log(req.url);
    if ( req.url == "/start") {
        console.log("Starting!");
        var value = Math.floor((Math.random()*10)+1);
        console.log("The secret number is %d", value);
        render (res, "start", {value :value});
    }
    else if ( req.url == "/guess") {
        var value = req.body.value;
        var guess = req.body.guess;
        if ( guess == value ) {
            render (res, "success", {});
        }
        else if ( guess < value ) {
            render (res, "guess", {value:value, message:"low"});
        }
        else {
            render (res, "guess", {value:value, message:"high"});
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