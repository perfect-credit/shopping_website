
// Node requirements
var http = require('http');
var url = require('url');
var fs = require('fs');

var port = 8080;

var pathnameMatches = [ '' , '/' , '/index.html' ];

var mainViewPath = '/app/views/index.html';

http.createServer(function(request, response) {
    
    if ((request.method == 'GET') && (pathnameMatches.indexOf(url.parse(request.url).pathname) > -1)) {
        
        fs.readFile(mainViewPath, function(error, data) {
            
            if (error) {
                responseCode = 404;
                data = '404 Not Found!';
            } else {
                responseCode = 200;
            }
            
            response.writeHead(responseCode, { 'Content-Type': 'text/html' });
    		response.write(data);
    		response.end();
            
        });
        
    }
    
}).listen(port);
