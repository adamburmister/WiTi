var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Employee
var employeeSchema = new Schema({
  name: String,
  macAddress: String,
  phone: String,
  inviteCode: Number
});

var Employee = mongoose.model('Employee', employeeSchema);

