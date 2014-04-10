var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Timesheet
var timesheetSchema = new Schema({
  employee_id: {type: Number, ref: "Employee"},
  date: Date,
  in_times: [Date],
  out_times: [Date]
});

var Timesheet = mongoose.model('Timesheet', timesheetSchema);

