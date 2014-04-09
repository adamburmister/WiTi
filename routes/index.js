var express = require('express');
var router = express.Router();
var getmac = require('getmac');

/* GET home page. */
router.get('/', function(req, res) {
  // Fetch the computer's mac address
  require('getmac').getMac(function(err, macAddress){
    if (err) {
      throw err;
    }
    res.render('index', { title: macAddress });
  });
});

module.exports = router;
