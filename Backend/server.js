const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./db'); // Import the database connection
const port = 3001;
require('dotenv').config();

  // Create an Express app
const app = express();
app.use(cors(corsOptions)); // To allow cross-origin requests
app.use(express.json()); // To parse JSON bodies


// Start the serverx
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});