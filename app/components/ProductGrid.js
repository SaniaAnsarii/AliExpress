'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from '../features/products/productSlice';
import ProductCard from './ProductCard';
import CategoryNav from './CategoryNav';
import { testAPI } from '../utils/apiTest';
import { testAPIStatus } from '../services/apiService';

export default function ProductGrid({ onProductClick }) {
  const dispatch = useDispatch();
  const { products, loading, error, apiStatus } = useSelector((state) => state.products);
  const [activeCategory, setActiveCategory] = useState('all');

  // Debug logging
  console.log('🎯 ProductGrid: Current state -', {
    productsCount: products?.length || 0,
    loading,
    error,
    apiStatus
  });

  useEffect(() => {
    // Load initial products
    dispatch(fetchProductsByCategory({ categoryId: 'all', query: '' }));
  }, [dispatch]);

  // Monitor state changes
  useEffect(() => {
    console.log('🎯 ProductGrid: State changed -', {
      productsCount: products?.length || 0,
      loading,
      error,
      apiStatus
    });
  }, [products, loading, error, apiStatus]);

  // Test function to manually trigger API calls
  const testAPICall = () => {
    console.log('🧪 Testing API call...');
    dispatch(fetchProductsByCategory({ categoryId: 'all', query: 'phone' }));
  };

  // Direct API test function
  const directAPITest = async () => {
    console.log('🔬 Running direct API test...');
    const result = await testAPI();
    console.log('📊 Direct API test result:', result);
  };

  // Enhanced API test function
  const enhancedAPITest = async () => {
    console.log('🚀 Running enhanced API test...');
    const result = await testAPIStatus();
    console.log('📊 Enhanced API test result:', result);
  };

  // Test function to manually set mock data
  const setMockData = () => {
    console.log('🧪 Manually setting mock data...');
    const mockData = {
      data: [
        {
          id: 1,
          title: "Test Product 1",
          price: "99.99",
          originalPrice: "119.99",
          image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
          rating: 4.5,
          reviews: 100,
          discount: "17% OFF",
          shipping: "Free shipping",
          category: "electronics",
          description: "Test product description"
        },
        {
          id: 2,
          title: "Test Product 2",
          price: "149.99",
          originalPrice: "179.99",
          image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
          rating: 4.7,
          reviews: 200,
          discount: "17% OFF",
          shipping: "Free shipping",
          category: "electronics",
          description: "Another test product"
        }
      ],
      source: 'mock'
    };
    
    console.log('🧪 Dispatching action with payload:', mockData);
    dispatch({
      type: 'products/fetchProductsByCategory/fulfilled',
      payload: mockData
    });
    console.log('🧪 Action dispatched');
  };

  // Retry API call function
  const retryAPICall = () => {
    console.log('🔄 Retrying API call...');
    dispatch(fetchProductsByCategory({ categoryId: activeCategory, query: '' }));
  };

  // Show loading skeleton only if no products are available
  if (loading && products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <div className="text-sm text-gray-600">Loading...</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden animate-pulse">
              <div className="aspect-square bg-gray-200"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show error only if there's an error AND no products available
  if (error && products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-red-600 text-lg font-medium mb-2">Error loading products</div>
          <div className="text-gray-600 mb-4">{error}</div>
          <div className="space-x-4">
            <button
              onClick={() => dispatch(fetchProductsByCategory({ categoryId: 'all', query: '' }))}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
            >
              Try Again
            </button>
            <button
              onClick={testAPICall}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Test API
            </button>
            <button
              onClick={directAPITest}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
            >
              Direct Test
            </button>
            <button
              onClick={enhancedAPITest}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
            >
              Enhanced Test
            </button>
            <button
              onClick={setMockData}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors cursor-pointer"
            >
              Set Mock Data
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show no products message only if no products and no error
  if (products.length === 0 && !error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-gray-600 text-lg mb-4">No products found</div>
          <div className="space-x-4">
            <button
              onClick={() => dispatch(fetchProductsByCategory({ categoryId: 'all', query: '' }))}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
            >
              Load Products
            </button>
            <button
              onClick={testAPICall}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Test API
            </button>
            <button
              onClick={directAPITest}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
            >
              Direct Test
            </button>
            <button
              onClick={enhancedAPITest}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
            >
              Enhanced Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <CategoryNav 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />
      
      {/* API Status Banner */}
      {apiStatus === 'rate_limited' && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex justify-between items-start">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>API Rate Limit:</strong> Currently showing mock data due to API rate limiting. 
                  Real product data will be available once the rate limit resets.
                </p>
              </div>
            </div>
            <button
              onClick={retryAPICall}
              className="ml-4 bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700 transition-colors cursor-pointer"
            >
              Retry API
            </button>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {activeCategory === 'all' ? 'All Products' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}`}
          </h2>
          <div className="flex items-center space-x-4">
            {/* <div className="text-sm text-gray-600">
              Showing {products.length} products
            </div> */}
            {/* {apiStatus === 'loading' && (
              <div className="text-sm text-blue-600">
                🔄 Loading from API...
              </div>
            )} */}
            {/* {apiStatus === 'success' && (
              <div className="text-sm text-green-600">
                ✅ Live data from API
              </div>
            )} */}
            {apiStatus === 'rate_limited' && (
              <div className="text-sm text-yellow-600">
                ⚠️ Using mock data
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onClick={onProductClick} />
          ))}
        </div>
      </div>
    </div>
  );
}
