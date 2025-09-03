const express = require('express');
const router = express.Router();

const Product = require('../models/Product');
const Category = require('../models/Category');

router.get('/', async (req, res) => {
  try {
    const { q: query, category } = req.query;

    let filter = { isActive: true };
    
    if (category && category !== 'all') {
  
      const categoryDoc = await Category.findOne({ slug: category, isActive: true });
      if (categoryDoc) {
        filter.categoryId = categoryDoc._id;
      }
    }
    
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ];
    }
    
    const products = await Product.find(filter)
      .populate('categoryId', 'name slug description')
      .sort({ createdAt: -1 });
    
    const transformedProducts = products.map(product => ({
      id: product._id,
      title: product.title,
      price: product.price.toString(),
      originalPrice: product.originalPrice ? product.originalPrice.toString() : (product.price * 1.2).toFixed(2),
      discount: product.discount || 20,
      image: product.imageURL,
      rating: product.averageRating || 4.5,
      reviews: product.reviewCount || 0,
      shipping: "Free Shipping",
      sold: Math.floor(Math.random() * 1000) + 100, 
      category: product.categoryId?.slug || 'unknown',
      description: product.description,
      brand: product.brand,
      stock: product.stockQuantity
    }));
    
    res.json({
      products: transformedProducts,
      total: transformedProducts.length,
      status: 'success'
    });
  } catch (error) {
    console.error('Products fetch error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findById(id).populate('categoryId', 'name slug description');
    
    if (!product) {
      return res.status(404).json({
        error: 'Product not found',
        message: 'Product with the specified ID does not exist'
      });
    }
    
    const transformedProduct = {
      id: product._id,
      title: product.title,
      price: product.price.toString(),
      originalPrice: product.originalPrice ? product.originalPrice.toString() : (product.price * 1.2).toFixed(2),
      discount: product.discount || 20,
      image: product.imageURL,
      rating: product.averageRating || 4.5,
      reviews: product.reviewCount || 0,
      shipping: "Free Shipping",
      sold: Math.floor(Math.random() * 1000) + 100,
      category: product.categoryId?.slug || 'unknown',
      description: product.description,
      brand: product.brand,
      stock: product.stockQuantity
    };
    
    res.json({
      product: transformedProduct,
      status: 'success'
    });
  } catch (error) {
    console.error('Product fetch error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

router.get('/categories/all', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ name: 1 });
    
    const transformedCategories = categories.map(category => ({
      id: category.slug, 
      name: category.name,
      icon: getCategoryIcon(category.slug),
      description: category.description
    }));
    
    res.json({
      categories: transformedCategories,
      total: transformedCategories.length,
      status: 'success'
    });
  } catch (error) {
    console.error('Categories fetch error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});


function getCategoryIcon(slug) {
  const iconMap = {
    'electronics': '📱',
    'clothing': '👕',
    'home-garden': '🏠',
    'sports-outdoors': '⚽',
    'books': '📚',
    'toys-games': '🎮'
  };
  return iconMap[slug] || '📦';
}

module.exports = router;
