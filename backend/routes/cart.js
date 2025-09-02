// Cart routes
const express = require('express');
const { body, validationResult } = require('express-validator');
const CartItem = require('../models/CartItem');
const { authenticateToken } = require('../config/jwt');

const router = express.Router();

// Get user's cart
router.get('/', authenticateToken, async (req, res) => {
  try {
    const cartItems = await CartItem.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    const items = cartItems.map(item => ({
      id: item._id,
      productId: item.productId,
      title: item.productData.title,
      price: item.productData.price,
      imageUrl: item.productData.imageUrl,
      quantity: item.quantity,
      stockQuantity: item.productData.stockQuantity,
      subtotal: item.productData.price * item.quantity
    }));

    const total = items.reduce((sum, item) => sum + item.subtotal, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    res.json({
      items,
      total,
      itemCount
    });
  } catch (error) {
    console.error('Cart fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add item to cart
router.post('/add', authenticateToken, [
  body('productId').notEmpty(),
  body('quantity').isInt({ min: 1 }),
  body('productData').isObject()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { productId, quantity, productData } = req.body;

    // Check if item already exists in cart
    const existingItem = await CartItem.findOne({ 
      userId: req.user.id, 
      productId: productId 
    });

    if (existingItem) {
      // Update existing item quantity
      const newQuantity = existingItem.quantity + quantity;
      existingItem.quantity = newQuantity;
      await existingItem.save();
    } else {
      // Add new item to cart
      const cartItem = new CartItem({
        userId: req.user.id,
        productId: productId,
        productData: productData,
        quantity: quantity
      });
      await cartItem.save();
    }

    res.json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update cart item quantity
router.put('/update/:itemId', authenticateToken, [
  body('quantity').isInt({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { itemId } = req.params;
    const { quantity } = req.body;

    // Check if cart item exists and belongs to user
    const cartItem = await CartItem.findOne({ 
      _id: itemId, 
      userId: req.user.id 
    });

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    // Update quantity
    cartItem.quantity = quantity;
    await cartItem.save();

    res.json({ message: 'Cart item updated successfully' });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Remove item from cart
router.delete('/remove/:itemId', authenticateToken, async (req, res) => {
  try {
    const { itemId } = req.params;

    const result = await CartItem.findOneAndDelete({ 
      _id: itemId, 
      userId: req.user.id 
    });

    if (!result) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Clear entire cart
router.delete('/clear', authenticateToken, async (req, res) => {
  try {
    await CartItem.deleteMany({ userId: req.user.id });

    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
