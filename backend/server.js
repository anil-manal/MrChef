
//server.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const adminRoutes = require('./routes/admin');
const recipeRoutes = require('./routes/recipes');
const visitRoutes = require('./routes/visit'); // Import the visit routes
const { trackWebsiteVisit, trackRecipeCount } = require('./middleware/webStatsMiddleware'); // Import the middleware

const MONGO_URI = process.env.MONGO_URI; // Use environment variable

const app = express();
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173',
}));

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Serve static files from the uploads directory
app.use('/uploads', express.static(uploadsDir));

// Track website visit for every request
app.use(trackWebsiteVisit);

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Use routes
app.use('/api/admin', adminRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/visits', visitRoutes); // Use the visit routes

// Track recipe count
trackRecipeCount(); // Ensure recipe count is tracked at startup

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
