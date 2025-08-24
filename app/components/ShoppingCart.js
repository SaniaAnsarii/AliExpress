'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice';
import AuthForms from './AuthForms';

export default function ShoppingCart({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateQuantity({ productId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      dispatch(clearCart());
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">Add some products to get started!</p>
              <button
                onClick={onClose}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  {/* Product Image */}
                  <div className="w-20 h-20 flex-shrink-0">
                    <img
                      src={item.image || "https://via.placeholder.com/80x80/e5e7eb/6b7280?text=Product"}
                      alt={item.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-lg font-bold text-red-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6">
            {/* Summary */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-red-600">${total.toFixed(2)}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => dispatch(clearCart())}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                disabled={!isAuthenticated || isCheckingOut}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isCheckingOut ? 'Processing...' : (isAuthenticated ? 'Checkout' : 'Login to Checkout')}
              </button>
            </div>

            {!isAuthenticated && (
              <p className="text-sm text-gray-600 mt-2 text-center">
                Please log in to complete your purchase
              </p>
            )}
          </div>
        )}
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthForms onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
}

