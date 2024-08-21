// routes/visit.js
const express = require('express');
const router = express.Router();
const { getWebStats } = require('../controllers/visitController');

// Route to get web statistics
router.get('/stats', getWebStats);

module.exports = router;
