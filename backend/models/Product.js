const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  imageURL: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  brand: {
    type: String,
    trim: true
  },
  stockQuantity: {
    type: Number,
    min: 0,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String
  }],
  specifications: {
    type: mongoose.Schema.Types.Mixed
  },
  averageRating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviewCount: {
    type: Number,
    min: 0,
    default: 0
  },
  reviews: [{
    type: mongoose.Schema.Types.Mixed
  }]
}, {
  timestamps: true
});

// Create indexes for better performance
productSchema.index({ categoryId: 1 });
productSchema.index({ title: 'text', description: 'text' });
productSchema.index({ price: 1 });
productSchema.index({ averageRating: -1 });
productSchema.index({ isActive: 1 });

module.exports = mongoose.model('Product', productSchema);
