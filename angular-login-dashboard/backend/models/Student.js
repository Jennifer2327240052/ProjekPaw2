const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  grade: Number,
  email: String,
  address: String,
  phone: String,
  level: String,
  status: String,
  dob: String,
  registrationDate: String,
  type: String,
  school: String,
  user: String
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
