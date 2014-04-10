var getmac = require('getmac');
var mongoose = require('mongoose');

exports.weekView = function(req, res, next, id) {
  require('getmac').getMac(function(err, macAddress){
    if (err) {
      throw err; // There was no MAC address. That means it wasn't a LAN 
    }

    var currentUser = Employee.findOne({ macAddress: macAddress });

    if(!currentUser) {
      // We don't know this user. Redirect to joining page
      
    } else {
      // We know this user. Redirect to timesheet

    }

    res.render('index', { title: 'Welcome', macAddress: macAddress, ipAddress: ipAddress });
  });
}