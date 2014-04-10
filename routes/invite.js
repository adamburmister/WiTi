var accountSid = 'AC32a3c49700934481addd5ce1659f04d2';
var authToken = '';

var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);
 
var msg = "Hi Adam! You've been invited to the 'WiTi' wireless network on your smart-phone, visit http://WiTi/ and use the joining code '1234'.";

client.sms.messages.create({
    to:'+14153210505',
    from:'TWILIO_NUMBER',
    body: msg
}, function(error, message) {
    if (error) {
      console.log(error.message);
    }
  }
);