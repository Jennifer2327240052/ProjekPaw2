// backend/seed.js
require('dotenv').config();
const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/angular_dashboard_db';

async function run() {
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB for seeding');

  const Student = require('./models/Student');
  const Teacher = require('./models/Teacher');
  const Bill = require('./models/Bill');
  const Schedule = require('./models/Schedule');

  // sample data
  const students = [
    { name: 'Giselle Naomi Sutanto', grade: 10, email: 'giselle@example.com', phone: '081234567890', level: 'Intermediate', status: 'ACTIVE', dob: '2008-05-12', registrationDate: '2023-08-01', type: 'Regular', school: 'SMA 1', user: 'admin' },
    { name: 'Mike Celiano Sutanto', grade: 8, email: 'mike@example.com', phone: '081298765432', level: 'Beginner', status: 'ACTIVE', dob: '2010-02-21', registrationDate: '2024-01-15', type: 'Regular', school: 'SMP 2', user: 'admin' }
  ];

  const teachers = [
    { name: 'Herna Marlindawati', dob: '1985-04-10', phone: '081300011122', email: 'herna@example.com', subject: 'English', education: 'S1', position: 'Teacher', user: 'admin' },
    { name: 'Meiliana Tirtadjaya', dob: '1982-09-30', phone: '081300022233', email: 'meiliana@example.com', subject: 'Math', education: 'S1', position: 'Teacher', user: 'admin' }
  ];

  const bills = [
    { student: 'Giselle Naomi Sutanto', price: 150000, month: '2025-12', status: 'PAID' },
    { student: 'Mike Celiano Sutanto', price: 150000, month: '2025-12', status: 'UNPAID' }
  ];

  const schedules = [
    { day: 'Monday', time: '16:00', teacher: 'Herna Marlindawati', student: 'Giselle Naomi Sutanto' },
    { day: 'Wednesday', time: '17:00', teacher: 'Meiliana Tirtadjaya', student: 'Mike Celiano Sutanto' }
  ];

  try {
    await Student.deleteMany({});
    await Teacher.deleteMany({});
    await Bill.deleteMany({});
    await Schedule.deleteMany({});

    const createdStudents = await Student.insertMany(students);
    const createdTeachers = await Teacher.insertMany(teachers);
    const createdBills = await Bill.insertMany(bills);
    const createdSchedules = await Schedule.insertMany(schedules);

    console.log('Seed complete:', {
      students: createdStudents.length,
      teachers: createdTeachers.length,
      bills: createdBills.length,
      schedules: createdSchedules.length
    });
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
