var getmac = require('getmac');
var mongoose = require('mongoose');
// var Employee = mongoose.model('Employee');

exports.index = function(req, res, next, id) {
  // Get the IP address for the current request
  var ipAddress = req.headers['x-real-ip'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

  console.log('homepage');

  // ... and the corresponding MAC address
  require('getmac').getMac(function(err, macAddress){
    if (err) {
      throw err; // There was no MAC address. That means it wasn't a LAN 
    }

    var currentUser; //= Employee.findOne({ macAddress: macAddress });

    if(!currentUser) {
      // We don't know this user. Redirect to joining page

    } else {
      // We know this user. Redirect to timesheet

    }

    res.render('index', { title: 'Welcome', macAddress: macAddress, ipAddress: ipAddress });
  });
}
