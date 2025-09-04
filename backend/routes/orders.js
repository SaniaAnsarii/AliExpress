const express = require('express');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { authenticateToken } = require('../config/jwt');

const Order = require('../models/Order');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

const router = express.Router();

// Get all orders (with pagination)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const orders = await Order.find({ user: req.user.id })
      .populate('items.product', 'title imageUrl')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalCount = await Order.countDocuments({ user: req.user.id });

    res.json({
      orders,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error('Orders fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get order by ID
router.get('/:orderId', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.orderId, user: req.user.id })
      .populate('items.product', 'title imageUrl');

    if (!order) return res.status(404).json({ error: 'Order not found' });

    res.json(order);
  } catch (error) {
    console.error('Order details error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create order
router.post('/create', authenticateToken, [
  body('shippingAddress').isObject(),
  body('billingAddress').isObject(),
  body('paymentMethod').notEmpty()
], async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { shippingAddress, billingAddress, paymentMethod } = req.body;

    const cartItems = await CartItem.find({ user: req.user.id }).populate('product').session(session);
    if (cartItems.length === 0) throw new Error('Cart is empty');

    let totalAmount = 0;
    const items = [];

    for (const ci of cartItems) {
      if (ci.quantity > ci.product.stockQuantity) throw new Error(`Insufficient stock for ${ci.product.title}`);

      totalAmount += ci.quantity * ci.product.price;
      items.push({ product: ci.product._id, quantity: ci.quantity, price: ci.product.price });

      // Update stock
      ci.product.stockQuantity -= ci.quantity;
      await ci.product.save({ session });
    }

    const order = new Order({
      user: req.user.id,
      orderNumber: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      items,
      totalAmount,
      shippingAddress,
      billingAddress,
      paymentMethod
    });

    await order.save({ session });

    await CartItem.deleteMany({ user: req.user.id }).session(session);

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ order, message: 'Order created successfully' });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Create order error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Update order status
router.put('/:orderId/status', authenticateToken, [
  body('status').isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findOneAndUpdate(
      { _id: orderId, user: req.user.id },
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ error: 'Order not found' });

    res.json({ order, message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
