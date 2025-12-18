const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  day: String,
  time: String,
  teacher: String,
  student: String
}, { timestamps: true });

module.exports = mongoose.model('Schedule', ScheduleSchema);
