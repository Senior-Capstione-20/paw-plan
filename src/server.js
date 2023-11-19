/**
 * Server Initialization:
 * Sets up and starts the Express.js application.
 * Configures middleware, mounts API routes, and defines the root route.
 * Listens for incoming requests on port 3500.
 */


// Importing necessary modules
const express = require('express');
const app = express();

// Middleware to parse JSON from incoming request bodies
app.use(express.json());

// Mounting the authentication routes
app.use('/register', require('./api/register'));
app.use('/login', require('./api/auth'));

// Starting the server on port 3500
app.listen(3500, () => {
  console.log('Server running on http://localhost:3500');
});

// Root route to display a welcome message
app.get('/', (req, res) => {
  res.send('Welcome to Paw Plan!');
});