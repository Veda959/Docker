const express = require('express');
const sqlite3 = require('sqlite3').verbose();  // Import sqlite3
const bodyParser = require('body-parser');
const path = require('path');

// Initialize Express app
const app = express();
const port = 3000;

// Middleware to parse POST request data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParse.json());

const dbPath = path.join(__dirname, 'users.db'); // Modify this if needed

  // Initialize SQLite database (use path to local file)
const db = new sqlite3.Database(dbPath, (err) => {  // Database file
    if (err) {
    console.error('Error opening database:', err.message);
  } else{
  console.log('Connected to the SQLite database');
    }
});

// Create the 'users' table if it doesn't exist (for the first time)
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL
  )
`);



// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle the POST request to submit user data
app.post('/submit', (req, res) => {
  console.log(req.body); //Log the data received
  const { name, age } = req.body;
if(!name || !age) {
  return.res.status(400).send('Name and Age are required');
}
  // SQL query to insert data into the 'users' table
  const query = 'INSERT INTO users (name, age) VALUES (?, ?)';

  db.run(query, [name, age], function (err) {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data into database');
      return;
    }
    console.log('User data inserted:', this.lastID);
    res.send('<h1>Data Submitted Successfully!</h1><a href="/">Go Back</a>');
  });
});

// Endpoint to fetch all the data
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      console.error('Error retrieving data:', err);
      return res.status(500).send('Error retrieving data');
    }
    res.json(rows);
  });
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
