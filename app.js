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
    io.emit('chat message', {name: '@@@', msg: msg.name + ' 回來了！歡迎他！', shoot: true});
  });

  socket.on('aa', function(msg){
    if (msg.cmd) {
      console.log(msg.name + ' send ' + msg.cmd + '!');
      io.emit('aa', msg);
      io.emit('chat message', {name: '@@@', msg: msg.name + ' 送出了超大型' + cmdToText(msg.cmd) + '!', shoot: false});
    }
  });

  socket.on('firework', function(msg){
    var length = Math.floor(Math.random()*15 + 5);
    var f = '‧:*‧°☆*';
    var fire = '';
    for (var i=0; i<length; i++) {
      fire = fire + f;
    }
    console.log(msg.name + ' send firework! length: ' + length);
    io.emit('firework', {name: msg.name, fire: fire});
  });
});

var port = process.env.PORT || 3000;
http.listen(port, function(){
  console.log('listening on *:' + port);
});

function cmdToText(cmd){
  switch(cmd){
  case 'miku':
    return '初音';
  case 'shinobu':
    return '小忍';
  case 'kotori':
    return '小鳥醬';
  case 'niconicodesu':
    return '妮可醬';
  case 'mami':
    return '麻美學姐';
  }
}
