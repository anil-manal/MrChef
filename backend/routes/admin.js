const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware');

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (admin && (await admin.matchPassword(password))) {
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'your_jwt_secret', {
        expiresIn: '30d',
      });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected dashboard route
router.get('/dashboard', protect, (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard' });
});

module.exports = router;
