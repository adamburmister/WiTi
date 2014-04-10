var getmac = require('getmac');
var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');

exports.index = function(req, res) {

  // ... and the corresponding MAC address
  require('getmac').getMac(function(err, macAddress){
    if (err) {
      throw err; // There was no MAC address. That means it wasn't a LAN 
    }

    Employee.findOne({ macAddress: macAddress }, function (err, employee) {
      if (err) throw(err);
      
      if(!employee) {
        // We don't know this user. Redirect to joining page
        res.redirect('http://WiTi.local/join');
      } else {
        // We know this user. Redirect to timesheet
        res.redirect('http://WiTi.local/timesheet');
      }
    });

  });
}