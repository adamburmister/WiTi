var getmac = require('getmac');
var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');
var sys = require('sys')
var exec = require('child_process').exec;

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
  // Verified employees can access the internet as normal
  function puts(error, stdout, stderr) {sys.puts(stdout)}
  exec("./allow-access.sh " + macAddress, puts);

  res.send({ success: true });
} 