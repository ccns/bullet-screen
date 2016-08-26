var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/assets'));

io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('chat message', {name: '@@@', msg: '歡迎光臨，輸入暱稱(限英文及數字10字內)及留言內容即可留言(ゝ∀･)'});

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    msg.name = msg.name == '' ? 'Anonymous' : msg.name;
    console.log(msg.name + ' says: ' + msg.msg);
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
