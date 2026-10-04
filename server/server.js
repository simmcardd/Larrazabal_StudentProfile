require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey_larrazabal_2026';

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Database connection error:', err);
  else console.log('Connected to SQLite database.');
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      student_id TEXT PRIMARY KEY,
      email TEXT UNIQUE,
      password TEXT,
      full_name TEXT,
      course TEXT,
      year_level TEXT,
      about_me TEXT,
      skills TEXT,
      photo TEXT
    )
  `);

  db.get("SELECT COUNT(*) AS count FROM students", [], (err, row) => {
    if (row && row.count === 0) {
      const hashedPassword = bcrypt.hashSync("password123", 10);
      db.run(`
        INSERT INTO students (student_id, email, password, full_name, course, year_level, about_me, skills, photo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        "20240030711",
        "ivan@xu.edu.ph",
        hashedPassword,
        "Ivan Larrazabal",
        "BS Information Technology",
        "2nd Year",
        "I am a second-year BS Information Technology student at Xavier University, balancing my academic pursuits with multi-venture entrepreneurship and Shotokan karate athletics.",
        "Entrepreneurship, Web Development, Social Media Management, Shotokan Karate, Event Organizing",
        "karts.jpeg"
      ]);
      console.log('Test student account seeded (20240030711 / password123).');
    }
  });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied. Token missing.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token.' });
    req.user = user;
    next();
  });
}

app.post('/api/login', (req, res) => {
  const { studentId, password } = req.body;
  if (!studentId || !password) {
    return res.status(400).json({ error: 'Student ID/Email and Password are required.' });
  }

  db.get(
    "SELECT * FROM students WHERE student_id = ? OR email = ?",
    [studentId, studentId],
    (err, user) => {
      if (err) return res.status(500).json({ error: 'Database error.' });
      if (!user) return res.status(401).json({ error: 'Invalid student ID or password.' });

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) return res.status(401).json({ error: 'Invalid student ID or password.' });

      const token = jwt.sign({ studentId: user.student_id }, JWT_SECRET, { expiresIn: '2h' });
      res.json({ message: 'Login successful', token, studentId: user.student_id });
    }
  );
});

app.get('/api/profile', authenticateToken, (req, res) => {
  db.get(
    "SELECT student_id, full_name, course, year_level, about_me, skills, photo FROM students WHERE student_id = ?",
    [req.user.studentId],
    (err, user) => {
      if (err || !user) return res.status(500).json({ error: 'Unable to retrieve profile data.' });
      res.json({
        studentId: user.student_id,
        fullName: user.full_name,
        course: user.course,
        yearLevel: user.year_level,
        aboutMe: user.about_me,
        skills: user.skills,
        photo: user.photo
      });
    }
  );
});

app.put('/api/profile', authenticateToken, (req, res) => {
  const { fullName, course, yearLevel, aboutMe, skills } = req.body;
  const studentId = req.user.studentId;

  const query = `
    UPDATE students 
    SET full_name = ?, course = ?, year_level = ?, about_me = ?, skills = ?
    WHERE student_id = ?
  `;

  db.run(query, [fullName, course, yearLevel, aboutMe, skills, studentId], function(err) {
    if (err) {
      console.error("Database update error:", err);
      return res.status(500).json({ error: "Failed to update database" });
    }
    res.json({ message: "Profile updated successfully" });
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on http://0.0.0.0:${PORT}`);
});