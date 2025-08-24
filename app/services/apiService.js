import axios from 'axios';

// Multiple API keys for fallback
const API_KEYS = [
  '6fd8e09abfmsh37c08bb90bd4f6ep1ba638jsn1475824bdd57',
  // Add more API keys here if you have them
  // Example: 'your-second-api-key-here',
  // Example: 'your-third-api-key-here',
];

// Alternative API endpoints
const API_ENDPOINTS = {
  rapidapi: {
    host: 'ali-express1.p.rapidapi.com',
    search: 'https://ali-express1.p.rapidapi.com/search',
    categories: 'https://ali-express1.p.rapidapi.com/categories',
    productsByCategory: 'https://ali-express1.p.rapidapi.com/productsByCategoryV2'
  },
  // Alternative: FakeStore API (free, no rate limits)
  fakestore: {
    host: 'fakestoreapi.com',
    search: 'https://fakestoreapi.com/products',
    categories: 'https://fakestoreapi.com/products/categories'
  }
};

// Mock data for fallback
const mockProducts = [
  {
    id: 1,
    title: "iPhone 15 Pro Max - 256GB",
    price: "1199.99",
    originalPrice: "1299.99",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 1247,
    discount: "8% OFF",
    shipping: "Free shipping",
    category: "electronics",
    description: "Latest iPhone with advanced camera system and A17 Pro chip"
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra",
    price: "1099.99",
    originalPrice: "1199.99",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 892,
    discount: "8% OFF",
    shipping: "Free shipping",
    category: "electronics",
    description: "Premium Android flagship with S Pen and advanced AI features"
  },
  {
    id: 3,
    title: "MacBook Air M3 - 13 inch",
    price: "999.99",
    originalPrice: "1099.99",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 567,
    discount: "9% OFF",
    shipping: "Free shipping",
    category: "electronics",
    description: "Ultra-thin laptop with M3 chip for incredible performance"
  },
  {
    id: 4,
    title: "Sony WH-1000XM5 Headphones",
    price: "349.99",
    originalPrice: "399.99",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 2341,
    discount: "13% OFF",
    shipping: "Free shipping",
    category: "electronics",
    description: "Industry-leading noise cancellation with premium sound quality"
  },
  {
    id: 5,
    title: "Apple Watch Series 9",
    price: "399.99",
    originalPrice: "449.99",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 756,
    discount: "11% OFF",
    shipping: "Free shipping",
    category: "electronics",
    description: "Advanced health monitoring with S9 chip and new features"
  },
  {
    id: 6,
    title: "Nike Air Max 270",
    price: "129.99",
    originalPrice: "149.99",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 1892,
    discount: "13% OFF",
    shipping: "Free shipping",
    category: "fashion",
    description: "Comfortable running shoes with Air Max technology"
  },
  {
    id: 7,
    title: "Adidas Ultraboost 22",
    price: "179.99",
    originalPrice: "199.99",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 1456,
    discount: "10% OFF",
    shipping: "Free shipping",
    category: "fashion",
    description: "Premium running shoes with responsive Boost midsole"
  },
  {
    id: 8,
    title: "Dyson V15 Detect",
    price: "699.99",
    originalPrice: "799.99",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 1234,
    discount: "13% OFF",
    shipping: "Free shipping",
    category: "home",
    description: "Cordless vacuum with laser dust detection"
  },
  {
    id: 9,
    title: "GoPro Hero 11 Black",
    price: "399.99",
    originalPrice: "449.99",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 756,
    discount: "11% OFF",
    shipping: "Free shipping",
    category: "sports",
    description: "Action camera with 5.3K video and HyperSmooth 5.0"
  },
  {
    id: 10,
    title: "Kindle Paperwhite",
    price: "139.99",
    originalPrice: "159.99",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 892,
    discount: "13% OFF",
    shipping: "Free shipping",
    category: "books",
    description: "Waterproof e-reader with adjustable warm light"
  },
  {
    id: 11,
    title: "Diamond Stud Earrings",
    price: "299.99",
    originalPrice: "399.99",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 456,
    discount: "25% OFF",
    shipping: "Free shipping",
    category: "jewelery",
    description: "Classic diamond stud earrings with 14k white gold setting"
  },
  {
    id: 12,
    title: "Gold Chain Necklace",
    price: "89.99",
    originalPrice: "119.99",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 234,
    discount: "25% OFF",
    shipping: "Free shipping",
    category: "jewelery",
    description: "Elegant 18k gold chain necklace with adjustable length"
  },
  {
    id: 13,
    title: "Silver Bracelet Set",
    price: "49.99",
    originalPrice: "69.99",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 189,
    discount: "29% OFF",
    shipping: "Free shipping",
    category: "jewelery",
    description: "Sterling silver bracelet set with delicate design"
  },
  {
    id: 14,
    title: "Pearl Necklace",
    price: "79.99",
    originalPrice: "99.99",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 312,
    discount: "20% OFF",
    shipping: "Free shipping",
    category: "jewelery",
    description: "Freshwater pearl necklace with elegant clasp"
  },
  {
    id: 15,
    title: "Rose Gold Ring",
    price: "159.99",
    originalPrice: "199.99",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 278,
    discount: "20% OFF",
    shipping: "Free shipping",
    category: "jewelery",
    description: "Beautiful rose gold ring with cubic zirconia stone"
  }
];

// Try multiple API keys
const tryMultipleAPIKeys = async (endpoint, params = {}) => {
  for (let i = 0; i < API_KEYS.length; i++) {
    try {
      console.log(`🔑 Trying API key ${i + 1}/${API_KEYS.length}...`);
      
      const response = await axios.get(endpoint, {
        params,
        headers: {
          'X-RapidAPI-Key': API_KEYS[i],
          'X-RapidAPI-Host': API_ENDPOINTS.rapidapi.host
        },
        timeout: 10000 // 10 second timeout
      });
      
      if (response.status === 200 && response.data) {
        console.log(`✅ API key ${i + 1} worked!`);
        return response.data;
      }
    } catch (error) {
      console.log(`❌ API key ${i + 1} failed:`, error.response?.status || error.message);
      
      // If it's not a rate limit error, don't try other keys
      if (error.response?.status !== 429) {
        break;
      }
    }
    
    // Wait a bit before trying the next key
    if (i < API_KEYS.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  throw new Error('All API keys failed');
};

// Enhanced search function
export const searchProducts = async (query = 'phone', category = '') => {
  try {
    console.log('🔍 Attempting to search products...', { query, category });
    
    // First try RapidAPI
    try {
      const searchParams = {
        query: query || 'phone',
        page: '1',
        limit: '20'
      };
      
      const data = await tryMultipleAPIKeys(API_ENDPOINTS.rapidapi.search, searchParams);
      
      if (data?.data && data.data.length > 0) {
        console.log('🎉 Got real RapidAPI data!');
        return { data: data.data, source: 'rapidapi' };
      }
    } catch (rapidError) {
      console.log('❌ RapidAPI failed, trying FakeStore...');
    }
    
    // Fallback to FakeStore API
    try {
      console.log('🔄 Trying FakeStore API...');
      let url = API_ENDPOINTS.fakestore.search;
      
      // If category is specified, use FakeStore's category endpoint
      if (category && category !== 'all') {
        const categoryMap = {
          'electronics': 'electronics',
          'jewelery': 'jewelery',
          'mens-clothing': "men's clothing",
          'womens-clothing': "women's clothing"
        };
        
        const mappedCategory = categoryMap[category] || category;
        url = `https://fakestoreapi.com/products/category/${encodeURIComponent(mappedCategory)}`;
        console.log('🎯 Using category-specific URL:', url);
      }
      
      const response = await axios.get(url);
      
      if (response.data && response.data.length > 0) {
        console.log('🎉 Got FakeStore API data!');
        console.log('🎉 FakeStore response data length:', response.data.length);
        // Transform FakeStore data to match our format
        const transformedData = response.data.slice(0, 20).map((item, index) => ({
          id: item.id,
          title: item.title,
          price: item.price.toString(),
          originalPrice: (item.price * 1.2).toFixed(2),
          image: item.image,
          rating: item.rating?.rate || 4.5,
          reviews: item.rating?.count || 100,
          discount: "20% OFF",
          shipping: "Free shipping",
          category: item.category,
          description: item.description
        }));
        console.log('🎉 Transformed data length:', transformedData.length);
        console.log('🎉 Returning FakeStore data with source: fakestore');
        return { data: transformedData, source: 'fakestore' };
      }
    } catch (fakestoreError) {
      console.log('❌ FakeStore API failed:', fakestoreError.message);
    }
    
    // Final fallback to mock data with category filtering
    console.log('⚠️ All APIs failed, using mock data');
    let filteredMockData = mockProducts;
    
    if (category && category !== 'all') {
      const categoryMap = {
        'electronics': 'electronics',
        'jewelery': 'jewelery',
        'mens-clothing': 'fashion',
        'womens-clothing': 'fashion'
      };
      
      const mappedCategory = categoryMap[category] || category;
      filteredMockData = mockProducts.filter(product => product.category === mappedCategory);
      console.log(`🎯 Filtered mock data for category: ${mappedCategory}, found ${filteredMockData.length} products`);
    }
    
    console.log('🎉 Returning mock data with source: mock');
    return { data: filteredMockData, source: 'mock' };
    
  } catch (error) {
    console.log('❌ All API attempts failed, using mock data');
    return { data: mockProducts, source: 'mock' };
  }
};

// Enhanced categories function
export const getCategories = async () => {
  try {
    console.log('📋 Attempting to get categories...');
    
    // First try RapidAPI
    try {
      const data = await tryMultipleAPIKeys(API_ENDPOINTS.rapidapi.categories);
      
      if (data?.data && data.data.length > 0) {
        console.log('🎉 Got real RapidAPI categories!');
        return { data: data.data, source: 'rapidapi' };
      }
    } catch (rapidError) {
      console.log('❌ RapidAPI categories failed, trying FakeStore...');
    }
    
    // Fallback to FakeStore API
    try {
      console.log('🔄 Trying FakeStore categories...');
      const response = await axios.get(API_ENDPOINTS.fakestore.categories);
      
      if (response.data && response.data.length > 0) {
        console.log('🎉 Got FakeStore categories!');
        // Transform FakeStore categories to match our format
        const transformedCategories = response.data.map(category => ({
          id: category.toLowerCase().replace(/\s+/g, '-'),
          name: category.charAt(0).toUpperCase() + category.slice(1),
          icon: getCategoryIcon(category)
        }));
        return { data: transformedCategories, source: 'fakestore' };
      }
    } catch (fakestoreError) {
      console.log('❌ FakeStore categories failed:', fakestoreError.message);
    }
    
    // Final fallback to default categories
    console.log('⚠️ All category APIs failed, using defaults');
    return { 
      data: [
        { id: 'electronics', name: 'Electronics', icon: '📱' },
        { id: 'fashion', name: 'Fashion', icon: '👕' },
        { id: 'home', name: 'Home & Garden', icon: '🏠' },
        { id: 'sports', name: 'Sports & Outdoors', icon: '⚽' },
        { id: 'books', name: 'Books & Media', icon: '📚' }
      ], 
      source: 'mock' 
    };
    
  } catch (error) {
    console.log('❌ Categories API failed, using defaults');
    return { 
      data: [
        { id: 'electronics', name: 'Electronics', icon: '📱' },
        { id: 'fashion', name: 'Fashion', icon: '👕' },
        { id: 'home', name: 'Home & Garden', icon: '🏠' },
        { id: 'sports', name: 'Sports & Outdoors', icon: '⚽' },
        { id: 'books', name: 'Books & Media', icon: '📚' }
      ], 
      source: 'mock' 
    };
  }
};

// Helper function to get category icons
const getCategoryIcon = (category) => {
  const iconMap = {
    'electronics': '📱',
    'jewelery': '💍',
    'men\'s clothing': '👔',
    'women\'s clothing': '👗',
    'default': '📦'
  };
  return iconMap[category.toLowerCase()] || iconMap.default;
};

// Test function to check API status
export const testAPIStatus = async () => {
  console.log('🧪 Testing API status...');
  
  try {
    const searchResult = await searchProducts('phone');
    const categoriesResult = await getCategories();
    
    return {
      search: searchResult,
      categories: categoriesResult,
      status: 'success'
    };
  } catch (error) {
    console.error('❌ API test failed:', error);
    return {
      status: 'error',
      error: error.message
    };
  }
};
