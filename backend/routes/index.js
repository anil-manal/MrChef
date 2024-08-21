// routes/index.js
const express = require('express');
const router = express.Router();
const { trackWebsiteVisit, trackRecipeView } = require('../middleware/webStatsMiddleware');

// Apply middleware to track visits
router.use(trackWebsiteVisit);

// Define your routes here
router.get('/', (req, res) => {
  res.send('Home Page'); // Replace with actual home route logic
});

router.get('/recipes', (req, res) => {
  res.send('Recipes List'); // Replace with actual recipes route logic
});

router.get('/recipes/:id', trackRecipeView, (req, res) => {
  res.send(`Recipe Details for ID: ${req.params.id}`); // Replace with actual recipe detail route logic
});

module.exports = router;
