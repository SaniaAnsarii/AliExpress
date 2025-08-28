'use client';

import { useSelector } from 'react-redux';
import { useState } from 'react';
import { ShoppingCart, Search, User, Menu, X, Heart } from 'lucide-react';

export default function Header({ onAuthClick, onCartClick, onSearchClick, onProfileClick, onWishlistClick }) {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
  const wishlistItemCount = wishlistItems.length;

  const handleSearch = (e) => {
    e.preventDefault();
    onSearchClick();
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
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600 cursor-pointer"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Wishlist */}
            {isAuthenticated && (
              <button 
                onClick={onWishlistClick}
                className="relative p-2 text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
              >
                <Heart size={24} />
                {wishlistItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistItemCount}
                  </span>
                )}
              </button>
            )}

            {/* Cart */}
            <button 
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
            >
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
                <button 
                  onClick={onProfileClick}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                >
                  {user?.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                  )}
                  <span className="hidden lg:block">{user?.displayName || user?.email?.split('@')[0]}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={onAuthClick}
                  className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                >
                  Login
                </button>
                <button 
                  onClick={onAuthClick}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-red-600 cursor-pointer"
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
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>

            {/* Mobile Navigation */}
            <div className="space-y-4">
              {/* Wishlist - Mobile */}
              {isAuthenticated && (
                <button 
                  onClick={onWishlistClick}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-600 cursor-pointer"
                >
                  <Heart size={20} />
                  <span>Wishlist ({wishlistItemCount})</span>
                </button>
              )}

              {/* Cart - Mobile */}
              <button 
                onClick={onCartClick}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 cursor-pointer"
              >
                <ShoppingCart size={20} />
                <span>Cart ({cartItemCount})</span>
              </button>

                             {isAuthenticated ? (
                 <div className="space-y-2">
                   <div className="flex items-center space-x-2 mb-2">
                     {user?.photoURL ? (
                       <img 
                         src={user.photoURL} 
                         alt="Profile" 
                         className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                       />
                     ) : (
                       <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                         <User size={16} className="text-white" />
                       </div>
                     )}
                     <div className="text-sm text-gray-500">{user?.displayName || user?.email}</div>
                   </div>
                   <button 
                     onClick={onProfileClick}
                     className="block w-full text-left text-gray-600 hover:text-red-600 cursor-pointer"
                   >
                     Profile
                   </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button 
                    onClick={onAuthClick}
                    className="block w-full text-left text-gray-600 hover:text-red-600 cursor-pointer"
                  >
                    Login
                  </button>
                  <button 
                    onClick={onAuthClick}
                    className="block w-full text-left text-gray-600 hover:text-red-600 cursor-pointer"
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
