const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  student: String,
  price: Number,
  month: String,
  status: String
}, { timestamps: true });

module.exports = mongoose.model('Bill', BillSchema);
