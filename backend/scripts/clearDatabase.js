const mongoose = require('mongoose');
const User = require('../models/User');
const CartItem = require('../models/CartItem');
const Wishlist = require('../models/Wishlist');
const Order = require('../models/Order');
require('dotenv').config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aliexpress';
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected for clearing database');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const clearDatabase = async () => {
  try {
    await connectDB();
    
    console.log('Clearing database...');
    
    await User.deleteMany({});
    await CartItem.deleteMany({});
    await Wishlist.deleteMany({});
    await Order.deleteMany({});
    
    console.log('Database cleared successfully!');
    
  } catch (error) {
    console.error('Clear database error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  }
};

clearDatabase();
