const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./db'); // Import the database connection
const port = 3001;
require('dotenv').config();
const saltRounds = 10;

const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['api-key']; // API key is sent in the 'x-api-key' header

    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(403).send('Forbidden: Invalid API Key');
    }
    next(); // Proceed to the next middleware/route handler
};
  