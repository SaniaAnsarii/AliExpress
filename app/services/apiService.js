import axios from 'axios';
import { mockProducts, categories, filterProducts, getCategoryIcon } from '../utils/mockData';

const API_KEYS = [
  '6fd8e09abfmsh37c08bb90bd4f6ep1ba638jsn1475824bdd57',
];

const API_ENDPOINTS = {
  rapidapi: {
    host: 'ali-express1.p.rapidapi.com',
    search: 'https://ali-express1.p.rapidapi.com/search',
    categories: 'https://ali-express1.p.rapidapi.com/categories',
    productsByCategory: 'https://ali-express1.p.rapidapi.com/productsByCategoryV2'
  },

  fakestore: {
    host: 'fakestoreapi.com',
    search: 'https://fakestoreapi.com/products',
    categories: 'https://fakestoreapi.com/products/categories'
  }
};



const tryMultipleAPIKeys = async (endpoint, params = {}) => {
  for (let i = 0; i < API_KEYS.length; i++) {
    try {
      console.log(`Trying API key ${i + 1}/${API_KEYS.length}...`);
      
      const response = await axios.get(endpoint, {
        params,
        headers: {
          'X-RapidAPI-Key': API_KEYS[i],
          'X-RapidAPI-Host': API_ENDPOINTS.rapidapi.host
        },
        timeout: 10000
      });
      
      if (response.status === 200 && response.data) {
        console.log(`API key ${i + 1} worked!`);
        return response.data;
      }
    } catch (error) {
      console.log(`API key ${i + 1} failed:`, error.response?.status || error.message);
      
      if (error.response?.status !== 429) {
        break;
      }
    }
    
    if (i < API_KEYS.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  throw new Error('All API keys failed');
};

export const searchProducts = async (query = 'phone', category = '') => {
  try {
    console.log('Searching products...', { query, category });
    
    try {
      const searchParams = {
        query: query || 'phone',
        page: '1',
        limit: '20'
      };
      
      const data = await tryMultipleAPIKeys(API_ENDPOINTS.rapidapi.search, searchParams);
      
      if (data?.data && data.data.length > 0) {
        console.log('Got RapidAPI data!');
        return { data: data.data, source: 'rapidapi' };
      }
    } catch (rapidError) {
      console.log('RapidAPI failed, trying FakeStore...');
    }
    
    try {
      console.log('Trying FakeStore API...');
      let url = API_ENDPOINTS.fakestore.search;
      
      if (category && category !== 'all') {
        const categoryMap = {
          'electronics': 'electronics',
          'jewelery': 'jewelery',
          'mens-clothing': "men's clothing",
          'womens-clothing': "women's clothing"
        };
        
        const mappedCategory = categoryMap[category] || category;
        url = `https://fakestoreapi.com/products/category/${encodeURIComponent(mappedCategory)}`;
        console.log('Using category-specific URL:', url);
      }
      
      const response = await axios.get(url);
      
      if (response.data && response.data.length > 0) {
        console.log('Got FakeStore API data!');
        console.log('FakeStore response data length:', response.data.length);
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
        console.log('Transformed data length:', transformedData.length);
        console.log('Returning FakeStore data with source: fakestore');
        return { data: transformedData, source: 'fakestore' };
      }
    } catch (fakestoreError) {
      console.log('FakeStore API failed:', fakestoreError.message);
    }
    
    console.log('All APIs failed, using mock data');
    const filteredMockData = filterProducts(mockProducts, query, category);
    console.log(`Filtered mock data for category: ${category}, found ${filteredMockData.length} products`);
    
    console.log('Returning mock data with source: mock');
    return { data: filteredMockData, source: 'mock' };
    
  } catch (error) {
    console.log('All API attempts failed, using mock data');
    return { data: mockProducts, source: 'mock' };
  }
};

export const getCategories = async () => {
  try {
    console.log('Getting categories...');
    
    try {
      const data = await tryMultipleAPIKeys(API_ENDPOINTS.rapidapi.categories);
      
      if (data?.data && data.data.length > 0) {
        console.log('Got RapidAPI categories!');
        return { data: data.data, source: 'rapidapi' };
      }
    } catch (rapidError) {
      console.log('RapidAPI categories failed, trying FakeStore...');
    }
    
    try {
      console.log('Trying FakeStore categories...');
      const response = await axios.get(API_ENDPOINTS.fakestore.categories);
      
      if (response.data && response.data.length > 0) {
        console.log('Got FakeStore categories!');
        const transformedCategories = response.data.map(category => ({
          id: category.toLowerCase().replace(/\s+/g, '-'),
          name: category.charAt(0).toUpperCase() + category.slice(1),
          icon: getCategoryIcon(category)
        }));
        return { data: transformedCategories, source: 'fakestore' };
      }
    } catch (fakestoreError) {
      console.log('FakeStore categories failed:', fakestoreError.message);
    }
    
    console.log('All category APIs failed, using defaults');
    return { 
      data: categories, 
      source: 'mock' 
    };
    
  } catch (error) {
    console.log('Categories API failed, using defaults');
    return { 
      data: categories, 
      source: 'mock' 
    };
  }
};



export const testAPIStatus = async () => {
  console.log('Testing API status...');
  
  try {
    const searchResult = await searchProducts('phone');
    const categoriesResult = await getCategories();
    
    return {
      search: searchResult,
      categories: categoriesResult,
      status: 'success'
    };
  } catch (error) {
    console.error('API test failed:', error);
    return {
      status: 'error',
      error: error.message
    };
  }
};
