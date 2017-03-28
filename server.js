
// Node requirements
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

var port = 8080;

var indexPathnameMatches = [ '' , '/' ];

var appPath = path.dirname(require.main.filename);

var mainViewRelativePath = '/app/views/index.html';

http.createServer(function(request, response) {
    
    var responseCode = 500;
    var contentType="text/html";
    var content = '';
    
    var pathname = url.parse(request.url).pathname;
    
    if (request.method == 'GET') {
        var validPath=true;
        var filePath = pathname;
        
        if(pathname.indexOf('.css')>-1){
            contentType="text/css";
        }
        else if(pathname.indexOf('.js')>-1){
            contentType="application/javascript";
            
        }
        else if(indexPathnameMatches.indexOf(pathname)>-1){
            filePath=mainViewRelativePath;
        
            
        }
        else if(pathname.indexOf('.html')==-1){
            validPath=false;
            responseCode = 404;
            content = '404 Not Found!';
            
        }
        
        
        if(validPath){
            try {
                content = fs.readFileSync(appPath + filePath);
                responseCode=200;
            } catch (error) {
                responseCode = 404;
                content = '404 Not Found!';
            }
        }
        
    } else {
        
        responseCode = 400;
        content = '400 Bad Request!';
        
    }
    
    response.writeHead(responseCode, { 'Content-Type': contentType });
    response.write(content);
    response.end();
    
    console.log('\n' + responseCode + '\nDone serving ' + pathname);
    
}).listen(port);

console.log('\nListening on port ' + port);
