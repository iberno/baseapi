const express = require('express')

const {
  forgotPassword
} = require('../controllers/AuthController');

const router = express.Router();

// Unauthenticated Routes
router
  .route('/')
  .post(forgotPassword)

module.exports = router;