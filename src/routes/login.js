const express = require('express')

const {
  authLogin,
} = require('../controllers/AuthController');

const router = express.Router();

// Unauthenticated Routes
router
  .route('/')
  .post(authLogin)

module.exports = router;