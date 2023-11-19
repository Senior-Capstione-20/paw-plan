const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// redirects to controller handling login POST requests, called via Server on port 3500
router.post('/', authController.handleLogin);

module.exports = router;