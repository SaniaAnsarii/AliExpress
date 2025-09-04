'use client';

import { useSelector, useDispatch } from 'react-redux';
import { removeFromCartAPI, updateCartItemAPI, fetchCart } from '../features/cart/cartSlice';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function Cart({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { items, total, itemCount, loading } = useSelector((state) => state.cart);

  // Debug logging
  console.log('Cart - items:', items);
  console.log('Cart - total:', total);
  console.log('Cart - itemCount:', itemCount);
  console.log('Cart - loading:', loading);

  const handleRemoveItem = async (itemId) => {
    try {
      await dispatch(removeFromCartAPI(itemId)).unwrap();
      // Refresh cart after removal to ensure UI is in sync
      dispatch(fetchCart());
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      // If quantity is 0 or negative, remove the item
      await handleRemoveItem(itemId);
      return;
    }

    try {
      await dispatch(updateCartItemAPI({ itemId, quantity: newQuantity })).unwrap();
      // Refresh cart after updating to ensure UI is in sync
      dispatch(fetchCart());
    } catch (error) {
      console.error('Failed to update cart item quantity:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ×
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Loading cart...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-500">Your cart is empty</p>
              <button
                onClick={onClose}
                className="mt-4 text-red-600 hover:text-red-700 font-medium"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <img
                    src={item.imageUrl || item.image || "https://via.placeholder.com/64x64/e5e7eb/6b7280?text=Product"}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/64x64/e5e7eb/6b7280?text=Product";
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-red-600 font-semibold">
                      ${parseFloat(item.price).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      disabled={loading}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      disabled={loading}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-1 transition-colors"
                    disabled={loading}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg text-gray-900 font-semibold">Total ({itemCount} items):</span>
              <span className="text-xl font-bold text-red-600">
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

