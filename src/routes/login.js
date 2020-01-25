const express = require('express')

const {
  authLogin
} = require('../controllers/authController');

const router = express.Router();

// Unauthenticated Routes
router
  .route('/')
  .post(authLogin)

module.exports = router;