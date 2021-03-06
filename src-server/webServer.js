var fs = require('fs'),
    http = require('http'),
    path = require("path");

var database = require('./database');

// HTTP Server to accept incomming WEB from users
const webServer = http.createServer(function(request, response) {
    console.log(
        'WEB Connected: ' +
        request.socket.remoteAddress + ':' +
        request.socket.remotePort + ' ' +
        request.method + ' ' +
        request.url
    );

    function file(path) {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.end(fs.readFileSync('dist/' + path, 'utf8'));
    }

    // TODO: На каком-нибудь express это можно сделать немного проще, но у нас мало файлов в проекте, так что можно обойтись.
    switch (request.url) {
        case '/':
        case '/index.html':
            file('index.html');
            break

        case '/logs':
            file('logs.html');
            break

        case '/main.bundle.js':
            file('main.bundle.js');
            break

        case '/pages':
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
            response.writeHead(200, {'Content-Type': 'application/json'});

            const pagesFolder = './pages/';

            fs.readdir(pagesFolder, (err, files) => {
                const pages = files.map(n => {return path.parse(n).name});
                response.end(JSON.stringify(pages));
            });

            break;

        default:
            if(request.url.startsWith('/page/')) {
                const name = request.url.split('/')[2];
                console.log("page url:", name);

                console.log("method:", request.method);

                response.setHeader('Access-Control-Allow-Origin', '*');
                response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

                switch (request.method) {
                    case 'GET':
                        try {
                            const page_file = fs.readFileSync(`./pages/${name}.json`, 'utf8');
                            response.writeHead(200, {'Content-Type': 'application/json'});
                            response.end(page_file);
                        }
                        catch(e) {
                            response.writeHead(404, {'Content-Type': 'application/json'});
                            response.end('{"error": "File not found", "$childs": []}');
                        }
                        break;
                    case 'OPTIONS':
                        response.writeHead(200, {'Content-Type': 'application/json'});
                        response.end('');
                        break;
                    case 'POST':
                        let abody = [];

                        request.on('data', (chunk) => {
                            abody.push(chunk);
                        });
                        request.on('end', () => {
                            const sbody = Buffer.concat(abody).toString();

                            fs.writeFileSync(`./pages/${name}.json`, sbody);

                            response.writeHead(200, {'Content-Type': 'application/json'});
                            response.end(sbody);
                        });

                        break;
                    default:
                        response.writeHead(405, {'Content-Type': 'application/json'});
                        response.end('"Method is not allowed"');
                }


                return;
            } else if(request.url.startsWith('/logs/')) {

                switch (request.method) {
                    case 'GET':
                        const parts = request.url.split('/').slice(2);
                        const hwid = parts[0];

                        response.setHeader('Access-Control-Allow-Origin', '*');
                        response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
                        response.writeHead(200, {'Content-Type': 'application/json'});


                        if(parts.length == 1) {
                            // Список полей событий
                            // const logs_list = database.logsList(hwid);


                            // console.log("Read logs list", hwid, logs_list);

                            response.end(JSON.stringify(database.logsList(hwid)));
                            return;
                        } else {
                            // Чтение событий для выбранного поля
                            const field = parts[1];
                            console.log("Read logs", hwid, field);
                            response.end(JSON.stringify(database.getLogs(hwid, field)));
                            return;
                        }
                        break;
                    case 'OPTIONS':
                        response.writeHead(200, {'Content-Type': 'application/json'});
                        response.end('');
                        break;
                    default:
                        response.writeHead(405, {'Content-Type': 'application/json'});
                        response.end('"Method is not allowed"');
                }


                return;
            } else if(request.url.startsWith('/series/')) {

                switch (request.method) {
                    case 'GET':
                        const parts = request.url.split('/').slice(2);
                        const hwid = parts[0];

                        response.setHeader('Access-Control-Allow-Origin', '*');
                        response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
                        response.writeHead(200, {'Content-Type': 'application/json'});


                        if(parts.length == 1) {
                            // Список полей событий
                            // const logs_list = database.logsList(hwid);


                            // console.log("Read logs list", hwid, logs_list);

                            response.end(JSON.stringify(database.seriesList(hwid)));
                            return;
                        } else {
                            // Чтение серий для выбранного поля
                            const field = parts[1];
                            console.log("Read series", hwid, field);
                            response.end(JSON.stringify(database.series(hwid, field)));
                            return;
                        }
                        break;
                    case 'OPTIONS':
                        response.writeHead(200, {'Content-Type': 'application/json'});
                        response.end('');
                        break;
                    default:
                        response.writeHead(405, {'Content-Type': 'application/json'});
                        response.end('"Method is not allowed"');
                }


                return;
            }
            // console.log("url:", request.url);

            response.writeHead(404, {
                'Content-Type': 'text/html'
            });
            response.end('Not found');
    }

    // const body = "hello sushka";
    // response.writeHead(200, {
    // 	"Content-Type": "text/plain",
    // 	"Content-Length": Buffer.byteLength(body)
    // });
    // response.write(body);
    // response.end();
    // this.close();
});

module.exports = webServer;
