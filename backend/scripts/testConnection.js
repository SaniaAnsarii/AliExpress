const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aliexpress');
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const testExistingData = async () => {
  try {
    console.log('🔍 Testing existing data access...');
    
    const categories = await Category.find({});
    console.log(`📂 Found ${categories.length} categories:`);
    categories.forEach(cat => {
      console.log(`   - ${cat.name} (${cat.slug})`);
    });
    
    const products = await Product.find({}).populate('categoryId', 'name slug');
    console.log(`📦 Found ${products.length} products:`);
    products.forEach(prod => {
      console.log(`   - ${prod.title} (${prod.categoryId?.slug || 'no category'})`);
    });
    
    if (categories.length > 0) {
      const firstCategory = categories[0];
      console.log(`\n🔍 Testing category filter for: ${firstCategory.name}`);
      
      const categoryProducts = await Product.find({ 
        categoryId: firstCategory._id 
      }).populate('categoryId', 'name slug');
      
      console.log(`   Found ${categoryProducts.length} products in this category`);
    }
    
    console.log('\n✅ Data access test completed successfully!');
    
  } catch (error) {
    console.error('❌ Data access test failed:', error.message);
  }
};

const main = async () => {
  try {
    await connectDB();
    await testExistingData();
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
};

main();
