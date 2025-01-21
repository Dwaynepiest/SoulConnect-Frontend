const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./db'); // Import the database connection
const port = 3001;
require('dotenv').config();
require("./routes")

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers['api-key']; // API key is sent in the 'x-api-key' header

  if (!apiKey || apiKey !== process.env.API_KEY) {
      return res.status(403).send('Forbidden: Invalid API Key');
  }
  next(); // Proceed to the next middleware/route handler
};

const corsOptions = {
    origin: 'http://localhost:3000', // Specifieke origin
    credentials: true 
  }
// Create an Express app
const app = express();
app.use(cors(corsOptions)); // To allow cross-origin requests
app.use(express.json()); // To parse JSON bodies


app.get('/users', apiKeyMiddleware, (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
  });
});

app.get('/extra', apiKeyMiddleware, (req, res) => {
  db.query('SELECT * FROM extra', (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
  });
});

app.get('/admin', apiKeyMiddleware, (req, res) => {
  db.query('SELECT * FROM admin', (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
  });
});

app.get('/relatieschap', apiKeyMiddleware, (req, res) => {
  db.query('SELECT * FROM relatieschap', (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
  });
});

// Start the serverx
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

