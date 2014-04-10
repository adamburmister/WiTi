var getmac = require('getmac');
var mongoose = require('mongoose');
// var Employee = mongoose.model('Employee');

exports.index = function(req, res) {
  res.render('join/index', { title: 'Register' });
}

exports.verify = function(req, res) {
  res.render('join/verify', { title: 'Register' });
}

exports.verifyCode = function(req, res) {
  res.send({ success: true });
} 

  // require('getmac').getMac(function(err, macAddress){
  //   if (err) {
  //     throw err; // There was no MAC address. That means it wasn't a LAN 
  //   }

  //   var currentUser;// = Employee.findOne({ macAddress: macAddress });

  //   if(!currentUser) {
  //     // We don't know this user. Redirect to joining page
      
  //   } else {
  //     // We know this user. Redirect to timesheet

  //   }

  //   res.render('join', { title: 'Welcome' });
  // });