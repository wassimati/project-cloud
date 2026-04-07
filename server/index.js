const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MySQL
// We use environment variables so Docker can inject the right credentials
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'testdb'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Successfully connected to MySQL database.');
    // Create a simple table if it doesn't exist
    db.query(`CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))`);
  }
});

// The POST endpoint
app.post('/api/submit', (req, res) => {
  const { name } = req.body;
  
  db.query('INSERT INTO users (name) VALUES (?)', [name], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error inserting into database');
    }
    res.status(200).json({ message: 'Data saved successfully!', id: result.insertId });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));