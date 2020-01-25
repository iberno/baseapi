const express = require('express')

const {
  authRegister,
} = require('../controllers/authController');

const router = express.Router();

// Unauthenticated Routes
router
  .route('/')
  .post(authRegister)

module.exports = router;