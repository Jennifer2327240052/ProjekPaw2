// backend/tests/cli-test.js
// Simple Node CLI script to POST/GET against the running API server.
// Usage: node tests/cli-test.js

const http = require('http');
const { URL } = require('url');

const BASE = process.env.BASE_URL || 'http://127.0.0.1:3000';

function request(method, path, body) {
  return new Promise((resolve, reject) => {
    try {
      const url = new URL(path, BASE);
      const opts = {
        method,
        hostname: url.hostname,
        port: url.port,
        path: url.pathname + url.search,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const req = http.request(opts, (res) => {
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          const status = res.statusCode || 0;
          try {
            const json = data ? JSON.parse(data) : null;
            if (status >= 200 && status < 300) return resolve(json);
            return reject(new Error(`HTTP ${status}: ${JSON.stringify(json)}`));
          } catch (err) {
            if (status >= 200 && status < 300) return resolve(data);
            return reject(new Error(`HTTP ${status}: ${data}`));
          }
        });
      });

      req.on('error', (err) => reject(err));
      if (body) req.write(JSON.stringify(body));
      req.end();
    } catch (err) {
      reject(err);
    }
  });
}

async function run() {
  console.log('Running API smoke test against', BASE);

  try {
    // Create student
    const studentPayload = {
      name: 'CLI Test Student',
      grade: 11,
      email: 'cli.student@example.com',
      address: 'Test Address',
      phone: '0812000111',
      level: 'Intermediate',
      status: 'ACTIVE',
      dob: '2007-07-07',
      registrationDate: '2025-12-18',
      type: 'Regular',
      school: 'CLI High'
    };

    const createdStudent = await request('POST', '/api/students', studentPayload);
    console.log('Created student:', createdStudent && createdStudent._id ? createdStudent._id : createdStudent);

    // Create teacher
    const teacherPayload = {
      name: 'CLI Test Teacher',
      dob: '1980-01-01',
      phone: '0812000222',
      email: 'cli.teacher@example.com',
      address: 'Teacher Addr',
      education: 'S1',
      position: 'Teacher'
    };

    const createdTeacher = await request('POST', '/api/teachers', teacherPayload);
    console.log('Created teacher:', createdTeacher && createdTeacher._id ? createdTeacher._id : createdTeacher);

    // GET lists
    const students = await request('GET', '/api/students');
    console.log('Students count:', Array.isArray(students) ? students.length : 'unexpected', '\nSample:', students && students[0] ? students[0].name : students);

    const teachers = await request('GET', '/api/teachers');
    console.log('Teachers count:', Array.isArray(teachers) ? teachers.length : 'unexpected', '\nSample:', teachers && teachers[0] ? teachers[0].name : teachers);

    // Cleanup: delete created entries if _id present
    if (createdStudent && createdStudent._id) {
      await request('DELETE', `/api/students/${createdStudent._id}`);
      console.log('Deleted test student', createdStudent._id);
    }
    if (createdTeacher && createdTeacher._id) {
      await request('DELETE', `/api/teachers/${createdTeacher._id}`);
      console.log('Deleted test teacher', createdTeacher._id);
    }

    console.log('API smoke test completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('API smoke test failed:', err && err.message ? err.message : err);
    process.exit(2);
  }
}

run();
