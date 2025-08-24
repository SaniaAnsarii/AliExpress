import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { searchProducts, getCategories } from '../../services/apiService';

// Enhanced mock products data for fallback
const mockProducts = [
  // Electronics
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
    title: "Canon EOS R6 Mark II",
    price: "2499.99",
    originalPrice: "2799.99",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 423,
    discount: "11% OFF",
    shipping: "Free shipping",
    category: "electronics",
    description: "Professional mirrorless camera with advanced autofocus"
  },
  {
    id: 7,
    title: "Dell XPS 13 Plus",
    price: "1299.99",
    originalPrice: "1499.99",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 298,
    discount: "13% OFF",
    shipping: "Free shipping",
    category: "electronics",
    description: "Premium ultrabook with stunning display and performance"
  },
  {
    id: 8,
    title: "iPad Pro 12.9 inch",
    price: "1099.99",
    originalPrice: "1199.99",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 634,
    discount: "8% OFF",
    shipping: "Free shipping",
    category: "electronics",
    description: "Most powerful iPad with M2 chip and Liquid Retina XDR display"
  },
  {
    id: 9,
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
    id: 10,
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
    id: 11,
    title: "Levi's 501 Original Jeans",
    price: "89.99",
    originalPrice: "99.99",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 892,
    discount: "10% OFF",
    shipping: "Free shipping",
    category: "fashion",
    description: "Classic straight-leg jeans with timeless style"
  },
  {
    id: 12,
    title: "Ray-Ban Aviator Classic",
    price: "159.99",
    originalPrice: "179.99",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 567,
    discount: "11% OFF",
    shipping: "Free shipping",
    category: "fashion",
    description: "Iconic aviator sunglasses with premium lenses"
  },
  {
    id: 13,
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
    id: 14,
    title: "Instant Pot Duo 7-in-1",
    price: "89.99",
    originalPrice: "109.99",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 2341,
    discount: "18% OFF",
    shipping: "Free shipping",
    category: "home",
    description: "Multi-functional pressure cooker for quick meals"
  },
  {
    id: 15,
    title: "Philips Hue Smart Bulb Set",
    price: "79.99",
    originalPrice: "99.99",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 892,
    discount: "20% OFF",
    shipping: "Free shipping",
    category: "home",
    description: "Smart LED bulbs with voice control and automation"
  },
  {
    id: 16,
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
    id: 17,
    title: "Yeti Rambler 20oz",
    price: "34.99",
    originalPrice: "39.99",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 1234,
    discount: "13% OFF",
    shipping: "Free shipping",
    category: "sports",
    description: "Premium insulated water bottle for outdoor adventures"
  },
  {
    id: 18,
    title: "Patagonia Down Jacket",
    price: "199.99",
    originalPrice: "229.99",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 567,
    discount: "13% OFF",
    shipping: "Free shipping",
    category: "sports",
    description: "Lightweight down jacket perfect for cold weather"
  },
  {
    id: 19,
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
    id: 20,
    title: "Sony WH-1000XM4 Headphones",
    price: "299.99",
    originalPrice: "349.99",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 1456,
    discount: "14% OFF",
    shipping: "Free shipping",
    category: "books",
    description: "Premium noise-cancelling headphones with 30-hour battery"
  }
];

// Helper function to filter products by category and search
const filterProducts = (products, query = '', category = '') => {
  let filtered = products;
  
  if (category && category !== 'all') {
    filtered = filtered.filter(product => product.category === category);
  }
  
  if (query) {
    const searchTerm = query.toLowerCase();
    filtered = filtered.filter(product => 
      product.title.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }
  
  return filtered;
};

// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔍 Fetching categories using enhanced API service...');
      const result = await getCategories();
      
      console.log('✅ Categories result:', result);
      return { data: result.data, source: result.source };
    } catch (error) {
      console.log('❌ Categories API failed:', error.message);
      // Return default categories if API fails
      return { data: [
        { id: 'electronics', name: 'Electronics', icon: '📱' },
        { id: 'fashion', name: 'Fashion', icon: '👕' },
        { id: 'home', name: 'Home & Garden', icon: '🏠' },
        { id: 'sports', name: 'Sports & Outdoors', icon: '⚽' },
        { id: 'books', name: 'Books & Media', icon: '📚' }
      ]};
    }
  }
);

// Async thunk for fetching products by category
export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async ({ categoryId = '', query = '' }, { rejectWithValue }) => {
    try {
      console.log('🔍 Fetching products using enhanced API service...');
      const result = await searchProducts(query, categoryId);
      
      console.log('✅ Products result:', result);
      console.log('✅ Products result.data:', result.data);
      console.log('✅ Products result.source:', result.source);
      
      // Check if this was a rate-limited response from the old system
      if (result.rateLimited) {
        console.log('🔄 Returning rate-limited response');
        return { 
          data: result.data, 
          rateLimited: true,
          source: 'mock'
        };
      }
      
      console.log('🔄 Returning normal response with source:', result.source);
      return { 
        data: result.data, 
        source: result.source 
      };
    } catch (error) {
      console.log('❌ Products API failed:', error.message);
      const filteredProducts = filterProducts(mockProducts, query, categoryId);
      console.log('🔄 Returning mock data from catch block:', filteredProducts.length, 'products');
      return { 
        data: filteredProducts, 
        source: 'mock' 
      };
    }
  }
);

// Async thunk for fetching product details
export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async (productId, { rejectWithValue }) => {
    try {
      const options = {
        method: 'GET',
        url: `https://ali-express1.p.rapidapi.com/product/${productId}`,
        headers: {
          'X-RapidAPI-Key': '6fd8e09abfmsh37c08bb90bd4f6ep1ba638jsn1475824bdd57',
          'X-RapidAPI-Host': 'ali-express1.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.log('Product details API failed:', error.message);
      // Return mock product details if API fails
      const mockProduct = mockProducts.find(p => p.id === parseInt(productId));
      return mockProduct || null;
    }
  }
);

// Async thunk for fetching product feedback
export const fetchProductFeedback = createAsyncThunk(
  'products/fetchProductFeedback',
  async (productId, { rejectWithValue }) => {
    try {
      const options = {
        method: 'GET',
        url: `https://ali-express1.p.rapidapi.com/product/${productId}/feedback/`,
        headers: {
          'X-RapidAPI-Key': '6fd8e09abfmsh37c08bb90bd4f6ep1ba638jsn1475824bdd57',
          'X-RapidAPI-Host': 'ali-express1.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.log('Product feedback API failed:', error.message);
      return { data: [] };
    }
  }
);

// Async thunk for fetching shipping info
export const fetchShippingInfo = createAsyncThunk(
  'products/fetchShippingInfo',
  async (productId, { rejectWithValue }) => {
    try {
      const options = {
        method: 'GET',
        url: `https://ali-express1.p.rapidapi.com/shipping/${productId}`,
        headers: {
          'X-RapidAPI-Key': '6fd8e09abfmsh37c08bb90bd4f6ep1ba638jsn1475824bdd57',
          'X-RapidAPI-Host': 'ali-express1.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.log('Shipping info API failed:', error.message);
      return { data: { shipping: 'Free shipping', delivery: '7-14 days' } };
    }
  }
);



const initialState = {
  products: [],
  categories: [],
  productDetails: null,
  productFeedback: [],
  shippingInfo: null,
  loading: false,
  error: null,
  apiStatus: 'idle', // 'idle', 'loading', 'success', 'rate_limited', 'error'
  searchQuery: '',
  filters: {
    category: '',
    priceRange: { min: 0, max: 1000 },
    sortBy: 'relevance'
  }
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        priceRange: { min: 0, max: 1000 },
        sortBy: 'relevance'
      };
    },
    clearProductDetails: (state) => {
      state.productDetails = null;
    },
    setApiStatus: (state, action) => {
      state.apiStatus = action.payload;
    },
    setRateLimited: (state) => {
      state.apiStatus = 'rate_limited';
      state.error = 'API rate limit exceeded. Using mock data.';
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.apiStatus = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload?.data || action.payload || [];
        state.apiStatus = action.payload?.source === 'mock' ? 'rate_limited' : 'success';
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.apiStatus = 'error';
      })
      // Fetch Products by Category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.apiStatus = 'loading';
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        
        console.log('🔄 Redux: Processing fulfilled action:', action.payload);
        
        // Handle different possible response structures
        const productsData = action.payload?.data || action.payload?.results || action.payload || [];
        state.products = productsData;
        
        console.log('🔄 Redux: Set products to:', productsData.length, 'items');
        console.log('🔄 Redux: Products source:', action.payload?.source);
        
        // Check the source to determine API status
        if (action.payload?.source === 'mock' || action.payload?.rateLimited) {
          state.apiStatus = 'rate_limited';
          state.error = 'API rate limit exceeded. Showing mock data.';
          console.log('🔄 Redux: Set status to rate_limited');
        } else if (action.payload?.source === 'fakestore') {
          state.apiStatus = 'success';
          state.error = null;
          console.log('🔄 Redux: Set status to success (fakestore)');
        } else if (action.payload?.source === 'rapidapi') {
          state.apiStatus = 'success';
          state.error = null;
          console.log('🔄 Redux: Set status to success (rapidapi)');
        } else {
          state.apiStatus = 'success';
          state.error = null;
          console.log('🔄 Redux: Set status to success (default)');
        }
        
        console.log('🔄 Redux: Final state - products:', state.products.length, 'error:', state.error, 'apiStatus:', state.apiStatus);
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.apiStatus = 'error';
      })
      // Fetch Product Details
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Product Feedback
      .addCase(fetchProductFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.productFeedback = action.payload?.data || action.payload || [];
      })
      .addCase(fetchProductFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Shipping Info
      .addCase(fetchShippingInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShippingInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.shippingInfo = action.payload?.data || action.payload;
      })
      .addCase(fetchShippingInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  setSearchQuery, 
  setFilters, 
  clearFilters, 
  clearProductDetails 
} = productSlice.actions;

export default productSlice.reducer;
