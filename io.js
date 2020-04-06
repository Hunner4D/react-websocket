var io = require('socket.io')();

// Object to track connected sockets
var players = {};

// Listen for new connections from clients (socket)
io.on('connection', function(socket) {

  socket.on('add-circle', function(data) {
    io.emit('add-circle', data);
  });

  socket.on('clear-display', function() {
    io.emit('clear-display');
  });

  socket.on('register-player', function(initials) {
    players[socket.id] = initials;
    io.emit(
      'update-player-list',
      Object.values(players)
    );
  });
  
  socket.on('disconnect', function() {
    delete players[socket.id];
    io.emit(
      'update-player-list',
      Object.values(players)
    );
  });

});

module.exports = io;