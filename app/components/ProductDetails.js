'use client';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { X, Star, ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';

export default function ProductDetails({ product, isOpen, onClose }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      // Show login modal or redirect to login
      return;
    }

    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: quantity
    }));
    
    onClose();
  };

  const handleWishlist = () => {
    if (!isAuthenticated) {
      // Show login modal or redirect to login
      return;
    }
    setIsWishlisted(!isWishlisted);
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              <button
                onClick={handleWishlist}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  isWishlisted 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white text-gray-400 hover:text-red-500'
                } shadow-sm`}
              >
                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
              {product.discount && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded">
                  {product.discount}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
              
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.rating} ({product.reviews || 0} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-red-600">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              {/* Shipping */}
              {product.shipping && (
                <div className="text-green-600 font-medium">
                  {product.shipping}
                </div>
              )}

              {/* Description */}
              {product.description && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

