module.exports = (app) => {
  const Student = require('../models/student.model');
  const Teacher = require('../models/teacher.model');
  const Schedule = require('../models/schedule.model');
  const Bill = require('../models/bill.model');

  app.get('/api/dashboard/summary', async (req, res) => {
    try {
      const totalStudents = await Student.countDocuments();
      const totalTeachers = await Teacher.countDocuments();
      const totalSchedules = await Schedule.countDocuments();
      const totalBills = await Bill.countDocuments();

      res.json({
        students: totalStudents,
        teachers: totalTeachers,
        schedules: totalSchedules,
        bills: totalBills
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
};
