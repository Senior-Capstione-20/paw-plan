const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');

// redirects to controller handling registration POST requests, called via Server on port 3500
router.post('/', registrationController.handleNewUser);

module.exports = router;