const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: String, // External product ID from RapidAPI
    required: true
  },
  productData: {
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    stockQuantity: {
      type: Number,
      default: 0
    }
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
}, {
  timestamps: true
});

// Compound index to ensure unique user-product combination
cartItemSchema.index({ userId: 1, productId: 1 }, { unique: true });

// Index for better performance
cartItemSchema.index({ userId: 1 });

module.exports = mongoose.model('CartItem', cartItemSchema);
