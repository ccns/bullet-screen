var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/assets'));

var n = 0;
io.on('connection', function(socket){
  n++;
  console.log('a user connected, current users: ' + n);
  io.emit('online users', n);
  socket.on('disconnect', function(){
    n--;
    console.log('user disconnected, current users: ' + n);
    io.emit('online users', n);
  });

  socket.on('chat message', function(msg){
    msg.name = msg.name == '' ? 'Anonymous' : msg.name;
    console.log(msg.name + ' says: ' + msg.msg);
    io.emit('chat message', msg);
  });

  socket.on('welcome back', function(msg){
    console.log(msg.name + ' is back!');
    io.emit('welcome back', msg);
    io.emit('chat message', {name: '@@@', msg: msg.name + ' 回來了！歡迎他！'});
  });
});

var port = process.env.PORT || 3000;
http.listen(port, function(){
  console.log('listening on *:' + port);
});
