// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Local login
router.get('/login', authController.showLoginPage);
router.post('/login', authController.login);

// Local registration
router.get('/register', authController.showRegisterPage);
router.post('/register', authController.register);

// Logout
router.get('/logout', authController.logout);

// Google login
router.get('/google', authController.googleLogin);
router.get('/google/redirect', authController.googleRedirect);

module.exports = router;
