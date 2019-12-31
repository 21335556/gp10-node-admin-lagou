var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

let mySocket = null

io.on('connection', function (socket) {
  // socket.on('receive', (msg) => {
    // socket.broadcast.emit('message', msg);
  // })

  mySocket = socket
});

server.listen(8088, 'localhost')

module.exports = mySocket