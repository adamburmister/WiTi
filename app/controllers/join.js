var dhcpLease = require('../lib/dhcpLease')
var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');
var sys = require('sys')
var exec = require('child_process').exec;

exports.index = function(req, res) {
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
        
        if(employee) {
          // We don't know this user. Redirect to joining page
          res.redirect('/timesheet');
        } else {
          res.render('join/index', { title: 'Join' });
        }
      });
    }
  });
}

exports.verify = function(req, res) {
  res.render('join/verify', { title: 'Register' });
}

exports.verifyCode = function(req, res) {
  var ipAddress = req.headers['x-real-ip'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

  var inviteCode = req.param('inviteCode');
  if(!inviteCode) {
    res.send({ success: false });
  } else {
    console.log('Verifying invite code', inviteCode);

    dhcpLease.getMac(ipAddress, function(err, macAddress) {
      if(!macAddress) {
        console.log(err);
        res.send("No MAC address was found for your IP address");
      } else {
        console.log("Found MAC", macAddress, "for", ipAddress);

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
              exec("./untrack.sh " + ipAddress);
              res.send({ success: true });
            });
          } else {
            console.log('Invite code not found');
            res.send({ success: false });
          }
        });

      }
    });
  }
} 