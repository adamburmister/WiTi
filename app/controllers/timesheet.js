var arp = require('node-arp');
var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');

exports.weekView = function(req, res) {
  var ipAddress = req.headers['x-real-ip'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

  arp.getMAC(ipAddress, function(err, macAddress) {
    if (!err) {
      console.log(err);
      throw err;
    }

    Employee.findOne({ macAddress: macAddress }, function (err, employee) {
      if (err) throw(err);
      
      if(!employee) {
        // We don't know this user. Redirect to joining page
        res.redirect('/join');
      } else {
        res.render('timesheet/week', { title: 'Welcome', employee: employee });
      }
    });
  });
}