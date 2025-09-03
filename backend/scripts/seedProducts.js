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

const seedCategories = async () => {
  try {
    await Category.deleteMany({});
    
    const categories = [
      { 
        name: 'Electronics', 
        description: 'Electronic devices and accessories',
        slug: 'electronics'
      },
      { 
        name: 'Clothing', 
        description: 'Fashion and apparel',
        slug: 'clothing'
      },
      { 
        name: 'Home & Garden', 
        description: 'Home improvement and garden supplies',
        slug: 'home-garden'
      },
      { 
        name: 'Sports & Outdoors', 
        description: 'Sports equipment and outdoor gear',
        slug: 'sports-outdoors'
      },
      { 
        name: 'Books', 
        description: 'Books and educational materials',
        slug: 'books'
      },
      { 
        name: 'Toys & Games', 
        description: 'Toys and gaming accessories',
        slug: 'toys-games'
      }
    ];
    
    await Category.insertMany(categories);
    console.log('✅ Categories seeded successfully');
    
    return categories;
  } catch (error) {
    console.error('❌ Error seeding categories:', error.message);
    throw error;
  }
};

const seedProducts = async () => {
  try {
    await Product.deleteMany({});
    
    const electronicsCategory = await Category.findOne({ slug: 'electronics' });
    const clothingCategory = await Category.findOne({ slug: 'clothing' });
    const homeGardenCategory = await Category.findOne({ slug: 'home-garden' });
    const sportsCategory = await Category.findOne({ slug: 'sports-outdoors' });
    const booksCategory = await Category.findOne({ slug: 'books' });
    const toysCategory = await Category.findOne({ slug: 'toys-games' });
    
    const products = [
      {
        title: "Wireless Bluetooth Headphones",
        description: "High-quality wireless headphones with noise cancellation and premium sound quality",
        price: 99.99,
        originalPrice: 129.99,
        discount: 23,
        imageURL: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        categoryId: electronicsCategory._id,
        brand: "TechBrand",
        stockQuantity: 50,
        tags: ["wireless", "bluetooth", "noise-cancellation", "premium"],
        specifications: {
          batteryLife: "20 hours",
          connectivity: "Bluetooth 5.0",
          weight: "250g"
        }
      },
      {
        title: "Smartphone Case",
        description: "Protective case for latest smartphone models with shock absorption",
        price: 24.99,
        originalPrice: 34.99,
        discount: 29,
        imageURL: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500",
        categoryId: electronicsCategory._id,
        brand: "ProtectPro",
        stockQuantity: 75,
        tags: ["protective", "shock-absorption", "smartphone", "case"],
        specifications: {
          material: "Silicone",
          compatibility: "iPhone 15 series",
          protection: "Military grade"
        }
      },
      
      // Clothing
      {
        title: "Cotton T-Shirt",
        description: "Comfortable cotton t-shirt in various colors, perfect for everyday wear",
        price: 19.99,
        originalPrice: 24.99,
        discount: 20,
        imageURL: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        categoryId: clothingCategory._id,
        brand: "FashionCo",
        stockQuantity: 100,
        tags: ["cotton", "comfortable", "everyday", "casual"],
        specifications: {
          material: "100% Cotton",
          sizes: ["S", "M", "L", "XL"],
          care: "Machine washable"
        }
      },
      
      // Home & Garden
      {
        title: "Garden Tools Set",
        description: "Complete set of gardening tools for all your gardening needs",
        price: 49.99,
        originalPrice: 69.99,
        discount: 29,
        imageURL: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500",
        categoryId: homeGardenCategory._id,
        brand: "GardenMaster",
        stockQuantity: 25,
        tags: ["gardening", "tools", "complete-set", "outdoor"],
        specifications: {
          pieces: 8,
          material: "Stainless steel",
          storage: "Carrying case included"
        }
      },
      
      // Sports & Outdoors - 4 products
      {
        title: "Running Shoes",
        description: "Comfortable running shoes for all terrains with advanced cushioning",
        price: 89.99,
        originalPrice: 119.99,
        discount: 25,
        imageURL: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        categoryId: sportsCategory._id,
        brand: "SportMax",
        stockQuantity: 60,
        tags: ["running", "comfortable", "cushioning", "all-terrain"],
        specifications: {
          sole: "Rubber",
          closure: "Lace-up",
          terrain: "Road, Trail, Track"
        }
      },
      {
        title: "Yoga Mat",
        description: "Non-slip yoga mat with carrying strap",
        price: 24.99,
        originalPrice: 34.99,
        discount: 29,
        imageURL: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500",
        categoryId: sportsCategory._id,
        brand: "YogaLife",
        stockQuantity: 70,
        tags: ["yoga", "mat", "non-slip", "carrying-strap"],
        specifications: {
          thickness: "6mm",
          material: "TPE",
          size: "183x61cm"
        }
      },
      {
        title: "Dumbbell Set",
        description: "Adjustable dumbbell set for home workouts",
        price: 149.99,
        originalPrice: 199.99,
        discount: 25,
        imageURL: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
        categoryId: sportsCategory._id,
        brand: "FitPro",
        stockQuantity: 15,
        tags: ["dumbbells", "adjustable", "home-workout", "fitness"],
        specifications: {
          weight: "5-25kg",
          material: "Cast iron",
          adjustment: "Quick change"
        }
      },
      {
        title: "Skiing Equipment",
        description: "Professional skiing gear for winter sports",
        price: 79.99,
        originalPrice: 99.99,
        discount: 20,
        imageURL: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500",
        categoryId: sportsCategory._id,
        brand: "WinterPro",
        stockQuantity: 25,
        tags: ["skiing", "winter", "sports", "professional"],
        specifications: {
          weight: "2.5kg",
          material: "Carbon fiber",
          season: "Winter"
        }
      },
      
      // Books
      {
        title: "Programming Book",
        description: "Comprehensive guide to modern web development with practical examples",
        price: 39.99,
        originalPrice: 49.99,
        discount: 20,
        imageURL: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500",
        categoryId: booksCategory._id,
        brand: "TechBooks",
        stockQuantity: 30,
        tags: ["programming", "web-development", "guide", "practical"],
        specifications: {
          pages: 450,
          format: "Paperback",
          language: "English"
        }
      },
      
      // Toys & Games
      {
        title: "Board Game Set",
        description: "Classic board game collection for family entertainment",
        price: 34.99,
        originalPrice: 44.99,
        discount: 22,
        imageURL: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=500",
        categoryId: toysCategory._id,
        brand: "GameMaster",
        stockQuantity: 40,
        tags: ["board-game", "family", "entertainment", "classic"],
        specifications: {
          players: "2-6",
          age: "8+",
          duration: "30-60 minutes"
        }
      }
    ];
    
    await Product.insertMany(products);
    console.log('✅ Products seeded successfully');
    
    return products;
  } catch (error) {
    console.error('❌ Error seeding products:', error.message);
    throw error;
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('🌱 Starting database seeding...');
    
    await seedCategories();
    
    await seedProducts();
    
    console.log('🎉 Database seeding completed successfully!');
    
    const categoryCount = await Category.countDocuments();
    const productCount = await Product.countDocuments();
    
    console.log(`📊 Database Summary:`);
    console.log(`   - Categories: ${categoryCount}`);
    console.log(`   - Products: ${productCount}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database seeding failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();
