
/* Before attempting to run this, 
   type "npm install" at the command line
   to install the dependencies listed in 
   the package.json file
*/

var connect = require("connect"); // external dependency - middleware
var logger = require("morgan"); // external dependency - middleware
var serve_static = require("serve-static"); // external dependency - middleware
var http = require("http"); // built into node.
var url = require('url');  // built into node.
var ejs = require('ejs');  // external dependency - templating engine


var qs = require('querystring');
// While we will continue to use the querystring module here, 
// you should check out body-parser
// which provides simplified body parsing via connect.  

var app = connect()
    .use (logger('dev'))
    .use (serve_static('public'))
    .use (serve);

http.createServer(app).listen(3000);

function serve (req, res) {
    if(req.method=='POST')  {
        var body = "";
        req.on('data', function (chunk) {
            body += chunk;
        });
        req.on('end', function() {
            var post =  qs.parse(body);
            // remember - post is just an array of name/value pairs now...
            ejs.renderFile("received.ejs",{"post": post},
                function(err, result) {
                    if (!err) {
                        res.end(result);
                    }
                    else {
                        res.end("An error occurred");
                    }
                }
            );
        });
    }
    else {
        res.writeHead(401, {'Content-Type': 'text/html'});
        res.end("Not found!");
    }
}