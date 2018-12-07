"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-console */
/**
 * Module dependencies.
 */
console.log('=====SERVER-STARTING======ENVS================');
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`NODE_APP_INSTANCE: ${process.env.NODE_APP_INSTANCE}`);
console.log('CWD: ', process.cwd());
console.log('PID: ', process.pid);
console.log('==============================================');
require("./unCaughtException");
const config_1 = require("config");
const http = require("http");
const app_1 = require("../app");
console.log('morgan: ', config_1.get('app.morgan'));
/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(config_1.get('app.port') || '3000');
app_1.app.set('port', port);
/**
 * Create HTTP server.
 */
const server = http.createServer(app_1.app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const portInt = parseInt(val, 10);
    if (isNaN(portInt)) {
        // named pipe
        return +val;
    }
    if (portInt >= 0) {
        // portInt number
        return portInt;
    }
    return null;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
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
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('\n');
    if (config_1.get('app.logging')) {
        console.log('===========================');
        console.log('> Listening on ' + bind + '   ');
        console.log('===========================');
    }
}
