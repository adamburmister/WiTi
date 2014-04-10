var getmac = require('getmac');
var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');

exports.weekView = function(req, res) {
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
        res.render('timesheet', { title: 'Welcome', employee: employee });
      }
    });
  });
}