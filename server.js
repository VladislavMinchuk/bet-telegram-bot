const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || '0.0.0.0';

const handleRequest = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    fs.readFile('./home.html', null, (error, data) => {
        if (error) {
            response.writeHead(404);
            respone.write('file not found');
        } else {
            response.write(data);
        }
        response.end();
    });
};

http.createServer(handleRequest).listen(PORT, HOST, () => {
  console.log('Listening on port %d', PORT);
}); 
