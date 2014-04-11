var arp = require('node-arp');
var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');
var sys = require('sys')
var exec = require('child_process').exec;

exports.index = function(req, res) {
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
var ipAddress = req.headers['x-real-ip'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

  arp.getMAC(ipAddress, function(err, macAddress) {
    if (!err) {
      console.log(err);
      throw err;
    }

    res.render('join/verify', { title: 'Register' });
  });
}

exports.verifyCode = function(req, res) {
  var ipAddress = req.headers['x-real-ip'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

  arp.getMAC(ipAddress, function(err, macAddress) {
    if (!err) {
      console.log(err);
      throw err;
    }

    var inviteCode = req.param('inviteCode');
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
  });
} 