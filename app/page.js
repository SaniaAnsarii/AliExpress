'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import Search from './components/Search';
import UserProfile from './components/UserProfile';

export default function Home() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  const handleAuthClick = () => {
    setShowLoginModal(true);
  };

  const handleCartClick = () => {
    setShowCart(true);
  };

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onAuthClick={handleAuthClick}
        onCartClick={handleCartClick}
        onSearchClick={handleSearchClick}
        onProfileClick={handleProfileClick}
      />
      <ProductGrid 
        onProductClick={handleProductClick} 
        onAuthRequired={handleAuthClick}
      />
      
      {/* Modals */}
      {showLoginModal && (
        <LoginModal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)}
          onSwitchToSignup={() => {
            setShowLoginModal(false);
            setShowSignupModal(true);
          }}
        />
      )}
      
      {showSignupModal && (
        <SignupModal 
          isOpen={showSignupModal} 
          onClose={() => setShowSignupModal(false)}
          onSwitchToLogin={() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
      
      {showCart && (
        <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
      )}
      
      {showProductDetails && selectedProduct && (
        <ProductDetails 
          product={selectedProduct}
          isOpen={showProductDetails} 
          onClose={() => setShowProductDetails(false)}
          onAuthRequired={handleAuthClick}
        />
      )}
      
      {showSearch && (
        <Search isOpen={showSearch} onClose={() => setShowSearch(false)} />
      )}
      
      {showProfile && (
        <UserProfile isOpen={showProfile} onClose={() => setShowProfile(false)} />
      )}
    </div>
  );
}
