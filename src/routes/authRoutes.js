/**
 * Authentication Routes:
 * Defines API endpoints related to user authentication.
 * Includes routes for user registration and login.
 * Utilizes the User model for database interactions and bcrypt for password validation.
 */


// Importing necessary modules
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Route for user registration
router.post('/register', async (req, res) => {
    try {
        // Extracting email and password from the request body
        const { email, password } = req.body;
        await User.create(email, password);
        // Responding with a success message
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        // Responding with an error message
        res.status(400).json({ error: 'User already exists or other DB error' });
    }
});

// Route for user login
router.post('/login', async (req, res) => {
    try {
        // Extracting email and password from the request body
        const { email, password } = req.body;
        const user = await User.findByEmail(email);
        // Checking if the user exists and if the provided password matches the stored hashed password
        if (user && await bcrypt.compare(password, user.password)) {
            res.json({ message: 'Logged in successfully', userId: user.id });
        } else {
            // Responding with an error message for invalid credentials
            res.status(400).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        // Responding with a generic server error message
        res.status(500).send('Server error');
    }
});

// Exporting the routes for use in other files
module.exports = router;
