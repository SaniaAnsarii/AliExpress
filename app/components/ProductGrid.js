'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchProductsByCategory, setApiStatus } from '../features/products/productSlice';
import ProductCard from './ProductCard';

export default function ProductGrid({ activeCategory }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { products, loading, error, apiStatus } = useSelector((state) => state.products);
  const [testResults, setTestResults] = useState(null);

  // Add effect to watch for category changes
  useEffect(() => {
    if (activeCategory !== 'all') {
      console.log('Category changed to:', activeCategory);
      dispatch(fetchProductsByCategory({ categoryId: activeCategory, query: '' }));
    }
  }, [activeCategory, dispatch]);

  // Load initial products when component mounts
  useEffect(() => {
    if (activeCategory === 'all' && products.length === 0) {
      dispatch(fetchProductsByCategory({ categoryId: 'all', query: '' }));
    }
  }, [dispatch, activeCategory, products.length]);

  const retryAPICall = () => {
    dispatch(setApiStatus('idle'));
    dispatch(fetchProductsByCategory({ categoryId: activeCategory, query: '' }));
  };

  const testAPICall = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products/categories/all');
      const data = await response.json();
      setTestResults(data);
      console.log('API test results:', data);
    } catch (error) {
      console.error('API test failed:', error);
      setTestResults({ error: error.message });
    }
  };

  const handleProductClick = (product) => {
    console.log('Product clicked:', product);
    router.push(`/product/${product.id}`);
  };

  // Show loading skeleton only if no products are available
  if (loading && products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {activeCategory === 'all' ? 'All Products' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}`}
          </h2>
          <div className="text-sm text-black">Loading from MongoDB...</div>
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
          <div className="text-red-600 text-lg font-medium mb-2">Error loading products from MongoDB</div>
          <div className="text-black mb-4">{error}</div>
          <div className="space-x-4">
            <button
              onClick={retryAPICall}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
            >
              Try Again
            </button>
            <button
              onClick={testAPICall}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Test MongoDB API
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
          <div className="text-black text-lg mb-4">No products found in MongoDB</div>
          <div className="space-x-4">
            <button
              onClick={retryAPICall}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
            >
              Load Products
            </button>
            <button
              onClick={testAPICall}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Test MongoDB API
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* API Status Banner */}
      {apiStatus === 'error' && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <div className="flex justify-between items-start">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  <strong>MongoDB Connection Error:</strong> Unable to fetch data from the database. 
                  Please check your backend connection and try again.
                </p>
              </div>
            </div>
            <button
              onClick={retryAPICall}
              className="ml-4 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors cursor-pointer"
            >
              Retry
            </button>
          </div>
        </div>
      )}
      
  
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {activeCategory === 'all' ? 'All Products' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}`}
          </h2>
         
        </div>

        {/* Test Results Display */}
        {testResults && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">API Test Results:</h3>
            <pre className="text-sm text-blue-800 overflow-auto">
              {JSON.stringify(testResults, null, 2)}
            </pre>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onProductClick={handleProductClick} />
          ))}
        </div>

        {/* No Products Message */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-black text-lg mb-4">
              No products found for this category
            </div>
            <button
              onClick={retryAPICall}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh Products
            </button>
          </div>
        )}
      </div>
    </>
  );
}
