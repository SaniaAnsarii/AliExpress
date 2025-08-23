'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react';
import { signOutUser } from '../features/auth/authSlice';

export default function Header({ onAuthClick }) {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const handleLogout = () => {
    dispatch(signOutUser());
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-red-600">AliExpress</h1>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Cart */}
            <button className="relative p-2 text-gray-600 hover:text-red-600 transition-colors">
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
                  <User size={24} />
                  <span className="hidden lg:block">{user?.email?.split('@')[0]}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Orders
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={onAuthClick}
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  Login
                </button>
                <button 
                  onClick={onAuthClick}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-red-600"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>

            {/* Mobile Navigation */}
            <div className="space-y-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600">
                <ShoppingCart size={20} />
                <span>Cart ({cartItemCount})</span>
              </button>

              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">{user?.email}</div>
                  <button className="block w-full text-left text-gray-600 hover:text-red-600">
                    Profile
                  </button>
                  <button className="block w-full text-left text-gray-600 hover:text-red-600">
                    Orders
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-gray-600 hover:text-red-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button 
                    onClick={onAuthClick}
                    className="block w-full text-left text-gray-600 hover:text-red-600"
                  >
                    Login
                  </button>
                  <button 
                    onClick={onAuthClick}
                    className="block w-full text-left text-gray-600 hover:text-red-600"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
