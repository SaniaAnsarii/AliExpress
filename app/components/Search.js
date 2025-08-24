'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from '../features/products/productSlice';
import { X, Search as SearchIcon, Star } from 'lucide-react';

export default function Search({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, products]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(fetchProductsByCategory({ query: searchQuery }));
    }
  };

  const handleProductClick = (product) => {
    // Handle product click - could open product details
    console.log('Product clicked:', product);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Search Products</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Search Input */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                autoFocus
              />
            </div>
          </form>

          {/* Search Results */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                <p className="mt-2 text-gray-500">Searching...</p>
              </div>
            ) : searchQuery.trim() ? (
              searchResults.length > 0 ? (
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900">
                    Found {searchResults.length} results for "{searchQuery}"
                  </h3>
                  {searchResults.slice(0, 10).map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 line-clamp-2">
                          {product.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className={`${
                                  i < Math.floor(product.rating || 0) 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">
                            ({product.reviews || 0})
                          </span>
                        </div>
                        <p className="text-red-600 font-semibold mt-1">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <SearchIcon className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-500">No products found for "{searchQuery}"</p>
                  <p className="text-sm text-gray-400 mt-2">Try different keywords</p>
                </div>
              )
            ) : (
              <div className="text-center py-8">
                <SearchIcon className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-500">Start typing to search for products</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

