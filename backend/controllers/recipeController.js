//controllers/recipeController
const Recipe = require('../models/Recipe');

// Add a new recipe
const addRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, labels, metadata } = req.body;
    const image = req.file ? req.file.path : null;

    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      image,
      labels,
      metadata,
    });

    await newRecipe.save();
    res.status(201).json({ message: 'Recipe added successfully', recipe: newRecipe });
  } catch (error) {
    console.error('Error adding recipe:', error.message || error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error.message || error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a recipe by ID
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error.message || error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a recipe by ID
const updateRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, labels, metadata } = req.body;
    const image = req.file ? req.file.path : null;

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { title, ingredients, instructions, labels, metadata, image },
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json({ message: 'Recipe updated successfully', recipe: updatedRecipe });
  } catch (error) {
    console.error('Error updating recipe:', error.message || error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a recipe by ID
const deleteRecipe = async (req, res) => {
  try {
    console.log('Deleting recipe with ID:', req.params.id); // Log ID for debugging
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error deleting recipe:', error.message || error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalRecipes = await Recipe.countDocuments();
    const totalViews = await Recipe.aggregate([{ $group: { _id: null, totalViews: { $sum: "$views" } } }]);
    const uniqueViews = await Recipe.aggregate([{ $group: { _id: null, uniqueViews: { $sum: "$uniqueViews" } } }]);
    const recentRecipes = await Recipe.find().sort({ createdAt: -1 }).limit(3);

    res.status(200).json({
      totalRecipes,
      totalViews: totalViews[0] ? totalViews[0].totalViews : 0,
      uniqueViews: uniqueViews[0] ? uniqueViews[0].uniqueViews : 0,
      recentRecipes,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error.message || error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getDashboardStats,
};
