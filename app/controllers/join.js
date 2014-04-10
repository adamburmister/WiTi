var getmac = require('getmac');
var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');

exports.index = function(req, res) {
  require('getmac').getMac(function(err, macAddress){
    if (err) {
      throw err; // There was no MAC address. That means it wasn't a LAN 
    }

    Employee.findOne({ macAddress: macAddress }, function (err, employee) {
      if (err) throw(err);
      
      if(employee) {
        // We don't know this user. Redirect to joining page
        res.redirect('/timesheet');
      } else {
        res.render('join/index', { title: 'Join' });
      }
    });
  });

}

exports.verify = function(req, res) {
  res.render('join/verify', { title: 'Register' });
}

exports.verifyCode = function(req, res) {
  res.send({ success: true });
} 