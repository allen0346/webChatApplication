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
// for userList that show on the interface
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

var remove = function (name){
  var index = unList.indexOf(name);
  unList.splice(index, 1);
  delete clients[name];
};


/*
.broadcast.emit: echo globally (all clients) except the current socket.
io.emit will invoke event of all sockets;
*/

io.on('connection', function(socket){
  socket.username = un;
  clients[socket.username] = socket;
  io.emit('user joined',{
    username: unList
  });
  socket.on('disconnect', function(){
    console.log(socket.username + ' disconnected');
    remove(socket.username);
    io.emit('user joined',{
      username: unList
    });
  });
  socket.on('chat message', function(msg){
    // console.log(socket.username);
    socket.broadcast.emit('receive message', {
      username: socket.username,
      message:msg
    });
  });

  socket.on('sendPM',function(data){
      // console.log(data);
      // socket.emit (send message to specific emit)
      clients[data.to].emit('receivePM',data);
  });

});

console.log(process.env.PORT);


// process.env.PORT is for the port that create by Heroku
http.listen(process.env.PORT ||3000, function(){
  console.log('listening on *:3000');
});
