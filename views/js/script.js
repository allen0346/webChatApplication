var socket = io();
function log (message) {
   console.log(message);
}

// inform current client that a new user join to the chat room.
socket.on('user joined', function (data) {
  $('#userList').children().remove();
  for(i of data.username){
        $('#userList').append("<li>"+'<span>' + i +'</span>'+"</li>");
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




// $(window).load(function() {
  (function($){
    $("#contentWraper").css("min-height", $(window).height());
  })(jQuery);
// });



(function(){
  $('#menu').click(function(){
    $('.sideNav').toggleClass('sideToggle');
    $('.rightDiv').toggleClass('rightToggle');
  });
})();
