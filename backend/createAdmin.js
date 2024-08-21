const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

// MongoDB connection URL
const MONGO_URI = 'mongodb+srv://anilmanal992115:mrchef@cluster0.bsafder.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    // Create a hashed password
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create a new admin user
    const admin = new Admin({
      name: 'Admin',
      email: 'admin@mrchef.com',
      password: hashedPassword,
    });

    await admin.save();
    console.log('Admin user created successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

createAdmin();
