var socket = io();
function log (message) {
   console.log(message);
}

// inform current client that a new user join to the chat room.
socket.on('user joined', function (data) {
  $('#userUlist').children().remove();
  for(i of data.username){
        $('#userUlist').append("<li>"+'<span>' + i +'</span>'+"</li>");
  }
  //  log(data.username + ' joined');
});

// send message!
$('form').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#messages').append("<li>"+'<span>' + $("#username").text()+': '+'</span>'+$('#m').val()+"</li>");
  $('#m').val('');
  // return false: force the page do not reload again
  return false;
});

socket.on('receive message', function (data) {
  $('#messages').append("<li>"+'<span>' + data.username + ':'+'</span>'+data.message+"</li>");
});


//sendPrivateMessage
$('#userUlist').on('click', 'li', function () {
  socket.emit('sendPM',{ to:$(this).text(), from:$("#username").text(), pm: 'test!!!!'  });
  // console.log($(this).text());
});

socket.on('receivePM',function(data){
  console.log(data);
  console.log("test gulp!!!")
});




(function($){
  $("#contentWraper").css("min-height", $(window).height());
})(jQuery);




(function(){
  $('.menu').click(function(){
    $('.sideNav').toggleClass('sideToggle');
    $('.rightDiv').toggleClass('rightToggle');
    $('.menu').toggleClass('menuToggle');
  });
})();
