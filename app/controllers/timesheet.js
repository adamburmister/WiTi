var dhcpLease = require('../lib/dhcpLease')
var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');

exports.weekView = function(req, res) {
  var ipAddress = req.headers['x-real-ip'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

  dhcpLease.getMac(ipAddress, function(err, macAddress) {
    if(!macAddress) {
      console.log(err);
      res.send("No MAC address was found for your IP address");
    } else {
      console.log("Found MAC", macAddress, "for", ipAddress);
      
      Employee.findOne({ macAddress: macAddress }, function (err, employee) {
        if (err) throw(err);
        
        if(!employee) {
          // We don't know this user. Redirect to joining page
          res.redirect('/join');
        } else {
          res.render('timesheet/week', { title: 'Welcome', employee: employee });
        }
      });
    }
  });

}