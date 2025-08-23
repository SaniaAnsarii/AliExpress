'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import AuthForms from './components/AuthForms';

export default function Home() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAuthClick={() => setShowAuthModal(true)} />
      <ProductGrid />
      
      {showAuthModal && (
        <AuthForms onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
}
