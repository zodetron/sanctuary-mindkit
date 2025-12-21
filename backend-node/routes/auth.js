/**
 * Authentication Routes
 * Handles signup, login, logout, and session checking
 */

const express = require('express');
const bcrypt = require('bcryptjs');
const { findUserByUsername, createUser } = require('../utils/storage');

const router = express.Router();

/**
 * Signup endpoint
 */
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Sanitize username (alphanumeric and underscore only)
    const sanitizedUsername = username.replace(/[^a-zA-Z0-9_]/g, '');

    // Validate username
    if (sanitizedUsername.length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Username must be at least 3 characters and contain only letters, numbers, and underscores'
      });
    }

    // Validate password
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    // Check if user already exists
    const existingUser = await findUserByUsername(sanitizedUsername);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Username already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await createUser(sanitizedUsername, hashedPassword);

    res.status(201).json({
      success: true,
      message: 'Account created successfully'
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create user account'
    });
  }
});

/**
 * Login endpoint
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Sanitize username
    const sanitizedUsername = username.replace(/[^a-zA-Z0-9_]/g, '');

    // Find user
    const user = await findUserByUsername(sanitizedUsername);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    // Set session
    req.session.user_id = user.username;
    req.session.logged_in = true;

    res.json({
      success: true,
      message: 'Login successful',
      username: user.username
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.'
    });
  }
});

/**
 * Logout endpoint
 */
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to logout'
      });
    }

    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  });
});

/**
 * Check session endpoint
 */
router.get('/check_session', (req, res) => {
  if (req.session.logged_in && req.session.user_id) {
    res.json({
      success: true,
      logged_in: true,
      username: req.session.user_id
    });
  } else {
    res.json({
      success: true,
      logged_in: false
    });
  }
});

module.exports = router;

