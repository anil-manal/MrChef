//middleware/authMiddleware
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token received:', token); // Log token

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decoded:', decoded); // Log decoded token

      req.admin = await Admin.findById(decoded.id).select('-password');

      if (!req.admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }

      next();
    } catch (error) {
      console.error('Token verification error:', error.message || error); // Log verification errors
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
