'use client';

import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../features/wishlist/wishlistSlice';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';

export default function WishlistModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { products } = useSelector((state) => state.products);

  // Get wishlisted products from the same data source as ProductGrid
  const wishlistedProducts = products.filter(product => 
    wishlistItems.includes(product.id)
  );

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (product) => {
    // This would typically add to cart - for now just show alert
    alert(`Added ${product.title} to cart!`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Heart size={24} className="text-red-500" />
            My Wishlist ({wishlistedProducts.length})
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-12">
              <Heart size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-500 mb-6">Start adding items you love to your wishlist!</p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistedProducts.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-cover"
                    />
                    <button
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-red-600">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                      {product.discount && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                          -{product.discount}%
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        ({product.reviews} reviews)
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
