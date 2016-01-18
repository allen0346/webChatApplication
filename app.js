var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var ejs = require('ejs');
var fs = require('fs');


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use('/static', express.static(__dirname + '/views'));
// to get username
app.use(bodyParser.urlencoded({ extended: true }));

var clients = [];
var unList = [];
var un;

app.post('/chat.ejs', function(req, res) {
  un = req.body.username;
  unList.push(un);
  // res.sendFile(__dirname + '/public/chat.ejs');
  res.render('chat',{ username : un });
});

app.get('/', function (req, res) {
  // res.sendFile(__dirname + '/views/index.html');
  res.render('index');
});


/*
.broadcast.emit: echo globally (all clients) except the current socket.
io.emit will invoke event of all sockets;
*/

io.on('connection', function(socket){
  io.emit('user joined',{
    username: unList
  });

  socket.username = un;
  socket.on('disconnect', function(){
    console.log(socket.username + ' disconnected');
  });

  clients[socket.id] = un;
  // socket.broadcast.emit('user joined', {
  //   username: socket.username,
  // });

  socket.on('chat message', function(msg){
    // console.log(socket.username);
    socket.broadcast.emit('receive message', {
      username: socket.username,
      message:msg
    });
  });

});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
