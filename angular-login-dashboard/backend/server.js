// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
// allow CORS from any origin and log requests
app.use(cors({ origin: true }));
app.use(express.json());

// simple request logger to help debug network/CORS issues
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.originalUrl);
  next();
});

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/angular_dashboard_db';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// models
const Student = require('./models/Student');
const Teacher = require('./models/Teacher');
const Bill = require('./models/Bill');
const Schedule = require('./models/Schedule');

// routes
app.use('/api/students', require('./routes/students'));
app.use('/api/teachers', require('./routes/teachers'));
app.use('/api/bills', require('./routes/bills'));
app.use('/api/schedules', require('./routes/schedules'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API server running on http://localhost:${port}`));

// global error handlers to prevent crashes on unhandled rejections
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
});

// Express error handler
// Express error handler with more detail for JSON responses
app.use((err, req, res, next) => {
  console.error('Express error:', err && err.stack ? err.stack : err);
  const status = err && err.status ? err.status : 500;
  const message = err && err.message ? err.message : 'Internal server error';
  // send JSON if request accepts JSON (most API calls)
  if (req.accepts('json')) return res.status(status).json({ message });
  res.status(status).type('txt').send(message);
});
