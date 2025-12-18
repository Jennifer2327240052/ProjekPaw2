const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: String,
  phone: String,
  email: String,
  address: String,
  subject: String,
  education: String,
  position: String,
  user: String
}, { timestamps: true });

module.exports = mongoose.model('Teacher', TeacherSchema);
