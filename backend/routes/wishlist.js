// Wishlist routes
const express = require('express');
const { body, validationResult } = require('express-validator');
const Wishlist = require('../models/Wishlist');
const { authenticateToken } = require('../config/jwt');

const router = express.Router();

// Get user's wishlist
router.get('/', authenticateToken, async (req, res) => {
  try {
    const wishlistItems = await Wishlist.find({ userId: req.user.id })
      .sort({ addedAt: -1 });

    const items = wishlistItems.map(item => ({
      id: item._id,
      productId: item.productId,
      title: item.productData.title,
      price: item.productData.price,
      imageUrl: item.productData.imageUrl || item.productData.image,
      stockQuantity: item.productData.stockQuantity,
      category: item.productData.category,
      addedAt: item.addedAt
    }));

    res.json({
      items,
      count: items.length
    });
  } catch (error) {
    console.error('Wishlist fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add item to wishlist
router.post('/add', authenticateToken, [
  body('productId').notEmpty(),
  body('productData').isObject()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { productId, productData } = req.body;

    // Check if product is already in wishlist
    const existingItem = await Wishlist.findOne({ 
      userId: req.user.id, 
      productId: productId 
    });

    if (existingItem) {
      return res.status(400).json({ error: 'Product already in wishlist' });
    }

    // Add product to wishlist
    const wishlistItem = new Wishlist({
      userId: req.user.id,
      productId: productId,
      productData: productData
    });
    await wishlistItem.save();

    res.json({ message: 'Product added to wishlist successfully' });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Remove item from wishlist
router.delete('/remove/:productId', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;

    const result = await Wishlist.findOneAndDelete({ 
      userId: req.user.id, 
      productId: productId 
    });

    if (!result) {
      return res.status(404).json({ error: 'Product not found in wishlist' });
    }

    res.json({ message: 'Product removed from wishlist successfully' });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Toggle item in wishlist (add if not present, remove if present)
router.post('/toggle', authenticateToken, [
  body('productId').notEmpty(),
  body('productData').isObject()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { productId, productData } = req.body;

    // Check if product is in wishlist
    const existingItem = await Wishlist.findOne({ 
      userId: req.user.id, 
      productId: productId 
    });
    
    if (existingItem) {
      // Remove from wishlist
      await Wishlist.findOneAndDelete({ 
        userId: req.user.id, 
        productId: productId 
      });
      res.json({ message: 'Product removed from wishlist', action: 'removed' });
    } else {
      // Add to wishlist
      const wishlistItem = new Wishlist({
        userId: req.user.id,
        productId: productId,
        productData: productData
      });
      await wishlistItem.save();
      res.json({ message: 'Product added to wishlist', action: 'added' });
    }
  } catch (error) {
    console.error('Toggle wishlist error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Clear entire wishlist
router.delete('/clear', authenticateToken, async (req, res) => {
  try {
    await Wishlist.deleteMany({ userId: req.user.id });

    res.json({ message: 'Wishlist cleared successfully' });
  } catch (error) {
    console.error('Clear wishlist error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
