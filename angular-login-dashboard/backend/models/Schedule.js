const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    teacher: {
      type: String,
      required: true,
    },
    student: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedule", ScheduleSchema);
