'use client';

import { useSelector, useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { setUser } from '../features/auth/authSlice';
import { clearCart } from '../features/cart/cartSlice';
import { X, User, Mail, LogOut, Settings, Package, Heart } from 'lucide-react';

export default function UserProfile({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(setUser(null));
      dispatch(clearCart());
      onClose();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* User Info */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-600 flex items-center justify-center">
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <User size={32} className="text-white" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              {user?.displayName || 'User'}
            </h3>
            <p className="text-gray-500 flex items-center justify-center gap-2 mt-1">
              <Mail size={16} />
              {user?.email}
            </p>
          </div>

          {/* Profile Options */}
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Settings size={20} />
              <span>Account Settings</span>
            </button>
            
            <button className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Package size={20} />
              <span>My Orders</span>
            </button>
            
            <button className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Heart size={20} />
              <span>Wishlist</span>
            </button>
          </div>

          {/* Logout Button */}
          <div className="mt-6 pt-6 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

