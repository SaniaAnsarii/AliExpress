import axios from 'axios';
import { config } from '../config/environment';

// MongoDB Backend API configuration
const BACKEND_API_CONFIG = {
  baseURL: config.apiUrl, // Use environment-aware configuration
  endpoints: {
    products: '/api/products',
    categories: '/api/products/categories/all',
    productDetails: '/api/products',
    search: '/api/products/search'
  }
};

// Helper function to make API requests with error handling
const makeAPIRequest = async (url, options = {}) => {
  try {
    // Add cache-busting parameter
    const cacheBuster = `?cb=${Date.now()}`;
    const finalUrl = url.includes('?') ? `${url}&cb=${Date.now()}` : `${url}${cacheBuster}`;
    
    const response = await axios.get(finalUrl, {
      timeout: 10000,
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      ...options
    });
    return response.data;
  } catch (error) {
    console.log(`API request failed for ${url}:`, error.message);
    throw error;
  }
};

// Product details from MongoDB backend
export const getProductDetails = async (productId) => {
  try {
    console.log(`📱 Fetching product details from MongoDB backend...`);
    const url = `${BACKEND_API_CONFIG.baseURL}${BACKEND_API_CONFIG.endpoints.productDetails}/${productId}`;
    const data = await makeAPIRequest(url);
    
    if (data && data.product) {
      console.log(`✅ Got product details from MongoDB!`);
      return { data: data.product, source: 'mongodb' };
    }
    
    throw new Error('Product not found in database');
  } catch (error) {
    console.log('❌ MongoDB product details failed:', error.message);
    throw new Error('Product not found');
  }
};

// Product feedback from MongoDB backend
export const getProductFeedback = async (productId) => {
  try {
    console.log('💬 Fetching product feedback from MongoDB...');
    // You can implement feedback API endpoint in your backend
    // For now, returning empty array
    return { data: [], source: 'mongodb' };
  } catch (error) {
    console.log('❌ MongoDB feedback failed:', error.message);
    return { data: [], source: 'mongodb' };
  }
};

// Shipping info from MongoDB backend
export const getShippingInfo = async (productId) => {
  try {
    console.log('🚚 Fetching shipping info from MongoDB...');
    // You can implement shipping API endpoint in your backend
    // For now, returning default shipping info
    const defaultShipping = {
      shipping: 'Free shipping',
      delivery: '7-14 days',
      tracking: 'Available',
      returns: '30-day return policy'
    };
    
    return { data: defaultShipping, source: 'mongodb' };
  } catch (error) {
    console.log('❌ MongoDB shipping failed:', error.message);
    return { data: { shipping: 'Free shipping', delivery: '7-14 days' }, source: 'mongodb' };
  }
};

// Search products from MongoDB backend
export const searchProducts = async (query = '', category = '') => {
  try {
    console.log('🔍 searchProducts called with:', { query, category });
    
    let url = `${BACKEND_API_CONFIG.baseURL}${BACKEND_API_CONFIG.endpoints.products}`;
    
    // Add query parameters if provided
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (category && category !== 'all') params.append('category', category);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    console.log(`🚀 Fetching from MongoDB backend: ${url}`);
    const data = await makeAPIRequest(url);
    
    if (data && data.products && data.products.length > 0) {
      console.log(`✅ Got ${data.products.length} products from MongoDB!`);
      return { data: data.products, source: 'mongodb' };
    } else {
      console.log('📭 No products found in MongoDB');
      return { data: [], source: 'mongodb' };
    }
    
  } catch (error) {
    console.log('❌ MongoDB search failed:', error.message);
    throw new Error('Failed to fetch products from database');
  }
};

// Get categories from MongoDB backend
export const getCategories = async () => {
  try {
    console.log('📂 Getting categories from MongoDB...');
    const url = `${BACKEND_API_CONFIG.baseURL}${BACKEND_API_CONFIG.endpoints.categories}`;
    const data = await makeAPIRequest(url);
    
    if (data && data.categories && data.categories.length > 0) {
      console.log(`✅ Got ${data.categories.length} categories from MongoDB!`);
      return { data: data.categories, source: 'mongodb' };
    } else {
      console.log('📭 No categories found in MongoDB');
      return { data: [], source: 'mongodb' };
    }
    
  } catch (error) {
    console.log('❌ MongoDB categories failed:', error.message);
    throw new Error('Failed to fetch categories from database');
  }
};

// Test API status
export const testAPIStatus = async () => {
  console.log('🧪 Testing MongoDB API status...');
  
  try {
    const searchResult = await searchProducts('', 'all');
    const categoriesResult = await getCategories();
    
    return {
      search: searchResult,
      categories: categoriesResult,
      status: 'success',
      source: 'mongodb'
    };
  } catch (error) {
    console.error('❌ MongoDB API test failed:', error);
    return {
      status: 'error',
      error: error.message,
      source: 'mongodb'
    };
  }
};
