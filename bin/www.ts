#!/usr/bin/env node

/**
 * Module dependencies.
 */
import app from '../src/app';
import http from 'http';

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3100');
// app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app.callback());

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number.
 */
function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: Error) {
  console.log('HTTP server "error"', error);
  throw error;
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const address = server.address();
  const bind = typeof address === 'string'
    ? 'pipe ' + address
    : address.port;
  console.log(`Listening on http://localhost:${bind}`)
}
