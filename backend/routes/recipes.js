// routes/recipes.js
const express = require('express');
const router = express.Router();
const { addRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe, getDashboardStats } = require('../controllers/recipeController');
const upload = require('../middleware/multer');
const { protect } = require('../middleware/authMiddleware');

// Route for adding a new recipe
router.post('/', protect, upload.single('image'), addRecipe);

// Route for getting all recipes
router.get('/', getAllRecipes);

// Route for getting a recipe by ID
router.get('/:id', getRecipeById);

// Route for updating a recipe by ID
router.put('/:id', protect, upload.single('image'), updateRecipe);

// Route for deleting a recipe by ID (no protection)
router.delete('/:id', deleteRecipe);

// Route for getting dashboard statistics
router.get('/dashboard', getDashboardStats);

module.exports = router;