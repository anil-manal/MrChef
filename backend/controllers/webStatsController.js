// controller/webStatsController.js
const WebStats = require('../models/WebStats');
const mongoose = require('mongoose');

const trackWebsiteVisit = async (req, res, next) => {
  try {
    let stats = await WebStats.findOne();
    if (!stats) {
      stats = new WebStats();
    }
    stats.websiteViews += 1;
    await stats.save();
  } catch (error) {
    console.error('Failed to track website visit:', error);
  }
  next();
};

const trackRecipeView = async (req, res, next) => {
  try {
    const { id } = req.params;
    let stats = await WebStats.findOne();
    if (!stats) {
      stats = new WebStats();
    }

    if (mongoose.Types.ObjectId.isValid(id)) {
      const currentViews = stats.recipeViews.get(id) || 0;
      stats.recipeViews.set(id, currentViews + 1);
      await stats.save();
    }
  } catch (error) {
    console.error('Failed to track recipe view:', error);
  }
  next();
};

const trackRecipeCount = async () => {
  try {
    const recipeCount = await Recipe.countDocuments();
    let stats = await WebStats.findOne();
    if (!stats) {
      stats = new WebStats();
    }
    stats.recipeCount = recipeCount;
    await stats.save();
  } catch (error) {
    console.error('Failed to track recipe count:', error);
  }
};

module.exports = { trackWebsiteVisit, trackRecipeView, trackRecipeCount };
