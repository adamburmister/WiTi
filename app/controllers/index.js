var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');

exports.index = function(req, res) {
  var ipAddress = req.headers['x-real-ip'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

  Employee.findOne({ ipAddress: ipAddress }, function (err, employee) {
    if (err) throw(err);
    
    if(!employee) {
      // We don't know this user. Redirect to joining page
      res.redirect('/join');
    } else {
      // We know this user. Redirect to timesheet
      res.redirect('/timesheet');
    }
  });

}