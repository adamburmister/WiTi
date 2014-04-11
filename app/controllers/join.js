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
  require('getmac').getMac(function(err, macAddress){
    res.render('join/verify', { title: 'Register', macAddress: macAddress });
  });
}

exports.verifyCode = function(req, res) {
  var inviteCode = req.param('inviteCode');
  var macAddress = req.param('macAddress');
  console.log('Verifying invite code', inviteCode);

  Employee.findOne({ inviteCode: +inviteCode }, function (err, employee) {
    if (err) throw(err);
    
    if(employee) {
      console.log('Invite code found', employee);

      employee.inviteCode = null;
      employee.macAddress = macAddress;
      employee.save();

      // Verified employees can access the internet as normal
      exec("./allow-access.sh " + macAddress, function puts(error, stdout, stderr) {
        sys.puts(stdout)
        res.send({ success: true });
      });
    } else {
      console.log('Invite code not found');
      res.send({ success: false });
    }
  });

} 