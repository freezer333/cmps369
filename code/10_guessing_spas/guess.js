var connect = require('connect');
var http = require('http');


// Note - we're just serving straight out of public... running node really isn't even necessary...

var app = connect()
    .use (connect.logger('dev'))
    .use (connect.cookieParser())
    .use (connect.session( { secret : 'cmps369'}))
    .use (connect.bodyParser())
    .use (connect.static('public'));

http.createServer(app).listen(3000);

