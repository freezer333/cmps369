var connect = require('connect');
var logger = require("morgan"); 
var serve_static = require("serve-static"); 
var http = require('http');
var ejs = require('ejs');
var bodyparse = require('body-parser');
var cookieparser = require('cookie-parser');
var ex_session = require('express-session');
var dateformat = require('dateformat');


var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/guessing';
var games; // will hold the games collection.


// First we'll connect to the database, and once we do, THEN we'll start up the web server.
// This way we can be sure we won't serve any requests without a valid connection to the database.

MongoClient.connect(url, function(err, db) {
  console.log("Connected correctly to server.");

  games = db.collection('games');
  var app = connect()
    .use (logger('dev'))
    .use (cookieparser())
    .use (ex_session( { secret : 'cmps369'}))
    .use (bodyparse())
    .use (serve_static('public'))
    .use (serve);

  http.createServer(app).listen(3000);
});



function serve (req, res) {
    console.log(req.url + " has been requested");
    if ( req.url == "/start") {

        // We cannot render the response until we are fully initialized - 
        // specifically, the session object on req will be destroyed
        // once we send a response - so we must pass the render code
        // in as a callback for init to call when it's done initializing 
        // the session.
        init(req, function() {
            render (res, "guess_ajax", {});
        });
        
    }
    else if (req.url == "/history") {
        console.log("Looking up full history");
        games.find({completed:true}).toArray(function (err, result) {
            render (res, "guess_history", {games: result, df: dateformat});
        });
    }
    else if (req.url.indexOf("/historyof") == 0) {
        var url = require('url');
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        console.log("Looking up " + query.id);
        games.findOne({_id:ObjectID(query.id)}, function(err, doc) {
            console.log(doc);
            render (res, "guess_historyof", {game: doc, df: dateformat});
        });
    }
    else if ( req.url == "/guess") {
        // Ajax request - just return json indicating result
        var value = req.session.value;
        var guess = req.body.guess;
        console.log ( value + ' <> ' + guess);
        res.writeHead(200, { 'Content-Type': 'application/json' });   
        
        if ( guess == value ) {
            mark_success(req.session.game_id);
            init(req, function() {
                res.end(JSON.stringify({result : 'success'}));
            });
        }
        else if ( guess < value ) {
            log_guess(req.session.game_id, guess);
            res.end(JSON.stringify({result : 'low'}));
        }
        else {
            log_guess(req.session.game_id, guess);
            res.end(JSON.stringify({result : 'high'}));
        }
    }
}

function mark_success(game_id) {
    games.updateOne( {_id:ObjectID(game_id)}, {'$set': {completed: true}});
}

function log_guess(game_id, guess) {
    games.updateOne( {_id:ObjectID(game_id)}, {'$push': {guesses : guess}});
}

function init(req, done) {
    var value = Math.floor((Math.random()*10)+1);
    games.insert({date:new Date(), secret: value}, function(err, doc) {
        if (doc.result.ok) {
            // the newly inserted document, with it's ID, has been passed back to us.
            req.session.game_id = doc.insertedIds[0];
            req.session.value = value;
            console.log("Game ID => " + req.session.game_id);
            done();
        }
    });
}

function render (res, view, model) {
     ejs.renderFile("templates/" + view + ".ejs" ,model,
        function(err, result) {
            if (!err) {
                res.end(result);
            }
            else {
                res.end("An error occurred");
                console.log(err);
            }
        }
    );
}