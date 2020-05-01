'use strict';

const app = require('../src/app');
const http = require('http');
const debug = require('debug')('nodejs:server');
const port = normalizePort(process.env.PORT || '3000');
const server = http.createServer(app);

var graylog2 = require("graylog2");

var logger = new graylog2.graylog({
    servers: [
        { host: "127.0.0.1", port: 12201 }
    ],
    facility: "Node.js",
});

logger.on("error", function(error) {
    console.error("Error while trying to write to graylog2:", error);
});

setTimeout(() => {
    // logger.log("What we've got here is...failure to communicate");
    logger.log("Hello i'm a phz", {
        cool: 'beans',
        test: {
           yoo: 123,
        }
    });
    // logger.notice("What we've got here is...failure to communicate");

    console.log('logged?');
    // process.exit();
}, 2000);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

console.log("API rodando");

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port => 0) {
        return port;
    }

    return false;
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ?
                'pipe ' + addr :
                'port ' + addr.port;
    debug('Listening on ' + bind);
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
                        'Pipe ' + port:
                        'Port ' + port;

    switch (error.code) {
        case 'EACCESS':
            console.error(bind + 'requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
