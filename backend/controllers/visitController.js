// controllers /visitController.js
const WebStats = require('../models/WebStats');

// Controller to get web statistics
const getWebStats = async (req, res) => {
  try {
    const stats = await WebStats.findOne();
    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching web stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getWebStats };
