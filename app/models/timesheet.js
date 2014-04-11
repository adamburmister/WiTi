var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Timesheet
var timesheetSchema = new Schema({
  employee_id: {type: Schema.Types.ObjectId, ref: "Employee"},
  timestamp: Date,
  in_times: [Date],
  out_times: [Date]
});

var TimeSheet = mongoose.model('TimeSheet', timesheetSchema);