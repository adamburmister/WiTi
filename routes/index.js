var dotenv = require('dotenv');
dotenv.load();

var express = require('express');
var router = express.Router();
var getmac = require('getmac');

var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOHQ_URL);

// var KnownMACAddress = mongoose.model('Known_MAC_Addresses', { 
//   MACAddress: String,
//   IPAddress: String,
// });

router.get('/', function(req, res) {
  // Get the IP address for the current request
  var ipAddress = req.headers['x-real-ip'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

  // ... and the corresponding MAC address
  require('getmac').getMac(function(err, macAddress){
    if (err) {
      throw err; // There was no MAC address. That means it wasn't a LAN 
    }

    // var q = { IPAddress: ipAddress, MACAddress: macAddress };
    // KnownMACAddress.count(q,
    //   function(err, hasExistingRecord) {
    //     if(err) {
    //       console.log('There was a problem checking the Mongo MAC address collection');
    //     }

    //     if(hasExistingRecord) {
    //       console.log('Found known MAC address');
    //     } else {
    //       new KnownMACAddress(q).save(function (err) {
    //         if(err) {
    //           console.log('There was an error saving a new MAC address');
    //         }
    //         console.log('New MAC address');
    //       });
    //     }
    //   }
    // );

    res.render('index', { title: 'Welcome', macAddress: macAddress, ipAddress: ipAddress });
  });
});

module.exports = router;
