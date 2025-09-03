const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aliexpress';
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};


const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('Database seeding is no longer needed since products come from external API');
    console.log('This script is kept as a placeholder for potential future use');
    
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  }
};

seedDatabase();
