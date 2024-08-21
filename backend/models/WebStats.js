// models/WebStats.js
const mongoose = require('mongoose');

const webStatsSchema = new mongoose.Schema({
  websiteViews: { type: Number, default: 0 },
  recipeViews: { type: Map, of: Number, default: {} },
  recipeCount: { type: Number, default: 0 },
});

const WebStats = mongoose.model('WebStats', webStatsSchema);

module.exports = WebStats;
