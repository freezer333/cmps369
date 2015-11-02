var connect = require('connect');
var http = require('http');
var logger = require("morgan"); 
var serve_static = require("serve-static"); 


// Note - we're just serving straight out of public... running node really isn't even necessary...

var app = connect()
    .use (logger('dev'))
    .use (serve_static('public'));

http.createServer(app).listen(3000);

