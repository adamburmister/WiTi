// Load the .env file with our config
var dotenv = require('dotenv');
var envPath = __dirname + '/../.env';
dotenv._getKeysAndValuesFromEnvFilePath(envPath);
dotenv._setEnvs();

var fs = require('fs');

var leasePath = process.env.DHCP_LEASE_FILE_PATH || "/var/lib/dhcp/dhcpd.leases";

exports.getMac = function(ipAddress, next) {
  console.log("Looking up MAC for", ipAddress, 'in', leasePath);
  var data = fs.readFile(leasePath, function(err, data) {
    if(err) {
      throw err;
    }

    var content = data.toString();
    var leaseRegex = new RegExp("lease " + ipAddress + " \{[^}]*\}", "i");
    var leaseBlock = content.match(leaseRegex)[0];

    var macRegex = new RegExp("hardware ethernet ((?:[a-z0-9]{2}[:\-]){5}[a-z0-9]{2});", "i");
    var macAddress = leaseBlock.match(macRegex)[1];

    console.log(content, matches);

    if(!matches) {
      next("MAC not found", null);
    } else {
      next(null, matches[1]);
    }
  })
}