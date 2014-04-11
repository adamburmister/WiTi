var arp = require('node-arp');
var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');

exports.index = function(req, res) {
  var ipAddress = req.headers['x-real-ip'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

  arp.getMAC(ipAddress, function(err, macAddress) {
    if (!err) {
      console.log(err);
      throw err;
    }

    console.log('Client MAC:', macAddress);

    Employee.findOne({ macAddress: macAddress }, function (err, employee) {
      if (err) throw(err);
      
      if(!employee) {
        // We don't know this user. Redirect to joining page
        res.redirect('/join');
      } else {
        // We know this user. Redirect to timesheet
        res.redirect('/timesheet');
      }
    });
  });

}