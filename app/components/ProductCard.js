'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { addToCart } from '../features/cart/cartSlice';

export default function ProductCard({ product, onClick }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    }));
  };

  const handleWishlist = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden group">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image || "https://via.placeholder.com/300x300/e5e7eb/6b7280?text=Product"}
          alt={product.title}
          onClick={() => onClick && onClick(product)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
        />
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isWishlisted 
              ? 'bg-red-500 text-white' 
              : 'bg-white text-gray-400 hover:text-red-500'
          } shadow-sm`}
        >
          <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
            {product.discount} OFF
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Title */}
        <h3 
          onClick={() => onClick && onClick(product)}
          className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 hover:text-red-600 transition-colors cursor-pointer"
        >
          {product.title}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviews || 0})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-red-600">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Shipping Info */}
        {product.shipping && (
          <div className="text-xs text-green-600 mb-3">
            {product.shipping}
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>


    </div>
  );
}
