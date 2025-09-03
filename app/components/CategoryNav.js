'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchProductsByCategory } from '../features/products/productSlice';

export default function CategoryNav({ activeCategory, onCategoryChange }) {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (categoryId) => {
    console.log('🎯 CategoryNav: Category clicked:', categoryId);
    console.log('🎯 CategoryNav: Calling onCategoryChange with:', categoryId);
    onCategoryChange(categoryId);
    console.log('🎯 CategoryNav: Dispatching fetchProductsByCategory for:', categoryId);
    dispatch(fetchProductsByCategory({ categoryId, query: '' }));
  };

  // Show loading state while categories are being fetched
  if (loading && categories.length === 0) {
    return (
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-6">
            <div className="animate-pulse bg-gray-200 h-10 w-24 rounded-lg"></div>
            <div className="animate-pulse bg-gray-200 h-10 w-24 rounded-lg"></div>
            <div className="animate-pulse bg-gray-200 h-10 w-24 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if no categories are available
  if (categories.length === 0) {
    return (
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center text-gray-500">
            No categories available. Please check your backend connection.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-6 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeCategory === category.id
                  ? 'bg-red-100 text-red-600 border-2 border-red-300'
                  : 'text-gray-600 hover:text-red-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{category.icon || '📦'}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
