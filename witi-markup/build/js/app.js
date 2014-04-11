$(document).ready(function() {

  var inviteInput = $("input[type=text"),
      inputBg = $("#inputBg"),
      counter = 1;

  inviteInput.focus();

  
  inviteInput.on("keyup", function(event) {
    counter++;
    if (inviteInput.val().length < 4 && counter <= 4) {
      inputBg.css({"background-position": ("+=138px 0px")});
    }
  });

});