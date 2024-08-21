// models/Recipe.js

const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
});

const instructionSchema = mongoose.Schema({
  instruction: { type: String, required: true },
  description: { type: String, required: true },
});

const recipeSchema = mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [ingredientSchema],
  instructions: [instructionSchema], // Add instructions field
  image: { type: String },
  labels: [String],
  metadata: { type: String, maxlength: 50 },
  views: { type: Number, default: 0 }, // Assuming this field tracks total views
  uniqueViews: { type: Number, default: 0 }, // Assuming this field tracks unique views
}, {
  timestamps: true,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
