const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/english_course');

app.use(cors());
app.use(express.json());

app.use('/api/schedules', require('./routes/schedule'));

app.listen(5000, () => console.log('Server running on port 5000'));
