
/* 
-----------------------------------------------------------------------------------

	IMPORTANT
	===========
	Before running this program, you need to install the "connect"
	package into this directory.

	From the command line, while in the same directory as this file, 
	type "npm install".

	Then to run, just type "node server.js"

----------------------------------------------------------------------------------- 
*/



var connect = require("connect");
var logger = require("morgan");
var serve_static = require("serve-static");
var http = require("http");

var app = connect()
  .use(logger('dev'))
  .use(serve_static('public'))
  .use(serve)

http.createServer(app).listen(3000);



function serve (req, res) {
	console.log("Host name:  " + req.headers.host);
	console.log("Connection:  " + req.headers.connection);
	console.log("Accept:  " + req.headers.accept);
	
	if(req.method=='POST')  {
		process_post(req, res);
	}
	else {
		process_get(req, res);
	}
}

function process_post(req, res) {
	var body = "";
	req.on('data', function (chunk) {
	   	body += chunk;
	});
	req.on('end', function() {
  		qs = require('querystring');
  		var response = "<html><body><h1>Posted data</h1>";
  		var post =  qs.parse(body);
		for ( q in post ) {
			console.log(q + " -> " + post[q]);
			response += ("<p> " + q + "->" + post[q] + "</p>");
		}
		response += "</body></html>";
		res.end(response);
  	});
}

function process_get(req, res) {
	var url = require('url');
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	
	for ( q in query ) {
		console.log(q + " -> " + query[q]);
	}
	res.end('That page wasn\'t found...\n');
}