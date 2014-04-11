$(document).ready(function() {

  var inviteInput = $("input[type=text"),
      inputBg = $("#inputBg"),
      inputBgWidth = 420,
      inputCellWidth = 138;

  inviteInput.focus();

  inviteInput.on("keyup", function(event) {
    var val = inviteInput.val();

    if (val.length <= 4) {
      $("#invalidCode").hide();
      inputBg.css({"background-position": ( -inputBgWidth + (inputCellWidth * (val.length - 1)) + "px 0px")});
    } else if(val.length == 4) {
      $.post("/join/verify", { inviteCode: inviteInput.val() }, function(resp) {
        if(resp.success) {
          $("#inviteForm").hide();
          $("#done").show();
          setTimeout(function() {
            location.href='/';
          }, 2000);
        } else {
          $("#invalidCode").show();
          $("#message").html("Sorry, your code was invalid.<br>Try again.");
        }
      });
    }
  });

});