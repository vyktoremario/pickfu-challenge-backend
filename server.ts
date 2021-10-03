import app from './app';
const debug = require('debug')('pickfu-challenge:server');
import webSocket from 'websocket';
import Answer from './models/answerSchema';
import { getUniqueId } from './utils/getUniqueId';
const http = require('http');
const mongoose = require('mongoose');

const webSocketServer = webSocket.server

const clients: Record<string, any> = {};
const port = normalizePort(process.env.PORT || '8000');

app.set('port', port);
const server = http.createServer(app);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true  })
         .then(() => console.log('DB is Connected!...'))
         .catch((err: any) => console.log(err));

server.listen(port);

const wsServer = new webSocketServer ({
  httpServer: server
})


wsServer.on('request', (request) => {
  const uniqueID = getUniqueId();
  const connection = request.accept(undefined, request.origin);

  clients[uniqueID] = connection;
  connection.on('message', async (message: any) => {
    try {
      console.log(clients);
    for (const key in clients) {
        const answer = await Answer.create(JSON.parse(message.utf8Data));
        clients[key].sendUTF(JSON.stringify(answer));
      }
    } catch (error) {
      console.log(error)
    }
    });
})


server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
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

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

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
  var addr = server.address();
  console.log('listening on port ' + addr.port)
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
